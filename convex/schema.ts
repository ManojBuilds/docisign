import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    // Update plan to include trial
    plan: v.union(v.literal("trial"), v.literal("pro"), v.literal("expired")),
    documentsUsed: v.number(),

    // Add trial fields
    trialStartDate: v.number(),
    trialEndDate: v.number(),

    // Add subscription fields for DodoPayments
    dodoCustomerId: v.optional(v.string()),
    dodoSubscriptionId: v.optional(v.string()),
    subscriptionStatus: v.union(
      v.literal("trial"),
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("past_due"),
    ),

    // Onboarding fields
    onboardingCompleted: v.optional(v.boolean()),
    onboardingCompletedAt: v.optional(v.number()),
    userRole: v.optional(v.string()), // e.g., "freelancer", "consultant", "small_business", "other"
    primaryUseCase: v.optional(v.string()), // e.g., "contracts", "ndas", "proposals", "invoices", "other"
    teamSize: v.optional(v.string()), // e.g., "solo", "2-5", "6-10", "11+"
    industry: v.optional(v.string()), // e.g., "tech", "legal", "real_estate", "consulting", "other"

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_subscription_status", ["subscriptionStatus"]),

  documents: defineTable({
    title: v.string(),
    originalFileName: v.string(),
    fileStorageId: v.id("_storage"),
    fileType: v.union(v.literal("pdf"), v.literal("doc"), v.literal("docx")),
    fileSizeBytes: v.number(),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("expired"),
      v.literal("cancelled"),
    ),
    ownerId: v.string(),
    pageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    expiresAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    customMessage: v.optional(v.string()),
    documentHash: v.optional(v.string()), // For integrity verification
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .searchIndex("by_title", {
      searchField: "title",
      filterFields: ["ownerId", "status"],
    }),

  signatureFields: defineTable({
    documentId: v.id("documents"),
    fieldType: v.union(
      v.literal("signature"),
      v.literal("initial"),
      v.literal("date"),
      v.literal("text"),
    ),
    page: v.number(),
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    isRequired: v.boolean(),
    label: v.optional(v.string()),
    assignedToEmail: v.string(),
    assignedToName: v.string(),
    signerOrder: v.optional(v.number()),
    isCompleted: v.boolean(),
    completedAt: v.optional(v.number()),
    signatureData: v.optional(v.string()),
    auditTrail: v.optional(v.object({
      ip: v.string(),
      timestamp: v.string(),
      userAgent: v.string(),
      signedAt: v.number(),
    })),
    createdAt: v.number(),
  })
    .index("by_document", ["documentId"])
    .index("by_document_and_signer", ["documentId", "assignedToEmail"])
    .index("by_completion_status", ["documentId", "isCompleted"]),

  signers: defineTable({
    documentId: v.id("documents"),
    email: v.string(),
    name: v.optional(v.string()),
    signingOrder: v.optional(v.number()),
    status: v.union(
      v.literal("pending"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("signed"),
      v.literal("declined"),
    ),
    accessToken: v.string(),
    sentAt: v.optional(v.number()),
    viewedAt: v.optional(v.number()),
    signedAt: v.optional(v.number()),
    createdAt: v.number(),
    reminderCount: v.number(),
    lastReminderAt: v.optional(v.number()),
  })
    .index("by_document", ["documentId"])
    .index("by_email", ["email"])
    .index("by_access_token", ["accessToken"])
    .index("by_status", ["documentId", "status"]),

  documentActivities: defineTable({
    documentId: v.id("documents"),
    actorEmail: v.string(),
    actorType: v.union(
      v.literal("owner"),
      v.literal("signer"),
      v.literal("system"),
    ),
    actionType: v.union(
      v.literal("created"),
      v.literal("updated"),
      v.literal("sent"),
      v.literal("viewed"),
      v.literal("signed"),
      v.literal("completed"),
      v.literal("expired"),
      v.literal("cancelled"),
      v.literal("reminder_sent"),
    ),
    details: v.optional(v.string()),
    metadata: v.optional(v.any()),
    timestamp: v.number(),
    ipAddress: v.optional(v.string()), // For tracking IP address
    userAgent: v.optional(v.string()), // For tracking user agent
  })
    .index("by_document", ["documentId"])
    .index("by_timestamp", ["timestamp"]),
});
