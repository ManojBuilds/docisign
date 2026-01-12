import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield, Star, XCircle, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Signature Without Account Creation — Sign in 30 Seconds | BoopSign",
  description:
    "The only e-signature tool where signers don't need accounts. Send contracts, NDAs, and proposals—your clients sign instantly without login. No friction, just signatures. $15/month.",
  keywords: [
    "e-signature no account needed",
    "no account e-signature",
    "sign documents without account",
    "e-signature without login",
    "no registration e-signature",
    "instant document signing",
    "sign without creating account",
    "no login document signing",
    "frictionless e-signature",
    "simple e-signature",
  ],
  alternates: {
    canonical: "https://boopsign.com/no-account-esignature",
  },
};

const noAccountFaq = [
  {
    id: "faq-1",
    question: "Why don't signers need to create accounts?",
    answer:
      "BoopSign sends each signer a unique, secure one-time link via email. They click the link, sign the document, and they're done. No password creation, no profile setup, no friction. This reduces signing time from hours to minutes.",
  },
  {
    id: "faq-2",
    question: "Is it still secure if signers don't have accounts?",
    answer:
      "Absolutely! Each signing link is unique, time-limited, and tied to the signer's verified email address. We track IP addresses, timestamps, and email verification for a complete audit trail. It's just as legally binding as traditional e-signatures—but faster.",
  },
  {
    id: "faq-3",
    question: "What if someone else clicks the signing link?",
    answer:
      "The link is sent to the signer's email and can only be used once. We verify the email address and track all signing activity. If you need additional security, you can enable SMS verification or access codes.",
  },
  {
    id: "faq-4",
    question: "Do I need an account to send documents?",
    answer:
      "Yes, as the sender you'll create a free BoopSign account to upload and manage documents. But your clients (the signers) never need to create accounts—that's the key difference that eliminates friction.",
  },
  {
    id: "faq-5",
    question: "How is this different from DocuSign or HelloSign?",
    answer:
      "DocuSign and HelloSign require signers to create accounts or log in, which creates massive friction. Many clients forget passwords, abandon the signing process, or get frustrated. BoopSign eliminates this entirely—your clients just click and sign.",
  },
  {
    id: "faq-6",
    question: "Can I try it free?",
    answer:
      "Yes! Start your 7-day free trial with no credit card required. Send unlimited documents and see how much faster your clients sign when they don't need accounts.",
  },
];

export default function NoAccountEsignaturePage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto max-w-6xl">
          <Badge variant="outline" className="mb-4">
            The #1 Differentiator
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            E-Signature <span className="text-primary">without account creation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Stop losing clients to password resets and account creation friction.
            BoopSign is the <span className="font-semibold text-foreground">only e-signature tool</span> where
            your clients sign instantly—<span className="font-semibold text-foreground">no login, no account, no friction</span>.
            Just click, sign, done in 30 seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
            <Badge variant="outline">No Account Required</Badge>
            <Badge variant="outline">30-Second Signing</Badge>
            <Badge variant="outline">Mobile-Optimized</Badge>
            <Badge variant="outline">Legally Binding</Badge>
          </div>

          <StartTrialBtn />

          <div className="mt-8 text-sm text-muted-foreground">
            Join freelancers & consultants who get contracts signed 10x faster
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Hidden Cost of Forced Account Creation
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Most e-signature tools force your clients to create accounts. Here's why that's killing your business:
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="rounded-lg border p-6">
              <div className="text-4xl mb-4">😤</div>
              <h3 className="font-bold text-xl mb-2">Client Frustration</h3>
              <p className="text-muted-foreground">
                "I need to create ANOTHER account just to sign this?" Your clients are
                busy. They don't want another password to remember.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="font-bold text-xl mb-2">Massive Delays</h3>
              <p className="text-muted-foreground">
                Average time to sign with account creation: 24-48 hours. Many clients
                abandon the process entirely, costing you deals.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="font-bold text-xl mb-2">Lost Revenue</h3>
              <p className="text-muted-foreground">
                Every hour of delay is a chance for clients to change their mind.
                Friction = lost deals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              BoopSign: Sign in 30 Seconds, No Account Needed
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Here's how it works—ridiculously simple:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-xl mb-3">You Upload & Send</h3>
              <p className="text-muted-foreground">
                Upload your contract, NDA, or proposal. Add signer email. Click send.
                Takes 30 seconds.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-xl mb-3">Client Gets Secure Link</h3>
              <p className="text-muted-foreground">
                Your client receives a unique, one-time signing link via email.
                No account creation. No password.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-xl mb-3">They Click & Sign</h3>
              <p className="text-muted-foreground">
                Client clicks link, signs with finger or mouse, done. Signed PDF
                delivered instantly. Total time: 30 seconds.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl font-semibold mb-4">
              That's it. No friction. No delays. Just signatures.
            </p>
            <StartTrialBtn />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Account Required vs No Account: The Difference
          </h2>
          <p className="text-lg mb-12 text-muted-foreground">
            See why "no account needed" is a game-changer
          </p>

          <div className="rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b bg-accent">
                    <th className="py-4 px-4 font-semibold">Feature</th>
                    <th className="py-4 px-4 text-center font-semibold">
                      BoopSign<br />(No Account)
                    </th>
                    <th className="py-4 px-4 text-center font-semibold">
                      DocuSign/HelloSign<br />(Account Required)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">
                      Signer Account Required
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" /> <span className="font-semibold">No</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      <div className="flex justify-center items-center gap-2">
                        <XCircle className="w-5 h-5" /> <span className="font-semibold">Yes</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">
                      Average Signing Time
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">
                      30 seconds - 2 minutes
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      24-48 hours
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">
                      Client Friction
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">
                      Zero
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      High (password resets, forgotten logins)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">
                      Mobile Signing
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" /> Perfect
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      Requires app download
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">
                      Completion Rate
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">
                      95%+
                    </td>
                    <td className="py-4 px-4 text-center text-muted-foreground">
                      60-70%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why "No Account Needed" Changes Everything
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              This isn't just a feature—it's a fundamental rethinking of how e-signatures should work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">10x Faster Signing</h3>
                  <p className="text-muted-foreground">
                    No account creation means no password setup, no email verification,
                    no profile completion. Your clients go from email to signed document
                    in under 1 minute. Compare that to the 24-48 hour average with
                    traditional e-signature tools.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Higher Completion Rates</h3>
                  <p className="text-muted-foreground">
                    Studies show 30-40% of people abandon forms that require account
                    creation. With BoopSign, your completion rate jumps to 95%+ because
                    there's zero friction. More signatures = more closed deals.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Still Legally Binding</h3>
                  <p className="text-muted-foreground">
                    No account doesn't mean less secure. Every signature includes email
                    verification, IP tracking, timestamp, and a complete audit trail.
                    Fully compliant with ESIGN Act and UETA. Just as legally binding as
                    DocuSign—but way faster.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Better Client Experience</h3>
                  <p className="text-muted-foreground">
                    Your clients will love you for this. No more "I forgot my password"
                    or "I never got the verification email." Just click, sign, done.
                    Professional, fast, and respectful of their time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real User Stories */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Freelancers & Consultants Say
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-1 text-xl">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="text-muted-foreground ml-2">4.9/5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-lg border p-6">
              <div className="flex justify-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "I used to lose 2-3 days waiting for clients to 'figure out' DocuSign.
                With BoopSign, they sign in minutes. The no-account thing is a
                game-changer for my freelance business."
              </p>
              <p className="font-semibold">- Alex M., Freelance Designer</p>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex justify-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "My clients are busy executives. They don't have time to create
                accounts. BoopSign respects their time—they click, sign, and we're
                done. Brilliant."
              </p>
              <p className="font-semibold">- Sarah K., Business Consultant</p>
            </div>

            <div className="rounded-lg border p-6">
              <div className="flex justify-center gap-1 mb-3">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
                <Star className="w-4 h-4 fill-primary text-primary" />
              </div>
              <p className="mb-4 italic text-muted-foreground">
                "I switched from HelloSign specifically because of the no-account
                feature. My contract signing time went from 3 days to 3 hours. Worth
                every penny."
              </p>
              <p className="font-semibold">- David R., Freelance Developer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perfect For Professionals Who Value Speed
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <CheckCircle className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Freelancers</h3>
                <p className="text-muted-foreground">
                  Get client contracts signed fast. No more chasing clients to "finish
                  setting up their account."
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <CheckCircle className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Consultants</h3>
                <p className="text-muted-foreground">
                  Send NDAs, proposals, and consulting agreements. Your clients sign
                  immediately—no friction.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <CheckCircle className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Small Businesses</h3>
                <p className="text-muted-foreground">
                  Vendor agreements, service contracts, and approvals—all signed in
                  minutes, not days.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <CheckCircle className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Agencies</h3>
                <p className="text-muted-foreground">
                  Client onboarding, SOWs, and contracts. Streamline your workflow with
                  zero client friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 px-4 border-b">
        <div className="container mx-auto max-w-4xl">
          <Faq
            heading="No Account E-Signature: Your Questions Answered"
            items={noAccountFaq}
          />
        </div>
      </section>

      {/* Final CTA */}
      <Cta />
    </div>
  );
}
