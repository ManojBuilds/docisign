# BoopSign Team Support Implementation Plan

## Executive Summary

This document outlines a comprehensive plan to implement team/organization support for BoopSign, enabling multiple users to collaborate on documents within shared workspaces while maintaining the simplicity that makes BoopSign unique.

### Goals
- Enable teams to collaborate on documents with role-based access control
- Introduce team billing with per-seat pricing
- Maintain backward compatibility for existing solo users
- Keep the core value proposition: simple, lightweight, no account needed for signers

### Timeline Estimate
- **Phase 1-2**: 2-3 weeks (Database & Backend)
- **Phase 3**: 1-2 weeks (Billing)
- **Phase 4**: 2-3 weeks (Frontend)
- **Phase 5**: 1-2 weeks (Permissions)
- **Phase 6**: 1 week (Testing & Migration)
- **Total**: 7-11 weeks

---

## Phase 1: Database Schema & Data Model

### 1.1 Teams Table
Create a new `teams` table in `convex/schema.ts`:

```typescript
teams: defineTable({
  name: v.string(),
  slug: v.string(), // URL-friendly identifier
  description: v.optional(v.string()),
  
  // Billing
  plan: v.union(
    v.literal("team_starter"), // $29/mo - 3 seats
    v.literal("team_pro"),     // $79/mo - 10 seats
    v.literal("enterprise")    // Custom pricing
  ),
  maxSeats: v.number(),
  usedSeats: v.number(),
  
  // DodoPayments integration
  dodoCustomerId: v.optional(v.string()),
  dodoSubscriptionId: v.optional(v.string()),
  subscriptionStatus: v.union(
    v.literal("trial"),
    v.literal("active"),
    v.literal("cancelled"),
    v.literal("expired"),
    v.literal("past_due")
  ),
  
  // Settings
  settings: v.optional(v.object({
    allowMemberInvites: v.boolean(),
    defaultDocumentVisibility: v.union(v.literal("team"), v.literal("private")),
    brandingColor: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
  })),
  
  // Metadata
  ownerId: v.string(), // Clerk ID of team creator
  createdAt: v.number(),
  updatedAt: v.number(),
  trialEndDate: v.optional(v.number()),
})
  .index("by_slug", ["slug"])
  .index("by_owner", ["ownerId"])
  .index("by_subscription_status", ["subscriptionStatus"])
```

### 1.2 Team Members Table
```typescript
teamMembers: defineTable({
  teamId: v.id("teams"),
  userId: v.string(), // Clerk ID
  
  role: v.union(
    v.literal("owner"),   // Full control, billing access
    v.literal("admin"),   // Manage members, documents
    v.literal("member"),  // Create/edit own documents
    v.literal("viewer")   // Read-only access
  ),
  
  // Permissions (for granular control)
  permissions: v.object({
    canCreateDocuments: v.boolean(),
    canEditDocuments: v.boolean(),
    canDeleteDocuments: v.boolean(),
    canInviteMembers: v.boolean(),
    canManageTeam: v.boolean(),
    canAccessBilling: v.boolean(),
  }),
  
  status: v.union(
    v.literal("active"),
    v.literal("suspended"),
    v.literal("removed")
  ),
  
  joinedAt: v.number(),
  invitedBy: v.optional(v.string()), // Clerk ID
})
  .index("by_team", ["teamId"])
  .index("by_user", ["userId"])
  .index("by_team_and_user", ["teamId", "userId"])
  .index("by_team_and_status", ["teamId", "status"])
```

### 1.3 Team Invitations Table
```typescript
teamInvitations: defineTable({
  teamId: v.id("teams"),
  email: v.string(),
  role: v.union(
    v.literal("admin"),
    v.literal("member"),
    v.literal("viewer")
  ),
  
  invitedBy: v.string(), // Clerk ID
  inviteToken: v.string(), // Unique token for acceptance
  
  status: v.union(
    v.literal("pending"),
    v.literal("accepted"),
    v.literal("expired"),
    v.literal("revoked")
  ),
  
  createdAt: v.number(),
  expiresAt: v.number(), // 7 days from creation
  acceptedAt: v.optional(v.number()),
})
  .index("by_team", ["teamId"])
  .index("by_email", ["email"])
  .index("by_token", ["inviteToken"])
  .index("by_status", ["status"])
```

### 1.4 Update Documents Table
Add team ownership to existing documents table:

```typescript
// Add to documents table
teamId: v.optional(v.id("teams")), // null for personal documents
visibility: v.optional(v.union(
  v.literal("private"),  // Only owner can see
  v.literal("team"),     // All team members can see
  v.literal("shared")    // Specific team members
)),
sharedWith: v.optional(v.array(v.string())), // Array of Clerk IDs
```

Add new index:
```typescript
.index("by_team", ["teamId"])
.index("by_team_and_status", ["teamId", "status"])
```

### 1.5 Update Users Table
Add team context to users:

```typescript
// Add to users table
currentTeamId: v.optional(v.id("teams")), // Active team context
personalWorkspaceId: v.optional(v.id("teams")), // Personal workspace (auto-created)
```

---

## Phase 2: Backend API & Business Logic

### 2.1 Team CRUD Operations (`convex/teams.ts`)

**Mutations:**
- `createTeam({ name, plan })` - Create new team, auto-add creator as owner
- `updateTeam({ teamId, name, settings })` - Update team details
- `deleteTeam({ teamId })` - Delete team (owner only, cascade delete members/invites)
- `switchTeam({ teamId })` - Switch user's current team context

**Queries:**
- `getTeam({ teamId })` - Get team details
- `getUserTeams({ userId })` - Get all teams user belongs to
- `getTeamStats({ teamId })` - Get team usage stats (documents, members, storage)

### 2.2 Team Member Management (`convex/teamMembers.ts`)

**Mutations:**
- `addTeamMember({ teamId, userId, role })` - Add existing user to team
- `updateMemberRole({ teamId, userId, role })` - Change member role
- `removeMemberFromTeam({ teamId, userId })` - Remove member
- `suspendMember({ teamId, userId })` - Temporarily suspend member
- `updateMemberPermissions({ teamId, userId, permissions })` - Granular permissions

**Queries:**
- `getTeamMembers({ teamId })` - List all team members with roles
- `getUserTeamRole({ teamId, userId })` - Get user's role in team
- `canUserPerformAction({ teamId, userId, action })` - Permission check

### 2.3 Team Invitations (`convex/teamInvitations.ts`)

**Mutations:**
- `sendTeamInvitation({ teamId, email, role })` - Send invite email
- `acceptInvitation({ inviteToken })` - Accept invite and join team
- `revokeInvitation({ invitationId })` - Cancel pending invite
- `resendInvitation({ invitationId })` - Resend invite email

**Queries:**
- `getTeamInvitations({ teamId })` - List pending invites
- `getInvitationByToken({ token })` - Get invite details for acceptance page
- `getUserPendingInvites({ email })` - Get invites for user's email

### 2.4 Role-Based Access Control (`convex/permissions.ts`)

Create permission helper functions:

```typescript
// Permission definitions
const ROLE_PERMISSIONS = {
  owner: {
    canCreateDocuments: true,
    canEditDocuments: true,
    canDeleteDocuments: true,
    canInviteMembers: true,
    canManageTeam: true,
    canAccessBilling: true,
  },
  admin: {
    canCreateDocuments: true,
    canEditDocuments: true,
    canDeleteDocuments: true,
    canInviteMembers: true,
    canManageTeam: true,
    canAccessBilling: false,
  },
  member: {
    canCreateDocuments: true,
    canEditDocuments: true,
    canDeleteDocuments: false,
    canInviteMembers: false,
    canManageTeam: false,
    canAccessBilling: false,
  },
  viewer: {
    canCreateDocuments: false,
    canEditDocuments: false,
    canDeleteDocuments: false,
    canInviteMembers: false,
    canManageTeam: false,
    canAccessBilling: false,
  },
};

// Helper functions
export async function checkPermission(
  ctx: QueryCtx | MutationCtx,
  teamId: Id<"teams">,
  userId: string,
  permission: keyof typeof ROLE_PERMISSIONS.owner
): Promise<boolean>

export async function requirePermission(
  ctx: MutationCtx,
  teamId: Id<"teams">,
  userId: string,
  permission: string
): Promise<void> // Throws if no permission
```

### 2.5 Update Document Operations

Modify `convex/documents.ts`:

**Update `createDocument`:**
- Add `teamId` parameter
- Check team permissions before creation
- Set document visibility based on team settings

**Update `getUserDocuments`:**
- Return personal + team documents based on current context
- Filter by team membership and permissions

**Update `deleteDocument`:**
- Check team permissions before deletion
- Only allow if user has `canDeleteDocuments` permission

---

## Phase 3: Team Billing & Subscription

### 3.1 Pricing Tiers

| Plan | Price | Seats | Features |
|------|-------|-------|----------|
| **Personal** | $12/mo | 1 | Current individual plan |
| **Team Starter** | $29/mo | 3 | Team collaboration, shared documents |
| **Team Pro** | $79/mo | 10 | Everything + templates, priority support |
| **Enterprise** | Custom | Unlimited | Custom features, SLA, dedicated support |

### 3.2 Per-Seat Billing Logic

Create `convex/teamBilling.ts`:

```typescript
// Calculate team billing
export const calculateTeamBilling = query({
  args: { teamId: v.id("teams") },
  handler: async (ctx, args) => {
    const team = await ctx.db.get(args.teamId);
    const members = await getActiveMembers(ctx, args.teamId);
    
    const basePrice = PLAN_PRICES[team.plan];
    const includedSeats = PLAN_SEATS[team.plan];
    const usedSeats = members.length;
    const overageSeats = Math.max(0, usedSeats - includedSeats);
    const overagePrice = overageSeats * SEAT_PRICE;
    
    return {
      basePrice,
      includedSeats,
      usedSeats,
      overageSeats,
      overagePrice,
      totalPrice: basePrice + overagePrice,
    };
  },
});
```

### 3.3 DodoPayments Integration

**Update `app/api/create-team-checkout/route.ts`:**
- Create new endpoint for team subscriptions
- Pass team metadata to DodoPayments
- Handle seat quantity in subscription

**Update `app/api/dodo-webhook/route.ts`:**
- Handle team subscription events
- Update team subscription status
- Handle seat changes and prorations

### 3.4 Team Billing Dashboard

Create `app/(main)/team/[teamId]/billing/page.tsx`:
- Show current plan and seats used
- Display billing cycle and next payment
- Allow seat upgrades/downgrades
- Link to customer portal for payment methods

---

## Phase 4: Frontend UI Components

### 4.1 Team Switcher Component

Create `components/TeamSwitcher.tsx`:
- Dropdown in header to switch between workspaces
- Show personal workspace + all teams
- Display current active team
- Quick team creation option

### 4.2 Team Settings Page

Create `app/(main)/team/[teamId]/settings/page.tsx`:
- General settings (name, description)
- Branding (logo, colors)
- Default permissions
- Danger zone (delete team)

### 4.3 Team Members Management

Create `app/(main)/team/[teamId]/members/page.tsx`:
- Table of current members with roles
- Invite new members form
- Change member roles
- Remove members
- Pending invitations list

### 4.4 Team Invitation Flow

**Email Template** (`convex/email_templates.tsx`):
```typescript
export const TeamInvitationEmail = ({
  teamName,
  inviterName,
  role,
  acceptUrl,
}) => (
  // Email design
);
```

**Acceptance Page** (`app/(main)/team/invite/[token]/page.tsx`):
- Show team details
- Accept/Decline buttons
- Auto-join if user is logged in
- Prompt to sign up if new user

### 4.5 Update Dashboard

Modify `app/(main)/dashboard/page.tsx`:
- Add team context awareness
- Show team documents when team is selected
- Display team activity feed
- Team-specific stats

### 4.6 Team Creation Wizard

Create `components/CreateTeamWizard.tsx`:
- Step 1: Team name and description
- Step 2: Invite initial members
- Step 3: Select plan
- Step 4: Payment (if not trial)

---

## Phase 5: Document Sharing & Permissions

### 5.1 Team Document Visibility

Update `convex/documents.ts`:
- Filter documents by team membership
- Respect visibility settings (private/team/shared)
- Show shared documents in sidebar

### 5.2 Document Sharing UI

Add to document editor:
- Share button to share with team members
- Select specific members or entire team
- Set view/edit permissions per share

### 5.3 Document Templates

Create `convex/templates.ts`:
- Allow teams to save documents as templates
- Share templates across team
- Template library in dashboard

### 5.4 Team Activity Log

Create `convex/teamActivity.ts`:
- Track all team actions (document created, member added, etc.)
- Display in team dashboard
- Filter by member, action type, date

### 5.5 Permission-Based UI

Update all document actions:
- Hide/disable edit button for viewers
- Hide delete button for members
- Show permission warnings
- Display role badges

---

## Phase 6: Testing & Migration

### 6.1 Unit Tests
- Test team CRUD operations
- Test member management
- Test invitation flow
- Test permission checks

### 6.2 Integration Tests
- Test team billing flow
- Test DodoPayments webhooks
- Test team switching
- Test document access control

### 6.3 Migration Strategy

**For Existing Users:**
1. Create personal workspace for each user
2. Migrate existing documents to personal workspace
3. Preserve all document ownership
4. No changes to billing for solo users

**Migration Script** (`convex/migrations/001_create_personal_workspaces.ts`):
```typescript
// Auto-create personal workspace for each user
// Move documents to personal workspace
// Set currentTeamId to personal workspace
```

### 6.4 Security Audit
- Verify team data isolation
- Test permission boundaries
- Check for data leaks between teams
- Audit all team-related queries

---

## Implementation Checklist

Use the task management system to track progress through all phases.

## Post-Launch Considerations

### Future Enhancements
- [ ] Team analytics dashboard
- [ ] Advanced role customization
- [ ] Team API access
- [ ] SSO/SAML for enterprise
- [ ] Team document folders
- [ ] Bulk operations
- [ ] Team branding on signing pages
- [ ] Audit logs export

### Marketing Updates
- Update pricing page with team plans
- Create team features landing page
- Add team use cases to marketing
- Update SEO for team-related keywords

---

## Technical Considerations

### Performance
- Index optimization for team queries
- Pagination for large teams
- Caching team membership checks

### Security
- Row-level security for team data
- Rate limiting on invitations
- Audit logging for sensitive actions

### Scalability
- Support for 1000+ member teams
- Efficient permission checking
- Background jobs for cleanup

---

## Success Metrics

- **Adoption**: % of users creating teams
- **Conversion**: Trial to paid team conversion rate
- **Engagement**: Team documents vs personal documents
- **Revenue**: MRR from team plans
- **Retention**: Team churn rate vs individual churn

---

**End of Implementation Plan**

