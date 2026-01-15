# Product Requirements Document (PRD): Boopsign

Target "Long-Tail" Keywords:
Ranking for pandadoc alternative is hard (Position 64).
Ranking for affordable proposal software for freelancers is easier. You represent a specific niche.
Recommendation: In future content updates, we should double down on specific use cases (e.g., "Best signature app for freelance designers") rather than just broad "alternatives."

## 1. Executive Summary

Boopsign is a lightweight, secure e-signature SaaS built for freelancers and very small agencies (1-3 people). **Mission:** Provide the fastest and most secure way for freelancers to get contracts signed. **Core Promise:** "Clients can sign contracts without creating an account."

## 2. Goals & Success Metrics

### Goals

1. **Speed:** Enable a first-time sender to upload and send a contract in under 60 seconds.
2. **Simplicity:** Zero friction for signers (no account required).
3. **Security:** Enterprise-grade security (TLS, encrypted values, audit trails) accessible to freelancers.

### Success Metrics (KPIs)

- **Time-to-Send:** Average time from "New Contract" click to "Send" click (Target: < 60s).
- **Completion Rate:** % of sent contracts that are signed within 24 hours.
- **Signer Friction Score:** Drop-off rate at email OTP verification step (Target: < 5%).

## 3. User Roles

- **Sender (Primary):** Freelancers, Consultants, Agency Owners. Needs speed and reliability.
- **Signer (Secondary):** Clients. Needs trust and ease of use (often mobile).

## 4. User Stories

### Sender

- As a specific freelancer, I want to upload a PDF contract quickly so I can get it signed without configuring complex settings.
- As a sender, I want to place a signature field on the document intuitively so the client knows exactly where to sign.
- As a sender, I want to see the status of my sent contracts (Sent, Viewed, Signed) to track progress.

### Signer

- As a client, I want to sign a document received via email without creating an account so I can save time.
- As a client, I want to verify my identity securely via email OTP so I trust the process.
- As a client, I want to sign on my mobile phone easily with a finger signature.

## 5. Functional Requirements

### Authentication (Sender)

- **Provider:** Clerk.
    - _Decision:_ Use Clerk for seamless, secure, and production-ready authentication (email/password, social login, etc.).

### Contract Management

- **Upload:** Support PDF uploads via UploadThing (max size 10MB).
- **Placement:** Drag-and-drop or click-to-place signature field. Default to placing one signature field if none exists.
- **Sending:** Input client email. Optional message.

### Signing Flow

- **Access:** Unique, cryptographically secure link sent via email.
- **Verification:** Email OTP enforcement before viewing the document.
- **Signing:** Client draws signature or types name.
- **Completion:** PDF is flattened/sealed. Both parties receive the signed copy.

### Security & Audit

- **Audit Trail:** Immutable log of:
    - Contract Created (Timestamp, IP)
    - Email Sent
    - Link Opened (IP, User Agent)
    - OTP Verified
    - Signed (Timestamp, IP, Signature Data)
- **Data Security:**
    - No passwords stored.
    - OTPs hashed (bcrypt/argon2) before storage.
    - Signed PDFs stored securely (S3/Convex Storage) with access control.

## 6. UX Flow Specification

### Sender Flow

1. **Dashboard (Home):**
    - Primary CTA: "New Contract" (Large, prominent).
    - List of Recent Contracts (Status indicators).
    - Action: Clicking "New Contract" opens the **Upload Modal**.
2. **Upload Modal:**
    - Drag & drop zone (UploadThing).
    - Auto-advance on file selection.
3. **Prepare Screen:**
    - PDF Preview.
    - Floating "Signature" tool. Click to place on document.
    - "Send" button active once signature field is placed.
4. **Send Modal/Screen:**
    - Input: Client Email.
    - Action: "Send Request".

### Signer Flow

1. **Email Notification:**
    - Branded email: "[Sender Name] sent you a document to sign".
    - CTA: "Review & Sign".
2. **Security Check:**
    - Landing page prompting for Email OTP.
    - (Simultaneously send OTP to signer's email).
3. **Signing Interface:**
    - Mobile-responsive PDF viewer.
    - "Start" button jumps to signature field.
    - Tap to Sign -> Draw curve or Type name.
4. **Completion:**
    - Success screen.
    - "Download Signed Copy" button.

## 7. Security & Threat Model

### Assets

- User Contracts (Confidential).
- Signer Personal Data (Email, IP, Signature).

### Threats & Mitigations

|Threat|Mitigation|
|---|---|
|**Unauthorized Access (Link Sharing)**|Tokenized links expire. OTP Verification required for _every_ session or distinct access.|
|**OTP Brute Force**|Rate limiting (e.g., 3 attempts per minute, 10 per hour). Exponential backoff.|
|**Man-in-the-Middle**|TLS everywhere. HSTS.|
|**Database Leak**|OTPs are hashed. No plaintext passwords. Access policies (RLS) in Convex.|
|**Document Tempering**|Digital signature / hash of the final PDF. Audit trail stored separately.|

## 8. Non-Functional Requirements

- **Performance:** < 1s time to first byte. Uploads < 2s for avg files.
- **Reliability:** 99.9% Uptime.
- **Compatibility:** Works on iOS Safari, Android Chrome, Desktop (Chrome/Firefox/Edge/Safari).