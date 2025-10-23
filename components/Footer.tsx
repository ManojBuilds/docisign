const Footer = () => {
  return (
    <footer className="border-t py-10 w-full bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="md:col-span-1">
            <div className="flex flex-col space-y-4">
              <div className="font-bold text-lg">Boopsign</div>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Boopsign. All rights reserved.
              </p>
            </div>
          </div>

          {/* Signature Tools */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-base mb-3">Signature Tools</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/online-signature-maker"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Online Signature Maker
                </a>
              </li>
              {/* <li>
                <a
                  href="/esignature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Electronic Signature
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/digital-signature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Digital Signature
                </a>
              </li> */}
              <li>
                <a
                  href="/mobile-electronic-signature"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Mobile Signature
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Pages */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-base mb-3">Popular Pages</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/docusign-alternative"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  DocuSign Alternative
                </a>
              </li>
              {/* <li>
                <a
                  href="/pdf-signer"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  PDF Signer
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/contract-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Contract Signing
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/document-signing"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Document Signing
                </a>
              </li> */}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-base mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              {/* <li>
                <a
                  href="/terms-of-service"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Terms of Service
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/acceptable-use-policy"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Acceptable Use Policy
                </a>
              </li> */}
              {/* <li>
                <a
                  href="/cookie-policy"
                  className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Cookie Policy
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Secure and legally binding electronic signatures for your documents.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
