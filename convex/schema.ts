import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    // Updated plan to include starter and professional
    plan: v.union(v.literal("trial"), v.literal("starter"), v.literal("professional"), v.literal("expired")),
    // Add trial fields
    trialStartDate: v.number(),
    trialEndDate: v.number(),
    signatureRequestsUsed: v.optional(v.number()),
    billingCycleStart: v.optional(v.number()),
    documentsUsed: v.optional(v.number()), // Keep for backward compatibility

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
    billingInterval: v.optional(v.union(v.literal("monthly"), v.literal("annually"))),

    // Onboarding fields
    onboardingCompleted: v.optional(v.boolean()),
    onboardingCompletedAt: v.optional(v.number()),
    userRole: v.optional(v.string()), // e.g., "freelancer", "consultant", "small_business", "other"
    primaryUseCase: v.optional(v.string()), // e.g., "contracts", "ndas", "proposals", "invoices", "other"
    teamSize: v.optional(v.string()), // e.g., "solo", "2-5", "6-10", "11+"
    industry: v.optional(v.string()), // e.g., "tech", "legal", "real_estate", "consulting", "other"

    trialReminderFlags: v.optional(v.object({
      day3: v.boolean(),
      day1: v.boolean(),
    })),

    // Track localized trial email sequence (Day 1 is Welcome email)
    trialEmailsSent: v.optional(v.object({
      day3: v.optional(v.boolean()),  // Templates tip
      day7: v.optional(v.boolean()),  // Case study
      day10: v.optional(v.boolean()), // 3 days left
      day13: v.optional(v.boolean()), // Upgrade tomorrow
    })),

    // Branding fields
    brandLogoStorageId: v.optional(v.id("_storage")),
    brandName: v.optional(v.string()),

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
      v.literal("declined")
    ),
    ownerId: v.string(),
    pageCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
    expiresAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    customMessage: v.optional(v.string()),
    documentHash: v.optional(v.string()), // For integrity verification
    templateId: v.optional(v.string()), // Track which template this was created from
    isTemplate: v.optional(v.boolean()), // Whether this document is a reusable template
    isArchived: v.optional(v.boolean()), // Hidden from dashboard
    templateRoles: v.optional(v.array(v.string())), // e.g., ["Client", "Contractor"]
  })
    .index("by_owner", ["ownerId"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"])
    .index("by_template", ["templateId"]) // Index for template usage
    .index("by_file_storage_id", ["fileStorageId"])
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
    signerEmail: v.optional(v.string()), // Optional for templates
    signerName: v.optional(v.string()), // Optional for templates
    rolePlaceholder: v.optional(v.string()), // e.g., "Client"
    signerOrder: v.optional(v.number()),
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
    reminderCount: v.number(),
    lastReminderAt: v.optional(v.number()),
  })
    .index("by_document", ["documentId"])
    .index("by_signer", ["signerEmail"])
    .index("by_document_and_signer", ["documentId", "signerEmail"])
    .index("by_completion_status", ["documentId", "isCompleted"])
    .index("by_status", ["documentId", "status"])
    .index("by_access_token", ["accessToken"]),


  otps: defineTable({
    email: v.string(),
    otp: v.string(),
    purpose: v.union(v.literal("signer_verification"), v.literal("email_verification")),
    expiresAt: v.number(),
    verified: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_email_and_purpose", ["email", "purpose"])
    .index("by_created_at", ["createdAt"])
    .index("by_expires_at", ["expiresAt"])
    .index("by_email_purpose_and_verified", ["email", "purpose", "verified"]),

  leads: defineTable({
    email: v.string(),
    source: v.string(), // e.g., "freelance-contract-template"
    name: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("unsubscribed")),
    sequenceStep: v.number(), // 0 (start), 1 (sent email 1), 2 (sent email 2), 3 (sent email 3)
    lastEmailSentAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_source", ["source"])
    .index("by_status", ["status"]),
});
