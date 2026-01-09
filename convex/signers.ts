import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import {
  internalAction,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

// Add signer to document by creating a signature field
export const addSigner = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    name: v.optional(v.string()),
    signingOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if signer already exists by checking for any signature fields assigned to this email
    const existingSignatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", args.documentId)
          .eq("signerEmail", args.email),
      )
      .collect();

    if (existingSignatureFields.length > 0) {
      // Return the ID of the first signature field for this signer
      return existingSignatureFields[0]._id;
    }

    // Generate unique access token
    const accessToken = crypto.randomUUID();
    const siginingId = await ctx.db.insert("signatureFields", {
      documentId: args.documentId,
      fieldType: "signature", // Default field type
      page: 1, // Default page
      x: 0, // Default position
      y: 0,
      width: 150, // Default size
      height: 60,
      isRequired: true, // Default to required
      label: "Signature", // Default label
      signerEmail: args.email,
      signerName: args.name || args.email,
      signerOrder: args.signingOrder,
      status: "pending",
      accessToken,
      isCompleted: false,
      createdAt: Date.now(),
      reminderCount: 0,
    });

    // Add activity log
    await ctx.db.insert("documentActivities", {
      documentId: args.documentId,
      actorEmail: args.email,
      actorType: "signer",
      actionType: "created",
      details: "Signer added to document",
      timestamp: Date.now(),
    });

    return siginingId;
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

    const document = await ctx.db.get(signatureField.documentId);
    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", signatureField.documentId)
          .eq("signerEmail", signatureField.signerEmail),
      )
      .collect();

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

// Get all unique signers for a user's documents
export const getUserSigners = query({
  args: { ownerId: v.string() },
  handler: async (ctx, args) => {
    // First get all documents owned by the user
    const userDocuments = await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", args.ownerId))
      .collect();

    // Get all unique signer emails from those documents
    const allSigners = [];
    const seenEmails = new Set();

    for (const document of userDocuments) {
      const signatureFields = await ctx.db
        .query("signatureFields")
        .withIndex("by_document", (q) => q.eq("documentId", document._id))
        .collect();

      // Get unique signers from signature fields
      const documentSigners = new Map();
      for (const field of signatureFields) {
        if (field.signerEmail && !documentSigners.has(field.signerEmail)) {
          documentSigners.set(field.signerEmail, {
            email: field.signerEmail,
            name: field.signerName,
            documentId: field.documentId,
            documentTitle: document.title, // Include document title for reference
          });
        }
      }

      for (const [email, signer] of documentSigners) {
        if (!seenEmails.has(email)) {
          seenEmails.add(email);
          allSigners.push(signer);
        }
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

    // Log activity
    const signatureField = await ctx.db.get(args.signerId);
    if (signatureField && args.status !== "pending") {
      await ctx.db.insert("documentActivities", {
        documentId: signatureField.documentId,
        actorEmail: signatureField.signerEmail,
        actorType: "signer",
        actionType: args.status,
        details: `Signer ${args.status} the document`,
        timestamp: now,
      });
    }
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
    // Update document status
    await ctx.db.patch(args.documentId, {
      status: "sent",
      customMessage: args.customMessage,
      updatedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
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

    // Log activity
    await ctx.db.insert("documentActivities", {
      documentId: args.documentId,
      actorEmail: identity.email,
      actorType: "owner",
      actionType: "sent",
      details: "Document sent for signing",
      timestamp: Date.now(),
    });

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
    const signer = await ctx.runQuery(api.signers.getSigner, {
      id: args.signerId,
    });

    if (!signer) {
      console.error("Signer not found");
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

    const convexUrl = process.env.CONVEX_SITE_URL;
    if (!convexUrl) {
      throw new Error("CONVEX_SITE environment variable not set!");
    }

    const owner = await ctx.runQuery(api.users.getCurrentUser, {
      clerkId: document.ownerId,
    });
    if (!owner) {
      console.error("Owner not found");
      return;
    }

    await ctx.runAction(api.emails.sendSigningRequestEmail, {
      signerName: signer.name || signer.email,
      senderName: owner.firstName || owner.email,
      documentTitle: document.title,
      signingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/s/${signer.accessToken}`,
      customMessage: args.customMessage,
      to: signer.email,
    });
  },
});

export const sendSignedEmailToOwner = internalAction({
  args: {
    documentId: v.id("documents"),
    signerEmail: v.string(),
  },
  handler: async (ctx, args) => {
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

    const allSigners = await ctx.runQuery(api.signers.getSigners, {
      documentId: args.documentId,
    });

    // Count remaining signers based on uncompleted signature fields
    const signatureFields = await ctx.runQuery(api.signatureFields.getDocumentSignatureFields, {
      documentId: args.documentId,
    });

    const uncompletedFields = signatureFields.filter(
      (field) => !field.isCompleted
    );

    // Count unique signers who still have uncompleted fields assigned to them
    const remainingSignerEmails = new Set(
      uncompletedFields
        .map(field => field.signerEmail)
        .filter(email => email)
    );

    const remainingSigners = remainingSignerEmails.size;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error("APP_URL environment variable not set!");
    }

    // Generate a PDF with all currently completed signatures for the signer's copy
    await ctx.runAction(internal.actions.generateSignedPdf, {
      documentId: args.documentId,
    });

    // Get the updated document URL which now includes all completed signatures so far
    const downloadUrl = await ctx.runMutation(api.documents.getFileUrl, {
      storageId: document.fileStorageId,
    });

    // Send Signing Confirmation Email to owner
    await ctx.runAction(api.emails.sendSigningConfirmationEmail, {
      ownerName: owner.firstName || owner.email,
      signerName: signer.name || signer.email,
      documentTitle: document.title,
      dashboardUrl: `${appUrl}/dashboard`,
      // @ts-expect-error
      signedAt: new Date(signer.signedAt).toLocaleString(),
      remainingSigners: remainingSigners,
      to: owner.email,
    });

    // Send Signer Copy Email to signer
    await ctx.runAction(api.emails.sendSignerCopyEmail, {
      signerName: signer.name || signer.email,
      documentTitle: document.title,
      downloadUrl: downloadUrl || "",
      // @ts-expect-error
      signedAt: new Date(signer.signedAt).toLocaleString(),
      senderName: owner.firstName || owner.email,
      to: signer.email,
    });
  },
});

// Get signing session by access token
export const getSigningSession = query({
  args: { accessToken: v.string() },
  handler: async (ctx, args) => {
    try {
      // Find signature field by access token
      const signatureField = await ctx.db
        .query("signatureFields")
        .withIndex("by_access_token", (q) =>
          q.eq("accessToken", args.accessToken),
        )
        .first();

      if (!signatureField) {
        return { error: "Invalid access token" };
      }

      // Get document
      const document = await ctx.db.get(signatureField.documentId);
      if (!document) {
        return { error: "Document not found" };
      }

      // Check if document is expired
      if (document.expiresAt && document.expiresAt < Date.now()) {
        return { error: "Document has expired" };
      }

      // Get signature fields assigned to this signer
      const signatureFields = await ctx.db
        .query("signatureFields")
        .withIndex("by_document_and_signer", (q) =>
          q
            .eq("documentId", signatureField.documentId)
            .eq("signerEmail", signatureField.signerEmail),
        )
        .collect();

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
      };
    } catch (error) {
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

      return {
        documentTitle: document.title,
        ownerName: owner?.firstName || owner?.email || "Someone",
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

    // Update signature field status
    await ctx.db.patch(signatureField._id, {
      status: "viewed",
      viewedAt: Date.now(),
    });

    // Add activity log
    await ctx.db.insert("documentActivities", {
      documentId: signatureField.documentId,
      actorEmail: signatureField.signerEmail,
      actorType: "signer",
      actionType: "viewed",
      details: "Document viewed by signer",
      timestamp: Date.now(),
    });

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
    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", args.documentId)
          .eq("signerEmail", args.signerEmail),
      )
      .collect();

    if (signatureFields.length === 0) throw new Error("Signer not found");

    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");

    // Update all signature fields for this signer to "signed" status
    const now = Date.now();
    for (const field of signatureFields) {
      if (field.status !== "signed") {
        await ctx.db.patch(field._id, {
          status: "signed",
          signedAt: now,
        });

        await ctx.db.insert("documentActivities", {
          documentId: args.documentId,
          actorEmail: args.signerEmail,
          actorType: "signer",
          actionType: "signed",
          details: "Document signed by signer",
          timestamp: now,
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

    // Send email to owner and a copy to the signer who just signed
    await ctx.scheduler.runAfter(0, internal.signers.sendSignedEmailToOwner, {
      documentId: args.documentId,
      signerEmail: args.signerEmail,
    });

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

      // The signed PDF was already generated when the last signer completed their signature
      // via the sendSignedEmailToOwner call, so no need to regenerate here

      await ctx.db.insert("documentActivities", {
        documentId: args.documentId,
        actorEmail: "system",
        actorType: "system",
        actionType: "completed",
        details: "All required signatures have been collected.",
        timestamp: completedTimestamp,
      });

      const owner = await ctx.runQuery(api.users.getCurrentUser, {
        clerkId: document.ownerId,
      });
      if (!owner) {
        console.error("Owner not found, cannot send completion emails.");
        return { success: true };
      }

      const downloadUrl = await ctx.runMutation(api.documents.getFileUrl, {
        storageId: document.fileStorageId,
      });

      for (const participant of allSigners) {
        if (participant.email === owner.email) {
          await ctx.scheduler.runAfter(
            0,
            api.emails.sendDocumentCompleteEmail,
            {
              to: owner.email,
              ownerName: owner.firstName || owner.email,
              documentTitle: document.title,
              dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
              downloadUrl: downloadUrl || "",
              completedAt: new Date(completedTimestamp).toLocaleString(),
              totalSigners: allSigners.length,
            },
          );
        } else {
          await ctx.scheduler.runAfter(0, api.emails.sendSignerCopyEmail, {
            to: participant.email,
            signerName: participant.name || participant.email,
            documentTitle: document.title,
            downloadUrl: downloadUrl || "",
            signedAt: new Date(completedTimestamp).toLocaleString(),
            senderName: owner.firstName || owner.email,
          });
        }
      }
    } else if (document.status !== "completed") {
      // The email was already sent above - no need to send again
    }

    return { success: true };
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

    // Log decline activity
    await ctx.db.insert("documentActivities", {
      documentId: signatureField.documentId,
      actorEmail: signatureField.signerEmail,
      actorType: "signer",
      actionType: "declined",
      details: `Document declined by signer${args.reason ? `: ${args.reason}` : ""}`,
      timestamp: now,
    });

    return { success: true };
  },
});
