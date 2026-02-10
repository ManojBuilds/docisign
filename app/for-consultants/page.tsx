import { Metadata } from "next";
import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Zap, Users, Smartphone, TrendingUp, Lock, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "E-Signature for Consultants | Boopsign",
  description: "Professional e-signatures for consultants. Send service agreements, NDAs, and proposals. No client accounts. 92% completion. $19-39/month.",
  alternates: {
    canonical: "https://boopsign.com/for-consultants",
  },
};

export default function ForConsultantsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ClientHeaderWrapper />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              E-Signature Tool for <span className="text-blue-600">Professional Consultants</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              Send service agreements, NDAs, proposals, and engagement letters. No client accounts required. Built specifically for consultants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-lg font-bold rounded-xl">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-slate-300 h-12 px-8 text-lg font-bold rounded-xl">
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Consultants Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Why Consultants Choose Boopsign
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Unlike enterprise tools, Boopsign is built specifically for consultants who need to get agreements signed quickly and professionally.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Briefcase className="size-8 text-blue-600" />,
                  title: "Professional Agreements",
                  description: "Perfect for service agreements, engagement letters, NDAs, and consulting contracts. Look professional to your clients."
                },
                {
                  icon: <Users className="size-8 text-blue-600" />,
                  title: "No Client Accounts",
                  description: "Your clients don't need to create accounts. Just click and sign. This eliminates the #1 reason signatures get abandoned (37% abandonment from account friction)."
                },
                {
                  icon: <TrendingUp className="size-8 text-blue-600" />,
                  title: "92% Completion Rate",
                  description: "Industry average is 63-68%. Our simple, mobile-first interface means more contracts get signed faster."
                },
                {
                  icon: <Smartphone className="size-8 text-blue-600" />,
                  title: "Mobile-First Experience",
                  description: "Your clients can sign on any device in under 90 seconds. Responsive design that works perfectly on phones and tablets."
                },
                {
                  icon: <Lock className="size-8 text-blue-600" />,
                  title: "Legal Compliance",
                  description: "Meets ESIGN Act, UETA, and eIDAS requirements. Legally binding signatures with complete audit trails."
                },
                {
                  icon: <Zap className="size-8 text-blue-600" />,
                  title: "Lightning Fast Setup",
                  description: "Get started in under 2 minutes. No complex onboarding or training required."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultant Scenarios */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Perfect for Every Consulting Field
              </h2>
              <p className="text-lg text-slate-600">
                Whether you're in management, IT, finance, or strategy, Boopsign works for your consulting practice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Management Consultants",
                  description: "Send engagement letters, project agreements, and confidentiality agreements with ease."
                },
                {
                  title: "IT Consultants",
                  description: "Share technical service agreements, SOWs, and data processing agreements."
                },
                {
                  title: "Financial Advisors",
                  description: "Distribute investment advisory agreements, disclosure documents, and client contracts."
                },
                {
                  title: "Strategy Consultants",
                  description: "Send proposal documents, statement of work, and strategic partnership agreements."
                }
              ].map((scenario, index) => (
                <div key={index} className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{scenario.title}</h3>
                  <p className="text-slate-600">{scenario.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                Simple Pricing for Consultants
              </h2>
              <p className="text-lg text-slate-600">
                No per-user fees. No hidden costs. Just what you need.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$19",
                  period: "/month",
                  signatures: "20 signatures",
                  features: ["No client accounts required", "Mobile-optimized signing", "Custom branding", "Priority support", "Audit trail"],
                  cta: "Get Started",
                  popular: false
                },
                {
                  name: "Professional",
                  price: "$39",
                  period: "/month",
                  signatures: "75 signatures",
                  features: ["Everything in Starter", "Advanced analytics", "API access", "Custom workflows", "Dedicated support"],
                  cta: "Get Started",
                  popular: true
                }
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white border rounded-2xl p-8 ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20 relative' : 'border-slate-200'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <p className="text-slate-500 mb-6">{plan.signatures} per month</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="size-5 text-green-500 mr-2" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Get More Consulting Agreements Signed
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of consultants who've switched to a simpler, more effective e-signature solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100 h-12 px-8 text-lg font-bold rounded-xl">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="bg-transparent border-white text-white hover:bg-blue-700 h-12 px-8 text-lg font-bold rounded-xl">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}