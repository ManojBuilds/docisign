Page Load

Home page -> 1.17s
Dashboard
 - Navigation -> 1.23s
 - Page load -> 3s (On refresh)

File upload
277KB-> 4s

Editor
 - Page load -> 4s (On refresh)

Upload to Editor -> 7s

Issues: 
- After upload pdf it goes to the editor and it takes a lot of time and it does not load it empty after some times if i refresh the page then it loads correctly. (Its loading but it tooks like 10 seconds)
- In the place fields dont show icon in the mobile and also dont show assigned email address.

- use responsive-dialog in the @saveAsTemplateDialog

  // Validate that all roles are filled
            if (Object.values(roleMappings).some(role => !role.trim())) {
                toast.error("Please assign a Role Name to all signers.");
                setIsSubmitting(false);
                return;
            }
Sometimes I got this error even though I've added one field and assign the role for it but when I try to save it as a template, it fails.


Mobile:

when mobile user is uanble to to remove the added filed on clicking the added field it not opening settings for it


testing

To test the Usage and Limit Gates effectively, you should verify both the visual restrictions (Frontend) and the strict enforcement (Backend).

Here is a comprehensive strategy for testing all scenarios:

1. The "Convex Dashboard" Method (Manual Testing)
This is the fastest way to test. You can manually edit your user record in the Convex dashboard (https://dashboard.convex.dev) to simulate different states:

To Test "Trial Reached Limit":
Find your user in the users table.
Set signatureRequestsUsed to 1 (or whatever the limit is in 
convex/users.ts
).
Set plan to "trial".
Result: Go to the Share Dialog or Dashboard. You should see the "Limit Reached" upgrade prompt instead of the usual UI.
To Test "Trial Expired":
Find your user.
Set trialEndDate to a timestamp in the past (e.g., 1700000000000).
Result: The 
TrialGate
 should trigger, blocking access to the main editor and showing the "Trial Expired" screen.
To Test "Paid Plan":
Set subscriptionStatus to "active".
Set plan to "professional".
Result: All limits and gates should disappear instantly.
2. Verification Checklist
When you reach a limit, verify the following across the app:

Scenario	Location	Expected Behavior
Signature Limit	
ShareDialog.tsx
Instead of seeing the "Send" button, the user sees an "Upgrade to Pro" message.
Template Limit	NewTemplateDialog	The "Save as Template" button is replaced by a lock icon or upgrade prompt.
Backend Guard	
convex/documents.ts
Try to call createDocument via the console while at the limit; it should throw a ConvexError("Unauthorized").
Trial Expired	
Editor
The entire page should be blurred or replaced by the 
TrialGate
 component.
3. Testing Backend Enforcement (CLI)
Don't just trust the UI hide/show logic. Test that a malicious user can't bypass the UI by calling the function directly:

bash
# Attempt to create a document when over the limit
npx convex run documents:createDocument '{"title": "Test", "ownerId": "YOUR_CLERK_ID", ...}'
It should return an error if your logic in 
convex/documents.ts
 is working correctly.

4. Automated E2E Scenarios (Playwright)
If you use Playwright, you can create a test suite that:

Mocks the Convex response for getUsageStats to return used: 1, limit: 1.
Asserts that the 
UsageLimitGate
 fallback is visible.
Asserts that the "Send for Signature" button is disabled or hidden.
Important Note on Recent Fixes
I noticed you removed 
UsageLimitGate
 from 
ShareDialog.tsx
 and 
UsageStats.tsx
 due to linting errors. To restore protection, make sure you Wrap the sensitive buttons or sections like this:

tsx
<UsageLimitGate limitType="signatureRequests" customMessage="You've used your 1 free request.">
  <Button onClick={handleSend}>Send for Signature</Button>
</UsageLimitGate>