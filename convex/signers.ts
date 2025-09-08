import { v } from "convex/values";
import {
  internalAction,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";

// Add signer to document
export const addSigner = mutation({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
    name: v.optional(v.string()),
    signingOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if signer already exists
    const existingSigner = await ctx.db
      .query("signers")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingSigner) {
      return existingSigner._id;
    }
    // Generate unique access token
    const accessToken = crypto.randomUUID();
    const siginingId = await ctx.db.insert("signers", {
      ...args,
      status: "pending",
      accessToken,
      reminderCount: 0,
      createdAt: Date.now(),
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
    const signer = await ctx.db
      .query("signers")
      .withIndex("by_access_token", (q) =>
        q.eq("accessToken", args.accessToken),
      )
      .first();

    if (!signer) return null;

    const document = await ctx.db.get(signer.documentId);
    const signatureFields = await ctx.db
      .query("signatureFields")
      .withIndex("by_document_and_signer", (q) =>
        q
          .eq("documentId", signer.documentId)
          .eq("assignedToEmail", signer.email),
      )
      .collect();

    return {
      signer,
      document,
      signatureFields,
    };
  },
});

// get signer by id
export const getSigner = query({
  args: { id: v.id("signers") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

// Get all signers for a document
export const getSigners = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("signers")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();
  },
});

// New internal query to get a signer by documentId and email
export const getInternalSignerByDocumentAndEmail = internalQuery({
  args: {
    documentId: v.id("documents"),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("signers")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
  },
});

// Update signer status
export const updateSignerStatus = mutation({
  args: {
    signerId: v.id("signers"),
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
    const signer = await ctx.db.get(args.signerId);
    if (signer && args.status !== "pending") {
      await ctx.db.insert("documentActivities", {
        documentId: signer.documentId,
        actorEmail: signer.email,
        actorType: "signer",
        // @ts-expect-error
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

    // Update all signers to "sent" status
    const signers = await ctx.db
      .query("signers")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    for (const signer of signers) {
      await ctx.db.patch(signer._id, {
        status: "sent",
        sentAt: Date.now(),
      });

      await ctx.scheduler.runAfter(0, internal.signers.sendSigningEmail, {
        signerId: signer._id,
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

    return signers; // Return signers for email sending
  },
});

export const sendSigningEmail = internalAction({
  args: {
    signerId: v.id("signers"),
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
      signingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/sign/${signer.accessToken}`,
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

    const remainingSigners = allSigners.filter(
      (s) => s.status !== "signed",
    ).length;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      throw new Error("APP_URL environment variable not set!");
    }

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
      // Find signer by access token
      const signer = await ctx.db
        .query("signers")
        .withIndex("by_access_token", (q) =>
          q.eq("accessToken", args.accessToken),
        )
        .first();

      if (!signer) {
        return { error: "Invalid access token" };
      }

      // Get document
      const document = await ctx.db.get(signer.documentId);
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
            .eq("documentId", signer.documentId)
            .eq("assignedToEmail", signer.email),
        )
        .collect();

      return {
        signer,
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
      const signer = await ctx.db
        .query("signers")
        .withIndex("by_access_token", (q) =>
          q.eq("accessToken", args.accessToken),
        )
        .first();

      if (!signer) {
        return null;
      }

      const document = await ctx.db.get(signer.documentId);
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
    const signer = await ctx.db
      .query("signers")
      .withIndex("by_access_token", (q) =>
        q.eq("accessToken", args.accessToken),
      )
      .first();

    if (!signer) {
      throw new Error("Invalid access token");
    }

    // Update signer status
    await ctx.db.patch(signer._id, {
      status: "viewed",
      viewedAt: Date.now(),
    });

    // Add activity log
    await ctx.db.insert("documentActivities", {
      documentId: signer.documentId,
      actorEmail: signer.email,
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
    // Get signer
    const signer = await ctx.db
      .query("signers")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .filter((q) => q.eq(q.field("email"), args.signerEmail))
      .first();

    if (!signer) {
      throw new Error("Signer not found");
    }

    // Get document
    const document = await ctx.db.get(args.documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    // Mark signer as signed
    await ctx.db.patch(signer._id, {
      status: "signed",
      signedAt: Date.now(),
    });

    // Add signing activity
    await ctx.db.insert("documentActivities", {
      documentId: args.documentId,
      actorEmail: args.signerEmail,
      actorType: "signer",
      actionType: "signed",
      details: "Document signed by signer",
      timestamp: Date.now(),
    });

    // Check if all signers have signed
    const allSigners = await ctx.db
      .query("signers")
      .withIndex("by_document", (q) => q.eq("documentId", args.documentId))
      .collect();

    const allSigned = allSigners.every((s) => s.status === "signed");

    if (allSigned) {
      // Mark document as completed
      const completedTimestamp = Date.now();
      await ctx.db.patch(args.documentId, {
        status: "completed",
        completedAt: completedTimestamp,
        updatedAt: Date.now(),
      });

      // Add completion activity
      await ctx.db.insert("documentActivities", {
        documentId: args.documentId,
        actorEmail: "system",
        actorType: "owner",
        actionType: "completed",
        details: "All signers have completed the document",
        timestamp: Date.now(),
      });

      // Send Document Complete Email to owner
      const owner = await ctx.runQuery(api.users.getCurrentUser, {
        clerkId: document.ownerId,
      });
      if (!owner) {
        console.error("Owner not found");
        return;
      }

      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!appUrl) {
        throw new Error("APP_URL environment variable not set!");
      }

      const downloadUrl = await ctx.runMutation(api.documents.getFileUrl, {
        storageId: document.fileStorageId,
      });

      await ctx.scheduler.runAfter(0, api.emails.sendDocumentCompleteEmail, {
        ownerName: owner.firstName || owner.email,
        documentTitle: document.title,
        dashboardUrl: `${appUrl}/dashboard`,
        downloadUrl: downloadUrl || "",
        completedAt: new Date(completedTimestamp).toLocaleString(),
        totalSigners: allSigners.length,
        to: owner.email,
      });
    }

    // Send email to owner
    await ctx.scheduler.runAfter(0, internal.signers.sendSignedEmailToOwner, {
      documentId: args.documentId,
      signerEmail: args.signerEmail,
    });

    return { success: true };
  },
});
