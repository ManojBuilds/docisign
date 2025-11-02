import {
  CheckCircle, ArrowRight,
  FileText,
  Shield, Clock
} from "lucide-react";
import { Metadata } from "next";
import StartTrialBtn from "@/components/StartTrialBtn";
import Faq from "@/components/faq";
import Cta from "@/components/cta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contract Signing Best Practices — BoopSign",
  description:
    "Practical, secure, and legally-minded best practices for preparing, sending, and managing signed contracts. Templates, checklists, and edge cases for teams.",
  keywords: [
    "contract signing best practices",
    "electronic contract checklist",
    "contract security",
    "contract signing workflow",
    "boopsign",
    "esign best practices",
    "contract templates",
  ],
  alternates: {
    canonical: "https://boopsign.com/contract-signing-best-practices",
  },
};

const contractFaq = [
  {
    id: "faq-1",
    question: "What makes a contract valid when signed electronically?",
    answer:
      "A valid electronic contract needs clear consent to sign electronically, evidence of intent, an identity-assurance mechanism (reasonable for the risk), and a reproducible record (audit trail and retention).",
  },
  {
    id: "faq-2",
    question: "How should I store signed contracts?",
    answer:
      "Store them in encrypted, access-controlled storage with redundancy. Keep the signed document, the audit trail (timestamps, IPs, auth method), and any identity verification artifacts together. Regularly back up and rotate keys where applicable.",
  },
  {
    id: "faq-3",
    question: "Do templates reduce legal risk?",
    answer:
      "Yes — standardized, reviewed templates reduce errors and omissions. Keep versions, add metadata (version, effective date), and require approvals before sending. Use role-based access to edit templates.",
  },
  {
    id: "faq-4",
    question: "What authentication level should I use?",
    answer:
      "Match authentication to risk. Low-value, routine agreements can use email + click-to-sign. Higher-risk or regulated agreements should use identity verification, multi-factor authentication, or qualified signatures where required.",
  },
  {
    id: "faq-5",
    question: "What about notarization or witnesses?",
    answer:
      "Some documents still require notarization or witnesses by law. Use e-notary services where accepted, or route documents for in-person signing when required. Document the reason when you fall back to wet-ink signing.",
  },
];

export default function ContractSigningBestPracticesPage() {
  return (
    <div >
      {/* Hero */}
      <section className="text-center py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Badge
              variant="outline"
              className="bg-indigo-100 text-indigo-800 border-indigo-200"
            >
              Best Practices
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Contract Signing <span className="text-indigo-600">Best Practices</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
            Practical rules, checklists and workflows to make your contract signing fast,
            secure, and defensible — whether you’re a team of one or a global enterprise.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Practice-driven
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
              Risk-based
            </Badge>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              Audit-ready
            </Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-gray-600">
            Used by teams to sign faster and reduce disputes
          </div>
        </div>
      </section>

      {/* Quick Checklist */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quick Checklist Before Sending a Contract
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Run down this checklist to avoid common pitfalls and speed up execution.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Preparation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <ul className="list-inside list-disc space-y-1">
                  <li>Use a reviewed template (with version metadata)</li>
                  <li>Confirm the counterparty details (legal name, address)</li>
                  <li>Embed key dates clearly (effective, termination)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Risk & Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <ul className="list-inside list-disc space-y-1">
                  <li>Assess risk to choose auth strength (email, SMS OTP, ID check)</li>
                  <li>Enable multi-factor for high-value transactions</li>
                  <li>Record why a specific auth method was used</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Post-Sign & Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <ul className="list-inside list-disc space-y-1">
                  <li>Keep the signed PDF + full audit trail together</li>
                  <li>Retention policy and export options for compliance</li>
                  <li>Automated notifications for renewals/expiry</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommended Workflow */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recommended Signing Workflow</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              A repeatable flow teams rely on to keep contracts consistent and defensible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" /> Prepare
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>Start with an approved template, fill parties & variables, attach exhibits.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Auto-merge fields and do a quick content QA pass</li>
                  <li>Mark negotiable vs. non-negotiable clauses</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" /> Authenticate
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>Choose authentication methods aligned to contract risk.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Email & OTP for routine agreements</li>
                  <li>Identity verification or enterprise SSO for high-risk signings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" /> Record & Retain
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-3">
                <p>Capture a tamper-evident PDF and a full signing audit trail.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Store signed PDF + audit log (timestamps, IPs, auth)</li>
                  <li>Provide downloadable/exportable evidence for legal review</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Storage */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Security & Storage Recommendations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Defend signing integrity with layered controls and clear retention policies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Encryption & Keys</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="space-y-3">
                  <li>Encrypt documents at rest and in transit (TLS + AES-256)</li>
                  <li>HSM-backed key management for signing/verification keys</li>
                  <li>Key rotation and access audit logs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Access & Governance</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <ul className="space-y-3">
                  <li>Role-based access control (who can send, who can sign, who can archive)</li>
                  <li>Approval flows for changes to templates and high-value contracts</li>
                  <li>Retention policy with export/secure-delete options</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Edge Cases & Special Situations */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Edge Cases & When to Escalate</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Regulated Documents</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p className="mb-3">
                  Certain documents may require special handling (notarization, witness, or specific ID verification).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Escalate to legal when jurisdiction or industry rules are unclear.</li>
                  <li>Use e-notary integrations where accepted.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Cross-border & International</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p className="mb-3">
                  Cross-border contracts may trigger different standards (eIDAS, ESIGN, local notarization).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Record signer's jurisdiction and apply regional rules.</li>
                  <li>When in doubt, add traceable verification steps and legal review.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates & Automation */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Templates & Automation</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Use templates and automation to reduce errors, speed up approvals, and maintain consistency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Controlled Templates</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>Template library with edit permissions, version history, and required fields.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Auto-fill & Merging</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>Automate party data merges and guardrails to prevent malformed contracts.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>Approval Workflows</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p>Define who must review and approve before a document is sent for signature.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Should Use */}
      <section className="py-16 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">Who benefits most from these practices?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                  <CheckCircle /> Small teams & startups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Keep contracts simple and defensible — templates + automated reminders save time and reduce risk.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <ArrowRight /> Legal & compliance teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Centralized governance, audit-ready logs, and configurable authentication let you scale safely.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <Faq heading="Contract Signing: Common Questions" items={contractFaq} />
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 px-4 ">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Disclaimer:</strong> This page provides general best practices and is not legal advice.
                  Requirements and enforceability vary by jurisdiction and document type — consult legal counsel
                  for contract-specific guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
