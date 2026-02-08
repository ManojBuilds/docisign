import { XCircle, CheckCircle } from "lucide-react";

const AntiFeatureManifesto = () => {
  return (
    <section className="py-24 lg:py-32 bg-white" id="anti-features">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Our Intentional Limitations
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-6">
            Why Boopsign Doesn't Have 800 Features
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            (And Why That's Exactly What You Need)
          </p>
        </div>

        {/* Anti-Features Grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Features We Don't Have */}
          <div className="bg-red-50 rounded-3xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-2">
              <XCircle className="size-6" />
              We Could Add These. We Won't.
            </h3>
            <ul className="space-y-4">
              <li className="text-red-700 font-medium">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Complex Multi-Level Approval Workflows</span>
                    <br />
                    <span className="text-sm text-red-600">Why: You don't have a legal department. You're the legal department.</span>
                  </div>
                </div>
              </li>
              <li className="text-red-700 font-medium">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Salesforce / HubSpot CRM Integration</span>
                    <br />
                    <span className="text-sm text-red-600">Why: You're not managing 10,000 leads. You're closing 15 deals this month.</span>
                  </div>
                </div>
              </li>
              <li className="text-red-700 font-medium">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Bulk Sending to 1,000+ Recipients</span>
                    <br />
                    <span className="text-sm text-red-600">Why: You're not doing mass mail campaigns. You're working with real clients.</span>
                  </div>
                </div>
              </li>
              <li className="text-red-700 font-medium">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Advanced API Webhooks & Custom Integrations</span>
                    <br />
                    <span className="text-sm text-red-600">Why: You're running a business, not maintaining a tech stack.</span>
                  </div>
                </div>
              </li>
              <li className="text-red-700 font-medium">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">47 Different Signature Styles</span>
                    <br />
                    <span className="text-sm text-red-600">Why: Your clients just want to sign and move on with their day.</span>
                  </div>
                </div>
              </li>
              <li className="text-red-700 font-medium">
                <div className="flex items-start gap-3">
                  <XCircle className="size-5 mt-0.5 text-red-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Team Collaboration & Permissions</span>
                    <br />
                    <span className="text-sm text-red-600">Why: It's just you. Why pay for seats you'll never fill?</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Benefits of What We Don't Have */}
          <div className="bg-green-50 rounded-3xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              <CheckCircle className="size-6" />
              The 6 Things That Actually Matter
            </h3>
            <ul className="space-y-4">
              <li className="text-green-700 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Upload PDF or Word in 5 Seconds</span>
                    <br />
                    <span className="text-sm text-green-600">Drag, drop, done. No conversion wait. No "unsupported format" errors.</span>
                  </div>
                </div>
              </li>
              <li className="text-green-700 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Beautiful Editor That Makes Sense</span>
                    <br />
                    <span className="text-sm text-green-600">Drag signature boxes where you need them. Add dates, text, initials. Takes 30 seconds.</span>
                  </div>
                </div>
              </li>
              <li className="text-green-700 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Secure Email Links (No Client Accounts)</span>
                    <br />
                    <span className="text-sm text-green-600">Your client clicks, signs, done. No passwords. No app downloads. No friction.</span>
                  </div>
                </div>
              </li>
              <li className="text-green-700 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Custom Branding With Your Logo</span>
                    <br />
                    <span className="text-sm text-green-600">Every email, every signing page shows YOUR brand. You look professional, not generic.</span>
                  </div>
                </div>
              </li>
              <li className="text-green-700 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Template Management That Works</span>
                    <br />
                    <span className="text-sm text-green-600">Save your standard contracts. Reuse in 10 seconds. No rebuilding from scratch.</span>
                  </div>
                </div>
              </li>
              <li className="text-green-700 font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle className="size-5 mt-0.5 text-green-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold">Actually Works on Mobile</span>
                    <br />
                    <span className="text-sm text-green-600">Your client signs with their finger while waiting for coffee. 90-second completion rate.</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="max-w-3xl mx-auto mt-16 text-center bg-slate-50 rounded-3xl p-8 border border-slate-200">
          <p className="text-lg text-slate-700 font-medium leading-relaxed mb-4">
            Every feature we DON'T add:
          </p>
          <ul className="text-left max-w-xl mx-auto space-y-2 mb-6 text-slate-600">
            <li>• Keeps the tool faster</li>
            <li>• Keeps the interface simpler</li>
            <li>• Keeps the price lower</li>
            <li>• Means you can actually find what you need</li>
          </ul>
          <p className="text-xl text-slate-700 font-medium leading-relaxed mb-4">
            We do <span className="text-indigo-600 font-bold">6 things perfectly</span> instead of 800 things poorly.
          </p>
          <p className="text-lg text-slate-600 font-medium">
            That's not a limitation. That's a philosophy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AntiFeatureManifesto;