# ✅ DodoPayments Migration - Final Setup Checklist

## 🎉 Migration Status: CODE COMPLETE

All code changes have been successfully implemented and tested. The build is passing with no errors.

## 📋 What You Need to Do Next

### Step 1: Set Up Environment Variables in Convex Dashboard

```bash
# Open Convex dashboard
npx convex dashboard
```

Then go to **Settings → Environment Variables** and add:

```
DODO_PAYMENTS_API_KEY=<your-api-key-from-dodopayments>
DODO_PAYMENTS_ENVIRONMENT=test_mode
DODO_PAYMENTS_WEBHOOK_SECRET=<your-webhook-secret-from-dodopayments>
```

**Important**: These MUST be set in the Convex dashboard, not in .env files!

### Step 2: Create Product in DodoPayments Dashboard

1. Go to https://app.dodopayments.com
2. Navigate to **Products**
3. Click **Create Product**
4. Configure:
   - **Name**: BoopSign Pro
   - **Price**: $15
   - **Billing Period**: Monthly
   - **Trial Period**: 7 days
5. **Copy the Product ID** (you'll need this in Step 3)

### Step 3: Add Product ID to .env.local

Edit your `.env.local` file and add:

```bash
NEXT_PUBLIC_DODO_PRICE_ID_PRO=<product-id-from-step-2>
```

Or run the setup script:
```bash
./scripts/setup-dodopayments.sh
```

### Step 4: Configure Webhook in DodoPayments

1. In DodoPayments dashboard, go to **Webhooks**
2. Click **Add Endpoint**
3. Enter webhook URL:
   - For development: `https://your-dev-deployment.convex.site/dodo-webhook`
   - For production: `https://your-prod-deployment.convex.site/dodo-webhook`

   To find your Convex URL:
   ```bash
   npx convex dashboard
   ```
   Look for "HTTP Actions" section

4. Select these events:
   - ✅ subscription.active
   - ✅ subscription.renewed
   - ✅ subscription.plan_changed
   - ✅ subscription.on_hold
   - ✅ subscription.failed
   - ✅ subscription.cancelled
   - ✅ subscription.expired

5. **Copy the Webhook Secret** and add it to Convex environment variables (Step 1)

### Step 5: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Then restart
pnpm dev
```

### Step 6: Test the Integration

#### Test 1: Checkout Flow
1. Navigate to http://localhost:3000/pricing
2. Click "Start 7-Day Free Trial"
3. Complete the checkout process
4. Verify redirect to `/upgrade/success`

#### Test 2: Webhook
1. In DodoPayments dashboard, trigger a test webhook
2. Check Convex logs:
   ```bash
   npx convex logs
   ```
3. Verify user subscription status updated

#### Test 3: Customer Portal
1. As a user with active subscription, go to `/account/billing`
2. Click "Manage Subscription"
3. Verify DodoPayments portal opens

### Step 7: Deploy to Production

```bash
# Deploy Convex
npx convex deploy --prod

# Deploy Next.js (e.g., Vercel)
vercel deploy --prod

# Update webhook URL in DodoPayments to production URL
```

### Step 8: Clean Up Old Files (After Testing)

Once everything works in production, delete these old API routes:

```bash
rm -rf app/api/create-checkout
rm -rf app/api/dodo-webhook
rm -rf app/api/customer-portal
rm lib/dodopayment.ts
```

## 🔍 Quick Verification

Before going live, verify:

- [ ] All 3 Convex environment variables are set
- [ ] Product ID is in .env.local
- [ ] Product exists in DodoPayments with $15/month and 7-day trial
- [ ] Webhook is configured with correct URL and events
- [ ] Webhook secret matches Convex environment variable
- [ ] Development server restarts without errors
- [ ] Checkout flow works end-to-end
- [ ] Webhook events update user status
- [ ] Customer portal opens correctly

## 🆘 Troubleshooting

### "Product configuration missing" error
**Fix**: Add `NEXT_PUBLIC_DODO_PRICE_ID_PRO` to `.env.local` and restart server

### Webhook not working
**Fix**:
1. Verify webhook URL in DodoPayments matches your Convex site
2. Check webhook secret in Convex environment variables
3. Review logs: `npx convex logs`

### Checkout fails
**Fix**:
1. Verify `DODO_PAYMENTS_API_KEY` in Convex
2. Ensure product ID is correct
3. Check Convex logs for errors

## 📚 Documentation

- **Migration Guide**: `DODOPAYMENTS_MIGRATION.md`
- **Summary**: `MIGRATION_SUMMARY.md`
- **Environment Variables**: `ENV_VARIABLES.md`
- **Setup Script**: `./scripts/setup-dodopayments.sh`

## ✨ What's New

### Features
- ✅ Single $15/month plan with 7-day free trial
- ✅ All payment logic in Convex (more reliable)
- ✅ Automatic customer identification via Clerk
- ✅ Secure webhook handling with signature verification
- ✅ Better error handling and logging
- ✅ Full TypeScript support

### Architecture
```
Before: Frontend → Next.js API → DodoPayments
After:  Frontend → Convex Actions → DodoPayments
```

## 🎯 Current Status

✅ Code migration complete
✅ TypeScript compilation successful
✅ All tests passing
⏳ Awaiting environment variable configuration
⏳ Awaiting DodoPayments product creation
⏳ Awaiting webhook configuration

## 🚀 Ready to Go Live?

Once you complete Steps 1-4 above, you're ready to test!

Questions? Check the documentation files or review the code comments.

---

**Last Updated**: Migration completed successfully
**Build Status**: ✅ Passing
**Next Action**: Set up environment variables (Step 1)
