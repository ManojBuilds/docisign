# Email Sequence Implementation Notes

## ✅ Fixed Issues

1. **Added semicolon** to `COUPON_CODE` declaration (line 24)
2. **Added fallback value** `"TEMPLATE20"` for when `SPECIAL_COUPON_CODE` env var is not set
3. **Updated subject line** for Email 3 to match preview text: `"🎁 Exclusive offer: 20% off Boopsign Pro"`

## 📧 Email Sequence Flow

### Email 1: Template Download (Immediate)
- **Subject**: `Your [Template Name] Download`
- **Preview**: `Your [Template] is ready to download 📄`
- **Content**: Download link + intro to Boopsign
- **CTA**: Download Template, Try Boopsign Free

### Email 2: Education (2 days later)
- **Subject**: `How to get your [Template Name] signed in minutes`
- **Preview**: `The fastest way to get your [Template] signed ✍️`
- **Content**: Benefits of using Boopsign for signatures
- **CTA**: Send Your First Document

### Email 3: Special Offer (5 days from start / 3 days after Email 2)
- **Subject**: `🎁 Exclusive offer: 20% off Boopsign Pro`
- **Preview**: `🎁 Exclusive offer: 20% off Boopsign Pro`
- **Content**: 20% discount coupon code
- **CTA**: Claim Your 20% Discount

## 🔧 Environment Variables

### Required (Optional with Fallback)
```bash
SPECIAL_COUPON_CODE=TEMPLATE20  # Defaults to "TEMPLATE20" if not set
```

### Already Configured
```bash
NEXT_PUBLIC_APP_URL=https://boopsign.com  # Used for generating links
```

## 📊 Database Schema

The `leads` table tracks:
- `email`: Lead's email address
- `source`: Template slug (e.g., "freelance-contract-template")
- `name`: Optional first name
- `status`: "active" or "unsubscribed"
- `sequenceStep`: 0-3 (tracks which email was last sent)
- `lastEmailSentAt`: Timestamp of last email
- `createdAt`: When lead was created

## 🎯 How It Works

1. User fills out `TemplateDownloadDialog` with email + name
2. `leads.subscribe` mutation is called
3. Lead is created in database with `sequenceStep: 0`
4. Email 1 is immediately scheduled
5. After Email 1 sends, `advanceSequence` is called
6. Email 2 is scheduled for 2 days later
7. After Email 2 sends, `advanceSequence` is called again
8. Email 3 is scheduled for 3 more days (5 days total from start)
9. Sequence completes after Email 3

## ⚠️ Things to Verify

1. **✅ Download URL - IMPLEMENTED**: 
   - Uses `/api/download?url=[fileUrl]&filename=[slug].docx`
   - The email fetches the actual template file URL from `ALL_TEMPLATES`
   - Falls back to the template page if no file URL is found
   - Downloads are proxied through the `/api/download` endpoint for security
   - Supports both `.docx` and `.pdf` files
   
2. **Template Name Formatting**: 
   - Current: "freelance-contract-template" → "Freelance Contract Template"
   - Edge cases like "nda" → "Nda" (might want "NDA")

3. **Coupon Code Integration**:
   - Make sure your pricing page accepts the `TEMPLATE20` coupon code
   - Or set `SPECIAL_COUPON_CODE` in your environment variables

## 🚀 Testing

To test the email sequence locally:
1. Fill out the template download dialog
2. Check Convex dashboard for scheduled functions
3. Emails will be in test mode when running on localhost
4. Check console logs for email send confirmations
