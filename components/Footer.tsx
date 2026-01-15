import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t py-12 w-full bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <Logo showStatus={true} />
              <p className="text-sm text-muted-foreground">
                The simplest e-signature solution for modern businesses.
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <ShieldCheckIcon size={18} className="text-primary" />
                <span>Secure & legally binding</span>
              </div>
              <p className="text-xs text-muted-foreground/80 mt-4">
                &copy; {new Date().getFullYear()} BoopSign. All rights reserved.
              </p>
            </div>
          </div>

          {/* Product Features */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-foreground">Powerful Features</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/online-signature-maker"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Create signatures instantly</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/proposal-signing-software"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Proposal signing software</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/freelance-contract-template"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Contract templates</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/mobile-electronic-signature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Mobile-first design</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/no-account-esignature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>No account required</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/remote-team-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Remote team solutions</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/hr-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>HR contract management</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/client-onboarding-documents"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Client onboarding contracts</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/real-estate-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Real estate solutions</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/healthcare-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Healthcare solutions</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/fintech-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Fintech & Finance</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/education-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Education & Schools</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/esignature-for-freelancers"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>For Freelancers</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/esignature-for-consultants"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>For Consultants</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Alternatives */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-foreground">Ditch the Expensive</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docusign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>DocuSign alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/hellosign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>HelloSign alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/pandadoc-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>PandaDoc alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/adobe-sign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Adobe Sign alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/dropbox-sign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Dropbox Sign alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/signnow-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Signnow alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/signrequest-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Signrequest alternative</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/zoho-sign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Zoho Sign alternative</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Templates */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-foreground">Resources & Templates</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-foreground font-semibold hover:text-blue-600 hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">★</span>
                    <span>Free Contract Library</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/social-media-management-contract-template"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-orange-500">→</span>
                    <span>Social Media Contract</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/wedding-photography-contract-template"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-orange-500">→</span>
                    <span>Wedding Photo Contract</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/house-cleaning-service-agreement-template"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-orange-500">→</span>
                    <span>Cleaning Service Agreement</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/3-minute-freelance-workflow"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-slate-400">•</span>
                    <span>3-Minute Workflow</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/esignature-cost-comparison"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-slate-400">•</span>
                    <span>Cost Analysis</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Join thousands of professionals saving time and money with BoopSign
          </p>
          <div className="flex justify-center space-x-2 sm:space-x-6 text-xs text-muted-foreground">
            <span>ESIGN Act Compliant</span>
            <span>•</span>
            <span>UETA Certified</span>
            <span>•</span>
            <span>GDPR Ready</span>
            <span>•</span>
            <span>Bank-Level Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
