import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText, Mail, Shield } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Remote Team Document Signing | Distributed Workforce | Coming Soon",
  description:
    "Enable seamless document signing for distributed teams. This page is currently under construction.",
  keywords: [
    "remote team document signing",
    "distributed workforce documents",
    "electronic signature for remote teams",
    "digital document signing remote",
    "boopsign",
    "remote work paperwork",
  ],
  alternates: {
    canonical: "https://boopsign.com/remote-team-document-signing",
  },
};

import { TemplatePageHeader } from "@/components/templates/TemplatePageHeader";

export default function RemoteTeamDocumentSigningPage() {
  return (
    <div className="min-h-screen bg-white">
      <TemplatePageHeader
        title="Remote Team Document Signing"
        subtitle="Enable seamless document signing for distributed teams. From employment contracts to equipment policies. Coming soon."
        category="Legal & General"
      />

      <div className="max-w-4xl mx-auto px-4 py-12">

        <Card className="bg-white shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <span>Coming Soon</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Employment contracts for remote workers</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>NDA agreements for distributed teams</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Project collaboration agreements</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Vendor and contractor agreements</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Equipment and asset management forms</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <span>Estimated Completion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                This page will be completed within the next 2 weeks. We're prioritizing quality content to ensure you get the most valuable information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <span>Stay Updated</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Want to be notified when this page goes live?
              </p>
              <Button asChild className="w-full">
                <Link href="mailto:mkumar.react@gmail.com?subject=Notify me about Remote Team Document Signing">
                  <Mail className="w-4 h-4 mr-2" />
                  Notify Me
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/">
              ← Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}