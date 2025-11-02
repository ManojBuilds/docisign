import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, FileText, Shield, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Real Estate Document Signing | Property Contracts | Coming Soon",
  description:
    "Streamline real estate transactions with electronic document signing. This page is currently under construction.",
  keywords: [
    "real estate document signing",
    "property contract signing",
    "electronic real estate forms",
    "digital property transactions",
    "boopsign",
    "real estate paperwork",
  ],
  alternates: {
    canonical: "https://boopsign.com/real-estate-document-signing",
  },
};

export default function RealEstateDocumentSigningPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Construction className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Real Estate Document Signing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is currently under construction. We're working hard to bring you the best practices for streamlining real estate transactions.
          </p>
        </div>

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
                <span>Purchase agreements</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Lease agreements</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Title transfer documents</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Mortgage documents</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>Property inspection reports</span>
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
                <Link href="mailto:mkumar.react@gmail.com?subject=Notify me about Real Estate Document Signing">
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