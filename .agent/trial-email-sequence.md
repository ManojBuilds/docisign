# Trial Email Sequence Implementation

## Overview
Implemented a comprehensive 5-email trial sequence designed to optimize trial-to-paid conversion with a goal of 35%+.

## Email Sequence

### Day 1: Welcome Email (Already Implemented)
- **Subject**: "Welcome to Boopsign!"
- **Content**: Getting started guide with 3 simple steps
- **CTA**: "Send Your First Document"
- **Trigger**: Sent immediately upon user signup

### Day 3: Templates Tip
- **Subject**: "Quick tip: Save contracts as templates"
- **Content**: Educate users about the templates feature to save time
- **CTA**: "Create Your First Template"
- **File**: `convex/emails/templates/trial_day_3.tsx`

### Day 7: Case Study
- **Subject**: "How Sarah saved 6 hours/week with Boopsign"
- **Content**: Social proof with a freelancer success story
- **Focus**: Highlights Professional plan features (Bulk Send, Smart Reminders)
- **CTA**: "See Professional Plan Features"
- **File**: `convex/emails/templates/trial_day_7.tsx`

### Day 10: Check-in (3 Days Left)
- **Subject**: "3 days left in your trial - any questions?"
- **Content**: Friendly reminder with support offer
- **Focus**: Address concerns, offer help
- **CTA**: "Upgrade Now"
- **File**: `convex/emails/templates/trial_day_10.tsx`

### Day 13: Urgency (Upgrade Tomorrow)
- **Subject**: "Upgrade tomorrow to keep your templates"
- **Content**: Final push with clear value proposition
- **Focus**: Fear of loss (losing templates and setup)
- **CTA**: "Upgrade & Save My Setup"
- **File**: `convex/emails/templates/trial_day_13.tsx`

## Technical Implementation

### Schema Changes
Added `trialEmailsSent` object to user schema to track which emails have been sent:
```typescript
trialEmailsSent: v.optional(v.object({
  day3: v.optional(v.boolean()),
  day7: v.optional(v.boolean()),
  day10: v.optional(v.boolean()),
  day13: v.optional(v.boolean()),
}))
```

### Email Actions
Created 4 new email sending actions in `convex/emails.tsx`:
- `sendTrialDay3Email`
- `sendTrialDay7Email`
- `sendTrialDay10Email`
- `sendTrialDay13Email`

### Cron Job Logic
Updated `convex/notifications.ts` with intelligent scheduling:
- Runs daily at 10:00 UTC (configured in `convex/crons.ts`)
- Calculates days since trial start for each user
- Sends appropriate emails based on trial day
- Marks emails as sent to prevent duplicates
- Maintains backward compatibility with existing reminder system

### Email Templates
All templates follow consistent design:
- Use `EmailLayout` component for branding
- Clear, benefit-focused messaging
- Single, prominent CTA button
- Mobile-responsive design
- Professional tone with personality

## Conversion Optimization Strategy

### Day 3 (Education)
- **Goal**: Increase product engagement
- **Strategy**: Teach power-user feature (templates)
- **Psychology**: Provide immediate value, build habit

### Day 7 (Social Proof)
- **Goal**: Build trust and desire
- **Strategy**: Real customer success story
- **Psychology**: "People like me" effect, FOMO

### Day 10 (Support)
- **Goal**: Remove objections
- **Strategy**: Offer personalized help
- **Psychology**: Reciprocity, relationship building

### Day 13 (Urgency)
- **Goal**: Drive immediate action
- **Strategy**: Loss aversion (lose templates/setup)
- **Psychology**: Scarcity, endowment effect

## Key Features

1. **Idempotent**: Each email only sent once per user
2. **Automated**: Runs daily via cron job
3. **Scalable**: Handles unlimited trial users
4. **Tracked**: Full logging for monitoring
5. **Flexible**: Easy to adjust timing or content

## Monitoring & Optimization

Track these metrics to optimize for 35%+ conversion:
- Email open rates (target: 40%+)
- Click-through rates (target: 15%+)
- Conversion rate by email (which drives most upgrades?)
- Time-to-conversion (which day do most users convert?)
- Unsubscribe rate (keep below 1%)

## Next Steps

1. **A/B Testing**: Test different subject lines and CTAs
2. **Personalization**: Add user activity-based triggers
3. **Segmentation**: Different sequences for different user behaviors
4. **Analytics**: Integrate with analytics platform for conversion tracking
5. **Feedback Loop**: Survey users who don't convert to improve messaging

## Files Modified/Created

### Created:
- `convex/emails/templates/trial_day_3.tsx`
- `convex/emails/templates/trial_day_7.tsx`
- `convex/emails/templates/trial_day_10.tsx`
- `convex/emails/templates/trial_day_13.tsx`

### Modified:
- `convex/schema.ts` - Added `trialEmailsSent` tracking
- `convex/emails.tsx` - Added 4 new email actions
- `convex/emails/templates/index.ts` - Exported new templates
- `convex/notifications.ts` - Implemented sequence logic
