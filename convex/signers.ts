import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import {
  internalAction,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

// Bulk add signers to a document - creates signature fields for each
export const bulkAddSigners = mutation({
  args: {
    documentId: v.id("documents"),
    signers: v.array(
      v.object({
        email: v.string(),
        name: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to add signers.");
    }

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== identity.subject) throw new Error("Not the document owner");

    // Get user to check plan limits
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    // Check bulk sending limits based on plan
    let maxBulkRecipients = 1; // Default for trial/starter
    if (user.plan === "professional") {
      maxBulkRecipients = 5;
    }

    if (args.signers.length > maxBulkRecipients) {
      throw new Error(
        `Your plan allows up to ${maxBulkRecipients} recipients at once. You tried to add ${args.signers.length}. Upgrade to Professional for bulk sending.`
      );
    }

    // Get existing signature fields to check for duplicates
    const existingFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    const existingSignerEmails = new Set(
      existingFields
        .map((f) => f.signerEmail?.toLowerCase())
        .filter((email): email is string => !!email)
    );

    const addedSignerIds: string[] = [];

    for (const signer of args.signers) {
      const email = signer.email.trim().toLowerCase();

      // Skip if signer already exists
      if (existingSignerEmails.has(email)) {
        continue;
      }

      // Generate unique access token
      const accessToken = crypto.randomUUID();

      const signerId = await ctx.db.insert("signatureFields", {
        documentId: args.documentId,
        fieldType: "signature",
        page: 1,
        x: 0,
        y: 0,
        width: 150,
        height: 60,
        isRequired: true,
        label: "Signature",
        signerEmail: email,
        signerName: signer.name || email,
        status: "pending",
        accessToken,
        isCompleted: false,
        createdAt: Date.now(),
        reminderCount: 0,
      });

      addedSignerIds.push(signerId);
      existingSignerEmails.add(email);
    }

    return {
      addedCount: addedSignerIds.length,
      signerIds: addedSignerIds,
    };
  },
});

// Add signer to document by creating a signature field
export const addSigner = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    name: v.optional(v.string()),
    signingOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new ConvexError("Document not found");
    if (document.ownerId !== identity.subject) throw new ConvexError("Unauthorized");

    const email = args.email.trim().toLowerCase();
    // Check if signer already exists by checking for any signature fields assigned to this email
    const existingSignatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", args.documentId)
          .eq("signerEmail", email),
      )
      .collect();

    if (existingSignatureFields.length > 0) {
      // Return the ID of the first signature field for this signer
      return existingSignatureFields[0]._id;
    }

    // Generate unique access token
    const accessToken = crypto.randomUUID();
    const signingId = await ctx.db.insert("signatureFields", {
      documentId: args.documentId,
      fieldType: "signature", // Default field type
      page: 1, // Default page
      x: 0, // Default position
      y: 0,
      width: 150, // Default size
      height: 60,
      isRequired: true, // Default to required
      label: "Signature", // Default label
      signerEmail: email,
      signerName: args.name || email,
      signerOrder: args.signingOrder,
      status: "pending",
      accessToken,
      isCompleted: false,
      createdAt: Date.now(),
      reminderCount: 0,
    });


    return signingId;
  },
});

// Get signer by access token (for signing page)
export const getSignerByToken = query({
  args: { accessToken: v.string() },
  handler: async (ctx, args) => {
    const signatureField = await ctx.db
      .query("signatureFields")
      .withIndex("by_access_token", (q) =>
        q.eq("accessToken", args.accessToken),
      )
      .first();

    if (!signatureField) return null;

    // Parallel queries: Get document and signer fields at once
    const [document, signatureFields] = await Promise.all([
      ctx.db.get(signatureField.documentId),
      ctx.db
        .query("signatureFields")
        .withIndex("by_document_and_signer", (q) =>
          q
            .eq("documentId", signatureField.documentId)
            .eq("signerEmail", signatureField.signerEmail),
        )
        .collect(),
    ]);

    if (!document) return null;

    // Get owner (depends on document)
    const owner = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", document.ownerId))
      .first();

    const ownerLogoUrl = owner?.brandLogoStorageId
      ? await ctx.storage.getUrl(owner.brandLogoStorageId)
      : null;

    return {
      signer: {
        _id: signatureField._id,
        documentId: signatureField.documentId,
        email: signatureField.signerEmail,
        name: signatureField.signerName,
        signingOrder: signatureField.signerOrder,
        status: signatureField.status,
        accessToken: signatureField.accessToken,
        sentAt: signatureField.sentAt,
        viewedAt: signatureField.viewedAt,
        signedAt: signatureField.signedAt,
        createdAt: signatureField.createdAt,
        reminderCount: signatureField.reminderCount,
        lastReminderAt: signatureField.lastReminderAt,
      },
      document,
      signatureFields,
      ownerBranding: {
        brandName: owner?.brandName || "",
        logoUrl: ownerLogoUrl,
      },
    };
  },
});

// get signer by id (actually returns signature field with signer info)
export const getSigner = query({
  args: { id: v.id("signatureFields") },
  handler: async (ctx, args) => {
    const signatureField = await ctx.db.get(args.id);
    if (!signatureField) return null;

    return {
      _id: signatureField._id,
      documentId: signatureField.documentId,
      email: signatureField.signerEmail,
      name: signatureField.signerName,
      signingOrder: signatureField.signerOrder,
      status: signatureField.status,
      accessToken: signatureField.accessToken,
      sentAt: signatureField.sentAt,
      viewedAt: signatureField.viewedAt,
      signedAt: signatureField.signedAt,
      createdAt: signatureField.createdAt,
      reminderCount: signatureField.reminderCount,
      lastReminderAt: signatureField.lastReminderAt,
    };
  },
});

// Remove signer from document (delete all their signature fields)
export const removeSigner = mutation({
  args: {
    documentId: v.id("documents"),
    signerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to remove a signer.");
    }

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== identity.subject) throw new Error("Not the document owner");

    // Can only remove signers from draft documents
    if (document.status !== "draft") {
      throw new Error("Cannot remove signers from a document that has already been sent");
    }

    const email = args.signerEmail.trim().toLowerCase();

    // Find and delete all signature fields for this signer
    const signerFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q.eq("documentId", args.documentId).eq("signerEmail", email)
      )
      .collect();

    for (const field of signerFields) {
      await ctx.db.delete(field._id);
    }

    return { removedCount: signerFields.length };
  },
});

// Get all unique signers for a user's documents
export const getUserSigners = query({
  args: { ownerId: v.string() },
  handler: async (ctx, args) => {
    // First get all documents owned by the user
    const userDocuments = await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    if (userDocuments.length === 0) {
      return [];
    }

    // Create a map of document IDs to titles for quick lookup
    const documentTitleMap = new Map(
      userDocuments.map((doc) => [doc._id, doc.title])
    );

    // Batch query: Get all signature fields for all user's documents at once
    // Since Convex doesn't support IN queries, we query by signer index and filter
    // But better approach: query all fields and filter by documentId set
    const allSignatureFields = await Promise.all(
      userDocuments.map((doc) =>
        ctx.db
          .query("signatureFields")
          .withIndex("by_document", (q) => q.eq("documentId", doc._id))
          .collect()
      )
    );

    // Flatten all signature fields
    const flattenedFields = allSignatureFields.flat();

    // Get unique signers from all signature fields
    const allSigners = [];
    const seenEmails = new Set<string>();

    for (const field of flattenedFields) {
      if (field.signerEmail && !seenEmails.has(field.signerEmail)) {
        seenEmails.add(field.signerEmail);
        allSigners.push({
          email: field.signerEmail,
          name: field.signerName,
          documentId: field.documentId,
          documentTitle: documentTitleMap.get(field.documentId) || "",
        });
      }
    }

    return allSigners;
  },
});

// Get all signers for a document (returns unique signers from signature fields)
export const getSigners = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    // Create a map to get unique signers
    const uniqueSignersMap = new Map();
    for (const field of signatureFields) {
      if (field.signerEmail && !uniqueSignersMap.has(field.signerEmail)) {
        uniqueSignersMap.set(field.signerEmail, {
          _id: field._id,
          documentId: field.documentId,
          email: field.signerEmail,
          name: field.signerName,
          signingOrder: field.signerOrder,
          status: field.status,
          accessToken: field.accessToken,
          sentAt: field.sentAt,
          viewedAt: field.viewedAt,
          signedAt: field.signedAt,
          createdAt: field.createdAt,
          reminderCount: field.reminderCount,
          lastReminderAt: field.lastReminderAt,
        });
      }
    }

    return Array.from(uniqueSignersMap.values());
  },
});

// New internal query to get a signer by documentId and email
export const getInternalSignerByDocumentAndEmail = internalQuery({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const signatureField = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", args.documentId)
          .eq("signerEmail", args.email),
      )
      .first();

    if (!signatureField) return null;

    return {
      _id: signatureField._id,
      documentId: signatureField.documentId,
      email: signatureField.signerEmail,
      name: signatureField.signerName,
      signingOrder: signatureField.signerOrder,
      status: signatureField.status,
      accessToken: signatureField.accessToken,
      sentAt: signatureField.sentAt,
      viewedAt: signatureField.viewedAt,
      signedAt: signatureField.signedAt,
      createdAt: signatureField.createdAt,
      reminderCount: signatureField.reminderCount,
      lastReminderAt: signatureField.lastReminderAt,
    };
  },
});

// Update signer status
export const updateSignerStatus = mutation({
  args: {
    signerId: v.id("signatureFields"), // Changed to signatureFields ID
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("signed"),
      v.literal("declined"),
    ),
  },
  handler: async (ctx, args) => {
    const updateData: {
      status: typeof args.status;
      sentAt?: number;
      viewedAt?: number;
      signedAt?: number;
    } = { status: args.status };
    const now = Date.now();

    switch (args.status) {
      case "sent":
        updateData.sentAt = now;
        break;
      case "viewed":
        updateData.viewedAt = now;
        break;
      case "signed":
        updateData.signedAt = now;
        break;
    }

    await ctx.db.patch(args.signerId, updateData);

  },
});

// Send document for signing
export const sendDocumentForSigning = mutation({
  args: {
    documentId: v.id("documents"),
    customMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be logged in to send a document for signing.");
    }
    if (!identity.email) {
      throw new Error("Authenticated user is missing an email.");
    }
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (document.ownerId !== identity.subject) throw new Error("Not the document owner");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    // Check limits
    const used = user.signatureRequestsUsed || 0;
    let limit = 0;
    if (user.plan === "trial" || user.plan === "starter") limit = 20;
    else if (user.plan === "professional") limit = 75;

    // Check if billing cycle has passed (Lazy Reset)
    // If the user hasn't sent a request in over a month, reset their usage
    const oneMonthMs = 30 * 24 * 60 * 60 * 1000;
    const lastBillingStart = user.billingCycleStart || 0;
    let effectiveUsed = used;

    if (Date.now() > lastBillingStart + oneMonthMs) {
      // It's been more than a month since the last cycle start
      // Reset usage and update billing cycle start
      await ctx.db.patch(user._id, {
        signatureRequestsUsed: 0,
        billingCycleStart: Date.now(),
      });
      effectiveUsed = 0;
    }

    // Enforce limits for ALL users (including active paid users)
    // We strictly prevent users from exceeding their plan limits as requested
    if (effectiveUsed >= limit) {
      throw new Error(`You have reached your limit of ${limit} signature requests for this month. Please upgrade your plan.`);
    }

    // Update document status
    await ctx.db.patch(args.documentId, {
      status: "sent",
      customMessage: args.customMessage,
      updatedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Increment usage
    await ctx.db.patch(user._id, {
      signatureRequestsUsed: effectiveUsed + 1,
    });

    // Update all signature fields to "sent" status for each unique signer
    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    // Get unique signers from signature fields
    const uniqueSignersMap = new Map();
    for (const field of signatureFields) {
      if (field.signerEmail && !uniqueSignersMap.has(field.signerEmail)) {
        uniqueSignersMap.set(field.signerEmail, {
          _id: field._id,
          email: field.signerEmail,
          documentId: field.documentId,
        });
      }
    }

    const uniqueSigners = Array.from(uniqueSignersMap.values());

    for (const signer of uniqueSigners) {
      // Update all signature fields for this signer to "sent" status
      const signerFields = signatureFields.filter(field => field.signerEmail === signer.email);
      for (const field of signerFields) {
        await ctx.db.patch(field._id, {
          status: "sent",
          sentAt: Date.now(),
        });
      }

      await ctx.scheduler.runAfter(0, internal.signers.sendSigningEmail, {
        signerId: signer._id, // Use the ID of the first field for this signer
        documentId: args.documentId,
        customMessage: args.customMessage,
      });
    }


    return uniqueSigners; // Return unique signers for email sending
  },
});

export const sendSigningEmail = internalAction({
  args: {
    signerId: v.id("signatureFields"),
    documentId: v.id("documents"),
    customMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const signer = await ctx.runQuery(api.signers.getSigner, {
        id: args.signerId,
      });

      if (!signer?.email) {
        console.error("Signer not found or missing email");
        return;
      }

      const document = await ctx.runQuery(api.documents.getDocument, {
        documentId: args.documentId,
      });

      if (!document) {
        console.error("Document not found");
        return;
      }

      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!appUrl) {
        throw new Error("APP_URL environment variable not set!");
      }

      const owner = await ctx.runQuery(api.users.getCurrentUser, {
        clerkId: document.ownerId,
      });
      if (!owner) {
        console.error("Owner not found");
        return;
      }

      let brandLogoUrl = "";
      if (owner.brandLogoStorageId) {
        brandLogoUrl = (await ctx.runQuery(api.documents.getFileUrl, {
          storageId: owner.brandLogoStorageId,
        })) || "";
      }
      console.log({
        signerName: signer.name || "",
        senderName: owner.firstName || owner.email,
        documentTitle: document.title,
        signingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/s/${signer.accessToken}`,
        customMessage: args.customMessage,
        to: signer.email,
        brandName: owner.brandName,
        brandLogoUrl: brandLogoUrl || undefined,
      })

      await ctx.runAction(api.emails.sendSigningRequestEmail, {
        signerName: signer.name || "",
        senderName: owner.firstName || owner.email,
        documentTitle: document.title,
        signingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/s/${signer.accessToken}`,
        customMessage: args.customMessage,
        to: signer.email,
        brandName: owner.brandName,
        brandLogoUrl: brandLogoUrl || undefined,
      });
    } catch (error) {
      console.error("Error in background signing email task:", error);
    }
  },
});

export const sendSignedEmailToOwner = internalAction({
  args: {
    documentId: v.id("documents"),
    signerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const document = await ctx.runQuery(api.documents.getDocument, {
        documentId: args.documentId,
      });
      if (!document) {
        console.error("Document not found");
        return;
      }

      const owner = await ctx.runQuery(api.users.getCurrentUser, {
        clerkId: document.ownerId,
      });
      if (!owner) {
        console.error("Owner not found");
        return;
      }

      const signer = await ctx.runQuery(
        internal.signers.getInternalSignerByDocumentAndEmail,
        {
          documentId: args.documentId,
          email: args.signerEmail,
        },
      );

      if (!signer) {
        console.error("Signer not found");
        return;
      }

      // Count remaining signers based on uncompleted signature fields
      const signatureFields = await ctx.runQuery(api.signatureFields.getDocumentSignatureFields, {
        documentId: args.documentId,
      });

      const uncompletedFields = signatureFields.filter(
        (field: any) => !field.isCompleted
      );

      // Count unique signers who still have uncompleted fields assigned to them
      const remainingSignerEmails = new Set(
        uncompletedFields
          .map((field: any) => field.signerEmail)
          .filter((email: any) => email)
      );

      const remainingSigners = remainingSignerEmails.size;

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";

      // Generate a PDF with all currently completed signatures
      try {
        await ctx.runAction(internal.actions.generateSignedPdf, {
          documentId: args.documentId,
        });
      } catch (pdfError) {
        console.error("Critical: Failed to generate signed PDF audit trail:", pdfError);
        // We continue because we still want to try sending notifications if possible,
        // though the download might point to an old version.
      }

      // Re-fetch document to get potential new fileStorageId
      const updatedDocument = await ctx.runQuery(api.documents.getDocument, {
        documentId: args.documentId,
      }) || document;

      // Get update download URL
      let downloadUrl = "";
      try {
        downloadUrl = await ctx.runQuery(api.documents.getFileUrl, {
          storageId: updatedDocument.fileStorageId,
        }) || "";
      } catch (urlError) {
        console.error("Failed to get download URL for emails:", urlError);
      }

      // Send Signing Confirmation Email to owner
      try {
        await ctx.runAction(api.emails.sendSigningConfirmationEmail, {
          ownerName: owner.firstName || owner.email,
          signerName: signer.name || "",
          documentTitle: document.title,
          dashboardUrl: `${appUrl}/dashboard`,
          signedAt: new Date(signer.signedAt || Date.now()).toLocaleString(),
          remainingSigners: remainingSigners,
          to: owner.email,
        });
      } catch (emailError) {
        console.error("Failed to send signing confirmation email to owner:", emailError);
      }

    } catch (globalError) {
      console.error("Error in sendSignedEmailToOwner background task:", globalError);
    }
  },
});

// Get signing session by access token
export const getSigningSession = query({
  args: { accessToken: v.string() },
  handler: async (ctx, args) => {
    try {
      // 1. Fetch the initial field
      const signatureField = await ctx.db
        .query("signatureFields")
        .withIndex("by_access_token", (q) => q.eq("accessToken", args.accessToken))
        .first();

      if (!signatureField) {
        return { error: "Invalid access token" };
      }

      // 2. Fetch the document
      const document = await ctx.db.get(signatureField.documentId);
      if (!document) {
        return { error: "Document not found" };
      }

      // Check if document is expired
      if (document.expiresAt && document.expiresAt < Date.now()) {
        return { error: "Document has expired" };
      }

      // Parallel queries: Get all document fields and owner at once
      const [allDocumentFields, owner] = await Promise.all([
        // All fields for the document
        ctx.db
          .query("signatureFields")
          .withIndex("by_document", (q) => q.eq("documentId", signatureField.documentId))
          .collect(),
        // Owner details
        ctx.db
          .query("users")
          .withIndex("by_clerk_id", (q) => q.eq("clerkId", document.ownerId))
          .first(),
      ]);

      const signerFields = allDocumentFields.filter(
        (f) => f.signerEmail === signatureField.signerEmail
      );

      // Get URLs in parallel
      const [ownerLogoUrl, fileUrl] = await Promise.all([
        owner?.brandLogoStorageId
          ? ctx.storage.getUrl(owner.brandLogoStorageId)
          : Promise.resolve(null),
        ctx.storage.getUrl(document.fileStorageId),
      ]);

      return {
        signer: {
          _id: signatureField._id,
          documentId: signatureField.documentId,
          email: signatureField.signerEmail,
          name: signatureField.signerName,
          signingOrder: signatureField.signerOrder,
          status: signatureField.status,
          accessToken: signatureField.accessToken,
          sentAt: signatureField.sentAt,
          viewedAt: signatureField.viewedAt,
          signedAt: signatureField.signedAt,
          createdAt: signatureField.createdAt,
          reminderCount: signatureField.reminderCount,
          lastReminderAt: signatureField.lastReminderAt,
        },
        document,
        signatureFields: signerFields,
        allDocumentFields,
        owner,
        fileUrl,
        ownerBranding: {
          brandName: owner?.brandName || "",
          logoUrl: ownerLogoUrl,
        },
      };
    } catch (error) {
      console.error("Error loading signing session:", error);
      return { error: "Failed to load signing session" };
    }
  },
});

export const getSigningSessionForMetadata = query({
  args: { accessToken: v.string() },
  handler: async (ctx, args) => {
    try {
      const signatureField = await ctx.db
        .query("signatureFields")
        .withIndex("by_access_token", (q) =>
          q.eq("accessToken", args.accessToken),
        )
        .first();

      if (!signatureField) {
        return null;
      }

      const document = await ctx.db.get(signatureField.documentId);
      if (!document) {
        return null;
      }

      const owner = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", document.ownerId))
        .first();

      let ownerLogoUrl = null;
      if (owner?.brandLogoStorageId) {
        ownerLogoUrl = await ctx.storage.getUrl(owner.brandLogoStorageId);
      }

      return {
        documentTitle: document.title,
        ownerName: owner?.brandName || owner?.firstName || owner?.email || "Someone",
        ownerLogoUrl: ownerLogoUrl,
      };
    } catch (error) {
      return null;
    }
  },
});

// Mark document as viewed by signer
export const markDocumentAsViewed = mutation({
  args: { accessToken: v.string() },
  handler: async (ctx, args) => {
    const signatureField = await ctx.db
      .query("signatureFields")
      .withIndex("by_access_token", (q) =>
        q.eq("accessToken", args.accessToken),
      )
      .first();

    if (!signatureField) {
      throw new Error("Invalid access token");
    }

    // Update signature field status only if it's not already signed or viewed
    if (signatureField.status !== "signed" && signatureField.status !== "declined" && signatureField.status !== "viewed") {
      await ctx.db.patch(signatureField._id, {
        status: "viewed",
        viewedAt: Date.now(),
      });

      // Also mark the document as in_progress if it was just "sent"
      const document = await ctx.db.get(signatureField.documentId);
      if (document && document.status === "sent") {
        await ctx.db.patch(document._id, {
          status: "in_progress",
          updatedAt: Date.now(),
        });
      }
    }

    return { success: true };
  },
});

// Finalize document (mark as completed)
export const finalizeDocument = mutation({
  args: {
    documentId: v.id("documents"),
    signerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const signerEmail = args.signerEmail.trim().toLowerCase();
    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", args.documentId)
          .eq("signerEmail", signerEmail),
      )
      .collect();

    if (signatureFields.length === 0) throw new Error("Signer not found");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");

    let updatedAnyField = false;
    // Update all signature fields for this signer to "signed" status
    const now = Date.now();
    for (const field of signatureFields) {
      if (field.status !== "signed" || !field.isCompleted) {
        updatedAnyField = true;
        await ctx.db.patch(field._id, {
          status: "signed",
          isCompleted: true,
          signedAt: field.signedAt || now,
          completedAt: field.completedAt || now,
        });

      }
    }

    const allFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    // Get unique signers from signature fields
    const uniqueSignersMap = new Map();
    for (const field of allFields) {
      if (field.signerEmail && !uniqueSignersMap.has(field.signerEmail)) {
        uniqueSignersMap.set(field.signerEmail, {
          _id: field._id,
          email: field.signerEmail,
          name: field.signerName,
          documentId: field.documentId,
          status: field.status,
        });
      }
    }
    const allSigners = Array.from(uniqueSignersMap.values());

    const requiredSignerEmails = new Set(
      allFields
        .map((field) => field.signerEmail)
        .filter((email): email is string => !!email),
    );

    const requiredSigners = allSigners.filter((s) =>
      requiredSignerEmails.has(s.email),
    );

    const allRequiredHaveSigned = requiredSigners.every(
      (s) => s.status === "signed",
    );

    if (signatureFields.every(f => f.status === "signed" && f.isCompleted)) {
      // The signer has completed all their fields
      // Schedule email to owner in the background
      await ctx.scheduler.runAfter(0, internal.signers.sendSignedEmailToOwner, {
        documentId: args.documentId,
        signerEmail: signerEmail,
      });

      // Update document to in_progress if not already and not finished
      if (document.status === "sent") {
        await ctx.db.patch(args.documentId, {
          status: "in_progress",
          updatedAt: Date.now(),
        });
      }
    }

    if (
      allRequiredHaveSigned &&
      requiredSigners.length > 0 &&
      document.status !== "completed"
    ) {
      const completedTimestamp = Date.now();
      await ctx.db.patch(args.documentId, {
        status: "completed",
        completedAt: completedTimestamp,
        updatedAt: completedTimestamp,
      });

      // Schedule completion emails to run in background to avoid blocking the response
      await ctx.scheduler.runAfter(0, internal.signers.sendCompletionNotifications, {
        documentId: args.documentId,
        completedTimestamp,
        allSigners,
      });
    } else if (document.status !== "completed") {
      // The email was already sent above - no need to send again
    }

    return { success: true };
  },
});
// Internal action to send completion notifications in the background
export const sendCompletionNotifications = internalAction({
  args: {
    documentId: v.id("documents"),
    completedTimestamp: v.number(),
    allSigners: v.array(v.object({
      _id: v.id("signatureFields"),
      email: v.string(),
      name: v.string(),
      documentId: v.id("documents"),
      status: v.union(
        v.literal("pending"),
        v.literal("sent"),
        v.literal("viewed"),
        v.literal("signed"),
        v.literal("declined"),
      ),
    })),
  },
  handler: async (ctx, args) => {
    try {
      const document = await ctx.runQuery(api.documents.getDocument, {
        documentId: args.documentId,
      });

      if (!document) {
        console.error("Document not found for completion notification");
        return;
      }

      const owner = await ctx.runQuery(api.users.getCurrentUser, {
        clerkId: document.ownerId,
      });

      if (!owner) {
        console.error("Owner not found for completion notification");
        return;
      }

      // Generate the signed PDF in the background
      try {
        await ctx.runAction(internal.actions.generateSignedPdf, {
          documentId: args.documentId,
        });
      } catch (pdfError) {
        console.error("Critical: Failed to generate signed PDF:", pdfError);
      }

      // Re-fetch document to get potential new fileStorageId
      const updatedDocument = await ctx.runQuery(api.documents.getDocument, {
        documentId: args.documentId,
      }) || document;

      // Get updated download URL
      let downloadUrl = "";
      try {
        downloadUrl = await ctx.runQuery(api.documents.getFileUrl, {
          storageId: updatedDocument.fileStorageId,
        }) || "";
      } catch (urlError) {
        console.error("Failed to get download URL for completion emails:", urlError);
      }

      // Send completion emails to all participants
      for (const participant of args.allSigners) {
        if (participant.email === owner.email) {
          await ctx.runAction(api.emails.sendDocumentCompleteEmail, {
            to: owner.email,
            ownerName: owner.firstName || owner.email,
            documentTitle: document.title,
            dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            downloadUrl: downloadUrl || "",
            completedAt: new Date(args.completedTimestamp).toLocaleString(),
            totalSigners: args.allSigners.length,
          });
        } else {
          // Send to other signers who didn't just sign (they need the fully executed copy)
          await ctx.runAction(api.emails.sendSignerCopyEmail, {
            to: participant.email,
            signerName: participant.name || participant.email,
            documentTitle: document.title,
            downloadUrl: downloadUrl || "",
            signedAt: new Date(args.completedTimestamp).toLocaleString(),
            senderName: owner.firstName || owner.email,
          });
        }
      }
    } catch (error) {
      console.error("Error in sendCompletionNotifications background task:", error);
    }
  },
});

// Decline document mutation
export const declineDocument = mutation({
  args: {
    accessToken: v.string(),
    reason: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const signatureField = await ctx.db
      .query("signatureFields")
      .withIndex("by_access_token", (q) =>
        q.eq("accessToken", args.accessToken),
      )
      .first();

    if (!signatureField) {
      throw new Error("Invalid access token");
    }

    const now = Date.now();

    // Update all signature fields for this signer on this document
    const signerFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", signatureField.documentId)
          .eq("signerEmail", signatureField.signerEmail),
      )
      .collect();

    for (const field of signerFields) {
      await ctx.db.patch(field._id, {
        status: "declined",
      });
    }

    // Void the document
    await ctx.db.patch(signatureField.documentId, {
      status: "declined",
      updatedAt: now,
    });


    return { success: true };
  },
});
