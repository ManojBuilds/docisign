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
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.967.744L14.146 7.2 13.047 14H9a1 1 0 110-2h3.847l1.08-6.276-1.933-.523-.933 5.476H10a1 1 0 010-2h1.847l.98-5.724A1 1 0 0112 2zm-6 10a1 1 0 100 2h.01a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
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
                  href="payping.boopsign.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span>Get paid 40% faster</span>
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
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors block"
                >
                  <div className="flex items-start">
                    <span className="mr-2 text-purple-500">🔒</span>
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
                    <span className="mr-2 text-purple-500">💬</span>
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
                    <span className="mr-2 text-purple-500">📞</span>
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
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
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
