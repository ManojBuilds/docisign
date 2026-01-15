import HowItWorks from "@/components/HowItWorks";
import Cta from "@/components/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How BoopSign Works - 3-Minute Setup for Freelance E-Signatures",
  description: "See how easy it is to get contracts signed with BoopSign. Upload PDF, add signature fields, and send in 3 minutes. Clients sign instantly without an account.",
  alternates: {
    canonical: "https://boopsign.com/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="pt-20">
        <HowItWorks />
      </div>
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Why freelancers love this workflow</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold mb-2">1. No Client Friction</h3>
              <p className="text-gray-600 text-sm">Your client never has to create an account or password. They just click the link and sign.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold mb-2">2. Mobile First</h3>
              <p className="text-gray-600 text-sm">Works perfectly on iPhone and Android. Capture signatures from clients who are on the go.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold mb-2">3. Instant Audit Trail</h3>
              <p className="text-gray-600 text-sm">Every document includes a comprehensive log of IP addresses and timestamps for legal proof.</p>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </main>
  );
}
