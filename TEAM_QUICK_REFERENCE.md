# BoopSign Team Support - Quick Reference Guide

## Overview
This guide provides a quick reference for implementing team support in BoopSign.

---

## Database Schema Summary

### New Tables

#### 1. `teams`
```typescript
{
  name: string,
  slug: string,
  plan: "team_starter" | "team_pro" | "enterprise",
  maxSeats: number,
  usedSeats: number,
  ownerId: string,
  dodoCustomerId?: string,
  dodoSubscriptionId?: string,
  subscriptionStatus: "trial" | "active" | "cancelled" | "expired" | "past_due",
  settings?: {
    allowMemberInvites: boolean,
    defaultDocumentVisibility: "team" | "private",
    brandingColor?: string,
    logoUrl?: string,
  },
  createdAt: number,
  updatedAt: number,
}
```

#### 2. `teamMembers`
```typescript
{
  teamId: Id<"teams">,
  userId: string, // Clerk ID
  role: "owner" | "admin" | "member" | "viewer",
  permissions: {
    canCreateDocuments: boolean,
    canEditDocuments: boolean,
    canDeleteDocuments: boolean,
    canInviteMembers: boolean,
    canManageTeam: boolean,
    canAccessBilling: boolean,
  },
  status: "active" | "suspended" | "removed",
  joinedAt: number,
  invitedBy?: string,
}
```

#### 3. `teamInvitations`
```typescript
{
  teamId: Id<"teams">,
  email: string,
  role: "admin" | "member" | "viewer",
  invitedBy: string,
  inviteToken: string,
  status: "pending" | "accepted" | "expired" | "revoked",
  createdAt: number,
  expiresAt: number,
  acceptedAt?: number,
}
```

### Modified Tables

#### `documents` - Add:
```typescript
{
  teamId?: Id<"teams">,
  visibility?: "private" | "team" | "shared",
  sharedWith?: string[], // Array of Clerk IDs
}
```

#### `users` - Add:
```typescript
{
  currentTeamId?: Id<"teams">,
  personalWorkspaceId?: Id<"teams">,
}
```

---

## Role Permissions Matrix

| Permission | Owner | Admin | Member | Viewer |
|------------|-------|-------|--------|--------|
| Create Documents | ✅ | ✅ | ✅ | ❌ |
| Edit Own Documents | ✅ | ✅ | ✅ | ❌ |
| Edit Team Documents | ✅ | ✅ | ❌ | ❌ |
| Delete Documents | ✅ | ✅ | ❌ | ❌ |
| View Team Documents | ✅ | ✅ | ✅ | ✅ |
| Invite Members | ✅ | ✅ | ❌ | ❌ |
| Manage Members | ✅ | ✅ | ❌ | ❌ |
| Manage Team Settings | ✅ | ✅ | ❌ | ❌ |
| Access Billing | ✅ | ❌ | ❌ | ❌ |
| Delete Team | ✅ | ❌ | ❌ | ❌ |

---

## Pricing Structure

### Individual Plans
- **Free Trial**: $0 for 7 days
- **BoopSign Pro**: $12/month (1 user)

### Team Plans
- **Team Starter**: $29/month (3 seats included)
  - Additional seats: $8/seat/month
  - All Pro features
  - Team collaboration
  
- **Team Pro**: $79/month (10 seats included)
  - Additional seats: $6/seat/month
  - Everything in Starter
  - Document templates
  - Priority support
  - Advanced analytics
  
- **Enterprise**: Custom pricing
  - Unlimited seats
  - SSO/SAML
  - Dedicated support
  - Custom SLA
  - API access

---

## Key API Endpoints

### Team Management
```typescript
// Convex mutations
api.teams.createTeam({ name, plan })
api.teams.updateTeam({ teamId, name, settings })
api.teams.deleteTeam({ teamId })
api.teams.switchTeam({ teamId })

// Convex queries
api.teams.getTeam({ teamId })
api.teams.getUserTeams({ userId })
api.teams.getTeamStats({ teamId })
```

### Member Management
```typescript
// Mutations
api.teamMembers.addTeamMember({ teamId, userId, role })
api.teamMembers.updateMemberRole({ teamId, userId, role })
api.teamMembers.removeMemberFromTeam({ teamId, userId })

// Queries
api.teamMembers.getTeamMembers({ teamId })
api.teamMembers.getUserTeamRole({ teamId, userId })
api.teamMembers.canUserPerformAction({ teamId, userId, action })
```

### Invitations
```typescript
// Mutations
api.teamInvitations.sendTeamInvitation({ teamId, email, role })
api.teamInvitations.acceptInvitation({ inviteToken })
api.teamInvitations.revokeInvitation({ invitationId })

// Queries
api.teamInvitations.getTeamInvitations({ teamId })
api.teamInvitations.getInvitationByToken({ token })
```

---

## File Structure

### New Files to Create

```
convex/
├── teams.ts                    # Team CRUD operations
├── teamMembers.ts              # Member management
├── teamInvitations.ts          # Invitation system
├── teamBilling.ts              # Billing calculations
├── permissions.ts              # RBAC helpers
└── migrations/
    └── 001_create_personal_workspaces.ts

app/
├── (main)/
│   └── team/
│       └── [teamId]/
│           ├── settings/
│           │   └── page.tsx    # Team settings
│           ├── members/
│           │   └── page.tsx    # Member management
│           ├── billing/
│           │   └── page.tsx    # Team billing
│           └── page.tsx        # Team dashboard
├── api/
│   ├── create-team-checkout/
│   │   └── route.ts            # Team subscription checkout
│   └── team-webhook/
│       └── route.ts            # Team billing webhooks

components/
├── TeamSwitcher.tsx            # Workspace switcher
├── CreateTeamWizard.tsx        # Team creation flow
├── TeamMembersList.tsx         # Members table
├── InviteMemberDialog.tsx      # Invite form
└── TeamBillingCard.tsx         # Billing info card
```

---

## Implementation Order

### Week 1-2: Foundation
1. ✅ Create database schema (teams, teamMembers, teamInvitations)
2. ✅ Update existing tables (documents, users)
3. ✅ Implement team CRUD operations
4. ✅ Implement member management
5. ✅ Create permission system

### Week 3-4: Backend Logic
6. ✅ Implement invitation system
7. ✅ Update document operations for teams
8. ✅ Create team billing logic
9. ✅ Integrate with DodoPayments
10. ✅ Write email templates

### Week 5-6: Frontend UI
11. ✅ Build team switcher component
12. ✅ Create team settings page
13. ✅ Build member management UI
14. ✅ Implement invitation flow
15. ✅ Update dashboard for teams
16. ✅ Create team creation wizard

### Week 7-8: Permissions & Sharing
17. ✅ Implement document visibility
18. ✅ Add document sharing UI
19. ✅ Create team templates
20. ✅ Build activity log
21. ✅ Add permission-based UI

### Week 9: Testing & Migration
22. ✅ Write unit tests
23. ✅ Write integration tests
24. ✅ Create migration script
25. ✅ Perform security audit
26. ✅ Test team switching

### Week 10-11: Polish & Launch
27. ✅ Update pricing page
28. ✅ Create team documentation
29. ✅ Beta testing
30. ✅ Launch team features

---

## Common Patterns

### Check Team Permission
```typescript
// In any mutation
const canEdit = await checkPermission(
  ctx,
  teamId,
  userId,
  "canEditDocuments"
);

if (!canEdit) {
  throw new Error("You don't have permission to edit documents");
}
```

### Get User's Teams
```typescript
const teams = await ctx.db
  .query("teamMembers")
  .withIndex("by_user", (q) => q.eq("userId", userId))
  .filter((q) => q.eq(q.field("status"), "active"))
  .collect();
```

### Filter Documents by Team
```typescript
const documents = await ctx.db
  .query("documents")
  .withIndex("by_team", (q) => q.eq("teamId", teamId))
  .filter((q) => {
    // Check visibility and permissions
    return q.or(
      q.eq(q.field("visibility"), "team"),
      q.eq(q.field("ownerId"), userId)
    );
  })
  .collect();
```

---

## Migration Strategy

### For Existing Users
1. **Auto-create personal workspace** for each user
2. **Migrate documents** to personal workspace
3. **Set currentTeamId** to personal workspace
4. **No billing changes** for solo users

### Migration Script
```typescript
// convex/migrations/001_create_personal_workspaces.ts
export default async function migrate(ctx: MigrationCtx) {
  const users = await ctx.db.query("users").collect();
  
  for (const user of users) {
    // Create personal workspace
    const teamId = await ctx.db.insert("teams", {
      name: `${user.firstName}'s Workspace`,
      slug: `personal-${user.clerkId}`,
      plan: "personal",
      maxSeats: 1,
      usedSeats: 1,
      ownerId: user.clerkId,
      subscriptionStatus: user.subscriptionStatus,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    
    // Add user as owner
    await ctx.db.insert("teamMembers", {
      teamId,
      userId: user.clerkId,
      role: "owner",
      permissions: ROLE_PERMISSIONS.owner,
      status: "active",
      joinedAt: Date.now(),
    });
    
    // Update user
    await ctx.db.patch(user._id, {
      currentTeamId: teamId,
      personalWorkspaceId: teamId,
    });
    
    // Migrate documents
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_owner", (q) => q.eq("ownerId", user.clerkId))
      .collect();
    
    for (const doc of docs) {
      await ctx.db.patch(doc._id, {
        teamId,
        visibility: "private",
      });
    }
  }
}
```

---

## Testing Checklist

### Unit Tests
- [ ] Team creation
- [ ] Member addition/removal
- [ ] Role updates
- [ ] Permission checks
- [ ] Invitation flow
- [ ] Document visibility

### Integration Tests
- [ ] Team billing flow
- [ ] Seat management
- [ ] Webhook handling
- [ ] Team switching
- [ ] Document access control

### Security Tests
- [ ] Data isolation between teams
- [ ] Permission boundaries
- [ ] Invitation token security
- [ ] Billing access control

---

## Launch Checklist

### Pre-Launch
- [ ] All tests passing
- [ ] Migration script tested
- [ ] Billing integration verified
- [ ] Email templates tested
- [ ] Documentation complete
- [ ] Security audit done

### Launch Day
- [ ] Run migration script
- [ ] Deploy backend changes
- [ ] Deploy frontend changes
- [ ] Update pricing page
- [ ] Announce to users
- [ ] Monitor for issues

### Post-Launch
- [ ] Track adoption metrics
- [ ] Gather user feedback
- [ ] Fix any bugs
- [ ] Optimize performance
- [ ] Plan next features

---

## Support Resources

### Documentation
- Full implementation plan: `TEAM_IMPLEMENTATION_PLAN.md`
- Task list: Use `view_tasklist` command
- Architecture diagram: See above

### Key Contacts
- Backend: Convex schema and mutations
- Frontend: React components and UI
- Billing: DodoPayments integration
- Email: Resend/Convex email system

---

**Last Updated**: 2025-11-01

