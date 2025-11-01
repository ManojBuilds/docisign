# BoopSign Team Support - Code Examples

This document provides ready-to-use code examples for implementing team support.

---

## 1. Database Schema (convex/schema.ts)

### Add to existing schema:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ... existing tables (users, documents, etc.)
  
  teams: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    
    plan: v.union(
      v.literal("personal"),
      v.literal("team_starter"),
      v.literal("team_pro"),
      v.literal("enterprise")
    ),
    maxSeats: v.number(),
    usedSeats: v.number(),
    
    dodoCustomerId: v.optional(v.string()),
    dodoSubscriptionId: v.optional(v.string()),
    subscriptionStatus: v.union(
      v.literal("trial"),
      v.literal("active"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("past_due")
    ),
    
    settings: v.optional(v.object({
      allowMemberInvites: v.boolean(),
      defaultDocumentVisibility: v.union(v.literal("team"), v.literal("private")),
      brandingColor: v.optional(v.string()),
      logoUrl: v.optional(v.string()),
    })),
    
    ownerId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    trialEndDate: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_owner", ["ownerId"])
    .index("by_subscription_status", ["subscriptionStatus"]),

  teamMembers: defineTable({
    teamId: v.id("teams"),
    userId: v.string(),
    
    role: v.union(
      v.literal("owner"),
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    
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
    invitedBy: v.optional(v.string()),
  })
    .index("by_team", ["teamId"])
    .index("by_user", ["userId"])
    .index("by_team_and_user", ["teamId", "userId"])
    .index("by_team_and_status", ["teamId", "status"]),

  teamInvitations: defineTable({
    teamId: v.id("teams"),
    email: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("member"),
      v.literal("viewer")
    ),
    
    invitedBy: v.string(),
    inviteToken: v.string(),
    
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("expired"),
      v.literal("revoked")
    ),
    
    createdAt: v.number(),
    expiresAt: v.number(),
    acceptedAt: v.optional(v.number()),
  })
    .index("by_team", ["teamId"])
    .index("by_email", ["email"])
    .index("by_token", ["inviteToken"])
    .index("by_status", ["status"]),
});
```

---

## 2. Permission System (convex/permissions.ts)

```typescript
import { QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const ROLE_PERMISSIONS = {
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

export async function getUserTeamMembership(
  ctx: QueryCtx | MutationCtx,
  teamId: Id<"teams">,
  userId: string
) {
  return await ctx.db
    .query("teamMembers")
    .withIndex("by_team_and_user", (q) => 
      q.eq("teamId", teamId).eq("userId", userId)
    )
    .filter((q) => q.eq(q.field("status"), "active"))
    .first();
}

export async function checkPermission(
  ctx: QueryCtx | MutationCtx,
  teamId: Id<"teams">,
  userId: string,
  permission: keyof typeof ROLE_PERMISSIONS.owner
): Promise<boolean> {
  const membership = await getUserTeamMembership(ctx, teamId, userId);
  
  if (!membership) {
    return false;
  }
  
  return membership.permissions[permission];
}

export async function requirePermission(
  ctx: MutationCtx,
  teamId: Id<"teams">,
  userId: string,
  permission: keyof typeof ROLE_PERMISSIONS.owner
): Promise<void> {
  const hasPermission = await checkPermission(ctx, teamId, userId, permission);
  
  if (!hasPermission) {
    throw new Error(`You don't have permission to ${permission}`);
  }
}

export async function isTeamOwner(
  ctx: QueryCtx | MutationCtx,
  teamId: Id<"teams">,
  userId: string
): Promise<boolean> {
  const membership = await getUserTeamMembership(ctx, teamId, userId);
  return membership?.role === "owner";
}
```

---

## 3. Team CRUD Operations (convex/teams.ts)

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ROLE_PERMISSIONS } from "./permissions";

// Create a new team
export const createTeam = mutation({
  args: {
    name: v.string(),
    plan: v.union(
      v.literal("team_starter"),
      v.literal("team_pro"),
      v.literal("enterprise")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const slug = args.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const now = Date.now();
    
    // Determine max seats based on plan
    const maxSeats = args.plan === "team_starter" ? 3 : 
                     args.plan === "team_pro" ? 10 : 999;

    // Create team
    const teamId = await ctx.db.insert("teams", {
      name: args.name,
      slug,
      plan: args.plan,
      maxSeats,
      usedSeats: 1,
      ownerId: identity.subject,
      subscriptionStatus: "trial",
      trialEndDate: now + (7 * 24 * 60 * 60 * 1000), // 7 days
      settings: {
        allowMemberInvites: true,
        defaultDocumentVisibility: "team",
      },
      createdAt: now,
      updatedAt: now,
    });

    // Add creator as owner
    await ctx.db.insert("teamMembers", {
      teamId,
      userId: identity.subject,
      role: "owner",
      permissions: ROLE_PERMISSIONS.owner,
      status: "active",
      joinedAt: now,
    });

    return teamId;
  },
});

// Get user's teams
export const getUserTeams = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("teamMembers")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    const teams = await Promise.all(
      memberships.map(async (membership) => {
        const team = await ctx.db.get(membership.teamId);
        return {
          ...team,
          role: membership.role,
        };
      })
    );

    return teams.filter((team) => team !== null);
  },
});

// Switch user's current team
export const switchTeam = mutation({
  args: {
    teamId: v.id("teams"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Verify user is member of team
    const membership = await ctx.db
      .query("teamMembers")
      .withIndex("by_team_and_user", (q) => 
        q.eq("teamId", args.teamId).eq("userId", identity.subject)
      )
      .first();

    if (!membership) {
      throw new Error("You are not a member of this team");
    }

    // Update user's current team
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (user) {
      await ctx.db.patch(user._id, {
        currentTeamId: args.teamId,
        updatedAt: Date.now(),
      });
    }

    return { success: true };
  },
});
```

---

## 4. Team Invitations (convex/teamInvitations.ts)

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { requirePermission } from "./permissions";

// Send team invitation
export const sendTeamInvitation = mutation({
  args: {
    teamId: v.id("teams"),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check permission
    await requirePermission(ctx, args.teamId, identity.subject, "canInviteMembers");

    // Check if already invited
    const existingInvite = await ctx.db
      .query("teamInvitations")
      .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
      .filter((q) => 
        q.and(
          q.eq(q.field("email"), args.email),
          q.eq(q.field("status"), "pending")
        )
      )
      .first();

    if (existingInvite) {
      throw new Error("User already invited");
    }

    // Check if already a member
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      const existingMember = await ctx.db
        .query("teamMembers")
        .withIndex("by_team_and_user", (q) => 
          q.eq("teamId", args.teamId).eq("userId", existingUser.clerkId)
        )
        .first();

      if (existingMember) {
        throw new Error("User is already a team member");
      }
    }

    const now = Date.now();
    const inviteToken = crypto.randomUUID();

    // Create invitation
    const invitationId = await ctx.db.insert("teamInvitations", {
      teamId: args.teamId,
      email: args.email,
      role: args.role,
      invitedBy: identity.subject,
      inviteToken,
      status: "pending",
      createdAt: now,
      expiresAt: now + (7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Send invitation email
    const team = await ctx.db.get(args.teamId);
    const inviter = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    await ctx.scheduler.runAfter(0, api.emails.sendTeamInvitationEmail, {
      to: args.email,
      teamName: team!.name,
      inviterName: inviter?.firstName || inviter?.email || "A team member",
      role: args.role,
      inviteUrl: `${process.env.NEXT_PUBLIC_APP_URL}/team/invite/${inviteToken}`,
    });

    return invitationId;
  },
});

// Accept invitation
export const acceptInvitation = mutation({
  args: {
    inviteToken: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !identity.email) {
      throw new Error("Not authenticated");
    }

    const invitation = await ctx.db
      .query("teamInvitations")
      .withIndex("by_token", (q) => q.eq("inviteToken", args.inviteToken))
      .first();

    if (!invitation) {
      throw new Error("Invalid invitation");
    }

    if (invitation.status !== "pending") {
      throw new Error("Invitation is no longer valid");
    }

    if (invitation.email !== identity.email) {
      throw new Error("This invitation is for a different email address");
    }

    if (Date.now() > invitation.expiresAt) {
      await ctx.db.patch(invitation._id, { status: "expired" });
      throw new Error("Invitation has expired");
    }

    const now = Date.now();

    // Add user to team
    await ctx.db.insert("teamMembers", {
      teamId: invitation.teamId,
      userId: identity.subject,
      role: invitation.role,
      permissions: ROLE_PERMISSIONS[invitation.role],
      status: "active",
      joinedAt: now,
      invitedBy: invitation.invitedBy,
    });

    // Update invitation status
    await ctx.db.patch(invitation._id, {
      status: "accepted",
      acceptedAt: now,
    });

    // Update team seat count
    const team = await ctx.db.get(invitation.teamId);
    if (team) {
      await ctx.db.patch(team._id, {
        usedSeats: team.usedSeats + 1,
        updatedAt: now,
      });
    }

    return { teamId: invitation.teamId };
  },
});
```

---

## 5. Team Switcher Component (components/TeamSwitcher.tsx)

```typescript
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

export function TeamSwitcher() {
  const { user } = useUser();
  const teams = useQuery(
    api.teams.getUserTeams,
    user ? { userId: user.id } : "skip"
  );
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user ? { clerkId: user.id } : "skip"
  );
  const switchTeam = useMutation(api.teams.switchTeam);

  const currentTeam = teams?.find(
    (team) => team._id === currentUser?.currentTeamId
  );

  const handleSwitchTeam = async (teamId: Id<"teams">) => {
    await switchTeam({ teamId });
  };

  if (!teams || teams.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <span className="truncate">{currentTeam?.name || "Select team"}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Teams</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {teams.map((team) => (
          <DropdownMenuItem
            key={team._id}
            onClick={() => handleSwitchTeam(team._id)}
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                currentTeam?._id === team._id ? "opacity-100" : "opacity-0"
              }`}
            />
            <span className="truncate">{team.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          Create team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

**More examples available in the full implementation plan.**

