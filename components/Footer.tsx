import { ShieldCheckIcon } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="border-t py-12 w-full bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Info */}
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <Logo />
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
                <a
                  href="/online-signature-maker"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Create signatures instantly</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/proposal-signing-software"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Proposal signing software</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/freelance-contract-template"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Contract templates</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/mobile-electronic-signature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Mobile-first design</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/no-account-esignature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>No account required</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/remote-team-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Remote team solutions</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/hr-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>HR contract management</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/client-onboarding-documents"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Client onboarding contracts</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/real-estate-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Real estate solutions</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/healthcare-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Healthcare solutions</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/fintech-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Fintech & Finance</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/education-document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Education & Schools</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/esignature-for-freelancers"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>For Freelancers</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/esignature-for-consultants"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>For Consultants</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Alternatives */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-foreground">Ditch the Expensive</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/docusign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>DocuSign alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/hellosign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>HelloSign alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/pandadoc-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>PandaDoc alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/adobe-sign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Adobe Sign alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/dropbox-sign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Dropbox Sign alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/signnow-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Signnow alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/signrequest-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Signrequest alternative</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/zoho-sign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-blue-500">&gt;</span>
                    <span>Zoho Sign alternative</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-foreground">Trust & Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/electronic-signature-laws"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Electronic signature laws</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/esignature-vs-digital-signature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>E-signature vs Digital signature</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/how-to-create-electronic-signature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>How to create e-signatures</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/contract-signing-best-practices"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Contract signing best practices</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/document-security-guide"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Contract security guide</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/nda-template-free"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Free NDA templates</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/consulting-agreement-template"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Consulting agreement templates</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Privacy Policy</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mkumar.react@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Support Center</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mkumar.react@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    <span>Contact Sales</span>
                  </div>
                </a>
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
