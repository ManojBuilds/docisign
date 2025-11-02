import { Lock, FileLock, ShieldCheck, Users, Database, Mail, DownloadCloud } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Document Security & Compliance — BoopSign",
  description:
    "How BoopSign protects your documents: encryption, access control, storage, compliance and auditability.",
  keywords: [
    "document security",
    "data protection",
    "boopsign",
    "encryption",
    "compliance",
    "gdpr",
    "soc2",
  ],
  alternates: {
    canonical: "https://boopsign.com/document-security-guide",
  },
};

export default function DocumentSecurityGuidePage() {
  return (
    <div >
      {/* Hero */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              Security & Compliance
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Documents, <span className="text-indigo-600">Protected by Design</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            We protect documents from upload to signature and beyond — encryption, access controls,
            auditable trails, and compliance-ready policies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm md:text-base">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              TLS & AES-256
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Audit Trails
            </Badge>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              GDPR-ready
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Need a Data Processing Agreement? <Link href="#compliance" className="underline">Request a DPA</Link>
          </div>
        </div>
      </section>

      {/* Encryption & Data Protection */}
      <section id="encryption" className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-14 h-14 aspect-square bg-indigo-50 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Encryption & Data Protection</h2>
              <p className="text-gray-600 max-w-3xl">
                We use industry-standard encryption and modern key management to keep documents private and
                tamper-evident.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>In transit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">All network traffic is protected with TLS 1.3. Uploads and downloads use
                short-lived signed URLs to reduce exposure.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>At rest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Documents are stored encrypted using AES-256. Sensitive keys are
                managed using HSM-backed key management when available.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Tamper-evidence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Signed PDFs are created with tamper-evident markers; any post-sign
                modification invalidates the audit chain.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Access Control & Authentication */}
      <section id="access" className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-14 h-14 aspect-square bg-indigo-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Access Control & Authentication</h2>
              <p className="text-gray-600 max-w-3xl">Control who can view, send, and sign documents. Authentication
              strength should match the risk of the transaction.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Authentication options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Email verification + click-to-sign (low risk)</li>
                  <li>SMS OTP or magic link (medium risk)</li>
                  <li>ID verification & MFA (high risk / regulated)</li>
                  <li>Enterprise SSO (SAML / OIDC) for teams</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Link & Session Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Every document link is signed and time-limited. Sessions use secure,
                rotating tokens (managed by Clerk or your auth provider) with short cookie lifetimes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Storage & File Handling */}
      <section id="storage" className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-14 h-14 aspect-square bg-indigo-50 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Storage & File Handling</h2>
              <p className="text-gray-600 max-w-3xl">Where files live, how long we keep them, and how we clean up expired
              artifacts.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Storage providers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Depending on your deployment: Convex Storage, AWS S3, or Google Cloud
                Storage with server-side encryption and restricted bucket policies.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Temporary URLs & uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Uploads use pre-signed URLs. Download URLs are short-lived and signed to
                prevent hotlinking and unauthorized access.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Retention & limits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Default retention: 90 days (configurable by plan). Example file size
                limits: Free 10MB / Pro 100MB — configurable per tenant.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section id="compliance" className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-14 h-14 aspect-square bg-indigo-50 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Compliance & Legal</h2>
              <p className="text-gray-600 max-w-3xl">We design our processes to be compatible with major
              regulatory frameworks and to support enterprise requirements.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Data privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>GDPR-ready: data subject rights supported (export, delete, rectification)</li>
                  <li>Privacy-by-design: minimal data collection</li>
                  <li>Data Processing Agreement (DPA) available on request</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Standards & audits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Hosted on SOC 2 / ISO 27001-compliant cloud infrastructure (customers may request evidence)</li>
                  <li>Regular dependency scans, penetration tests and vulnerability management</li>
                  <li>eSignature compliance: designed to support ESIGN Act and eIDAS workflows</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* <div className="mt-6 text-sm text-gray-600">
            <strong>Need a DPA?</strong> <Link href="mailto:security@boopsign.com" className="underline">security@boopsign.com</Link>
          </div> */}
        </div>
      </section>

      {/* Transparency & Auditing */}
      <section id="auditing" className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-14 h-14 aspect-square bg-indigo-50 rounded-lg flex items-center justify-center">
              <FileLock className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Transparency & Audit Trail</h2>
              <p className="text-gray-600 max-w-3xl">Every signing session creates a detailed, exportable audit
              record useful for disputes and compliance reviews.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>What we log</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Timestamps for every action</li>
                  <li>IP addresses and geolocation hints</li>
                  <li>Authentication method used and proof artifacts (when applicable)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Audit PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Export a human-readable audit PDF with the signed document and signing
                metadata for legal review or preservation.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Retention & exports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Admins can export signed artifacts and audit logs for e-discovery and
                legal purposes. Retention is configurable by plan and tenant policies.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section id="disclosure" className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 aspect-square bg-indigo-50 rounded flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Found a security issue?</h3>
                <p className="text-gray-600 mb-4">We welcome responsible disclosure. Please email <strong>mkumar.react@gmail.com</strong> with details.</p>
                <div className="text-sm text-gray-600">We aim to acknowledge reports within 48 hours and will coordinate fixes and disclosure timelines.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <DownloadCloud className="mx-auto w-12 h-12 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Security isn't a feature — it's our foundation.</h3>
          <p className="text-gray-600 mb-6">Start a secure workflow for document signing and management with BoopSign.</p>
          <StartTrialBtn />
        </div>
      </section>

      <Cta />
    </div>
  );
}
