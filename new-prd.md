# 📘 Product Requirements Document (PRD)

### Product Name: **Signly**

**Tagline:** “Fast, simple, and legally binding e-signatures.”

---

## 🧭 1. Product Overview

Signly is a **minimal e-signature app** that allows users to:

* Upload PDF documents,
* Add signer emails,
* Place signature fields,
* Send for signing,
* And download the **legally binding signed PDF**.

It focuses on **just one core feature** — the **legally binding electronic signature workflow**, built with **Next.js, Convex, Clerk, TailwindCSS, Shadcn/UI, and Resend**.

---

## 🧑‍⚖️ 2. Legal Binding Requirements

To make e-signatures **legally enforceable** (as per **ESIGN Act**, **UETA**, and **eIDAS**), Signly must:

### ✅ Key Legal Elements

| Requirement               | Implementation                                                              |
| ------------------------- | --------------------------------------------------------------------------- |
| **Signer Consent**        | Add “I agree to electronically sign this document” checkbox before signing. |
| **Signer Authentication** | Use unique signer links (UUID token tied to email) + IP logging.            |
| **Intent to Sign**        | Require user action (draw, type, or upload signature).                      |
| **Integrity of Document** | Generate a cryptographically unique signed PDF; prevent post-sign edits.    |
| **Audit Trail**           | Store signer email, IP address, timestamp, and signature hash in Convex.    |
| **Retention**             | Keep both the signed PDF and metadata securely in Convex storage.           |

### 📄 Audit Trail Example

```json
{
  "documentId": "doc_123",
  "signerEmail": "john@example.com",
  "ip": "203.22.44.10",
  "timestamp": "2025-10-09T12:44:00Z",
  "signatureHash": "sha256:abc123..."
}
```

---

## ⚙️ 3. Tech Stack

| Category            | Tech                                                       |
| ------------------- | ---------------------------------------------------------- |
| Frontend            | Next.js 14 (App Router), TypeScript, TailwindCSS, ShadcnUI |
| Auth                | Clerk                                                      |
| Database / Realtime | Convex                                                     |
| File Storage        | Convex File Storage (or UploadThing)                       |
| PDF                 | `react-pdf`, `pdf-lib`                                     |
| Signature Canvas    | `react-signature-canvas`                                   |
| Email               | Resend (for signer invites + confirmation)                 |

---

## 🧱 4. Database Schema (Convex)

### **documents**

```ts
{
  id: Id<"documents">;
  ownerId: string;  // Clerk user ID
  title: string;
  fileUrl: string;
  status: "draft" | "sent" | "signed";
  createdAt: number;
  completedAt?: number;
}
```

### **signers**

```ts
{
  id: Id<"signers">;
  documentId: Id<"documents">;
  email: string;
  name?: string;
  color: string;
  status: "pending" | "signed";
  ip?: string;
  signedAt?: number;
  signatureUrl?: string;   // stored base64 signature
  auditTrail?: any;        // stores IP, timestamp, hash
}
```

### **fields**

```ts
{
  id: Id<"fields">;
  documentId: Id<"documents">;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "signature" | "date" | "text";
  signerEmail: string;
}
```

### **signatures**

```ts
{
  id: Id<"signatures">;
  documentId: Id<"documents">;
  signerId: Id<"signers">;
  imageData: string;  // base64
  signedAt: number;
}
```

---

## 🔁 5. Complete User Flow

1. **Owner logs in (Clerk).**
2. **Uploads a document.**
3. **Adds signer emails.**
4. **Places signature fields.**
5. **Sends document for signing (Resend sends unique links).**
6. **Signer opens email link → reviews → signs → consents.**
7. **Signly merges signatures into PDF (via pdf-lib).**
8. **Audit trail generated.**
9. **Owner downloads final signed PDF.**

---

## 🎨 6. Page-by-Page UI Plan

### 🏠 **Page 1: Dashboard**

**Route:** `/dashboard`

#### Layout:

* Top bar → “Signly” logo + Profile menu (Clerk)
* Primary CTA: “+ New Document”
* Document List (cards or table):

  * Title
  * Status (Draft / Sent / Signed)
  * Last updated date
  * Actions: View / Delete

#### Empty state:

> “No documents yet. Upload your first one to start signing.”

---

### 📤 **Page 2: Upload + Add Signers**

**Route:** `/new`

#### Layout:

Two-column grid
**Left:**

* Upload PDF (drag & drop box)
* Preview thumbnail after upload

**Right:**

* “Add Signers” list

  * Email input + “Add” button
  * Show color-coded list of signers
  * Option for sequential signing toggle

Bottom button: **“Continue to Editor” → `/editor/:docId`**

---

### ✍️ **Page 3: Document Editor**

**Route:** `/editor/:docId`

#### Layout:

* **Header:**

  * “← Back”
  * Document Title
  * “Send for Signature” (primary button)

* **Main Body:**

  * PDF Viewer (rendered using `react-pdf`)
  * Sidebar (left): Tools

    * Signature Field
    * Date Field
    * Text Field
  * Sidebar (right): Signers

    * List of signers with color badges
  * Canvas Overlay:

    * Drag & drop fields onto PDF
    * Assign each to a signer (color-coded border)

---

### ✉️ **Page 4: Sign Page**

**Route:** `/sign/:token`

#### Layout:

* Header:

  * Document name
  * “This e-signature is legally binding” (small disclaimer)

* Main:

  * PDF preview (readonly, scrolled)
  * Signature box → draw, type, or upload
  * Consent checkbox:

    > “By checking this box, I agree to electronically sign this document.”
  * “Sign & Submit” button

After submission:

* Save signature
* Log signer’s IP + timestamp
* Update document status

Redirect to: `/signed-success`

---

### ✅ **Page 5: Signed Success / Download Page**

**Route:** `/signed-success`

#### Layout:

* Large ✅ success icon
* Message:

  > “Your document has been successfully signed and is now legally binding.”
* Buttons:

  * “Download Signed PDF”
  * “Return to Dashboard”

---

## 📧 7. Email Templates (Resend)

### 1. Signer Invitation Email

**Subject:** “You’ve been asked to sign a document on Signly”
**Body:**

```
Hi [Signer Name],

[Owner Name] has sent you a document to sign.

Click below to review and sign securely.

[Sign Document Button → unique token link]
```

### 2. Confirmation Email

**Subject:** “Document Signed Successfully”
**Body:**

```
Hi [Owner Name],

All signers have completed the document: [Title].
You can now download the final signed PDF.

[Download PDF Button]
```

---

## 🔐 8. Security & Compliance

* All documents stored privately, accessible only to owner & signers.
* Each signer link includes a **unique, expiring token**.
* IP + timestamps logged for compliance.
* Final signed PDF includes an appended **audit trail page** with signer details.

---
