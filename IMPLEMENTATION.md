# Technical Implementation Plan: Boopsign

## 1. Technical Architecture

### Overview

Boopsign is a monolithic Next.js application (App Router) hosted on a serverless/edge runtime (Vercel recommended). Data persistence and realtime state are managed by Convex. Email delivery is via Resend.

### Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **Backend/Database:** Convex (BaaS). Handles data schema, mutations (server functions), queries.
- **Authentication:** Clerk.
- **File Storage:** UploadThing.
- **Email:** Resend API.
- **PDF Manipulation:** `pdf-lib` (for embedding signatures/flattening).
- **PDF Rendering:** `react-pdf` or generic object viewer.
- **Signature:** `react-signature-canvas`.

### Data Models (Convex Schema)

- `users`: Sender accounts (email, name).
- `contracts`: (fileStorageId, senderId, status, title).
- `signers`: (contractId, email, otpHash, otpCustomExpiration, status, name, signatureId).
- `auditLogs`: (contractId, action, ip, timestamp, metadata).

## 2. Package & Library Recommendations

### Core

- `convex`: Database & Backend logic.
- `@clerk/nextjs`: Authentication.
- `uploadthing`, `@uploadthing/react`: File Uploads.
- `next`: Framework.
- `react`, `react-dom`.
- `lucide-react`: Icons.

### UI / UX

- `clsx`, `tailwind-merge`: For shadcn/ui.
- `sonner` or `react-hot-toast`: For notifications.
- `framer-motion`: For smooth layout transitions (essential for "premium" feel).

### Security & Crypto

- `bcryptjs` or `argon2`: For hashing OTPs before storage. (Note: Run on server side/Convex action).
- `otp-generator`: For generating secure OTPs.

### PDF & Signing

- `pdf-lib`: For server-side (Convex Action) manipulation of PDFs.
- `react-pdf`: For rendering PDF pages in the browser.
- `react-signature-canvas`: For capturing user signatures.

### Email

- `resend`: For sending transactional emails.
- `@react-email/components`: For building email templates.

## 3. Security Architecture

- **OTP Strategy:**
    1. Generate 6-digit CSPRNG OTP.
    2. Hash OTP (bcrypt) -> Store Hash + Expiry in DB.
    3. Send Raw OTP via Email.
    4. Verify: User inputs OTP -> Hash input -> Compare with stored hash.
    5. Invalidate hash immediately after use.
- **Rate Limiting:**
    - Implement "Rate Limit" table in Convex.
    - Track attempts by IP/Email. Block after N failed attempts.
- **Access Control:**
    - Convex RLS (Row Level Security) equivalent logic in queries/mutations.
    - Sender sees only `contracts` where `senderId == auth.userId`.
    - Signer sees `contracts` only if they have a valid session token (via OTP exchange).

## 4. Phased Roadmap (Execution Plan)

### Phase 1: Foundation & Upload (Day 1-2)

- [ ]  Initialize project (Next.js + Convex).
- [ ]  Implement Sender Auth (Clerk).
- [ ]  Create "Upload Contract" Modal (UploadThing).
- [ ]  basic PDF Viewer.

### Phase 2: The "Happy Path" (Day 3-5)

- [ ]  Implement Signature Field placement UI.
- [ ]  Implement "Send" (Create Signer record + Send Email).
- [ ]  Implement Signer OTP verification logic.

### Phase 3: Signing & Completion (Day 6-8)

- [ ]  Mobile-responsive signing interface.
- [ ]  Signature capture & PDF embedding (server-side via `pdf-lib`).
- [ ]  Finalize Audit Trail.

### Phase 4: Polish & Launch (Day 9-10)

- [ ]  UI Micro-animations.
- [ ]  Error handling (Expirations, Network issues).
- [ ]  Final Security Review (Rate limits, Input validation).