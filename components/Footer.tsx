const Footer = () => {
  return (
    <footer className="border-t py-6 w-full">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Boopsign. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end">
          <a
            href="/online-signature-maker"
            className="text-sm text-muted-foreground hover:underline"
          >
            Online Signature Maker
          </a>
          <a
            href="/docusign-alternative"
            className="text-sm text-muted-foreground hover:underline"
          >
            DocuSign Alternative
          </a>
          <a
            href="/mobile-electronic-signature"
            className="text-sm text-muted-foreground hover:underline"
          >
            Mobile Signature
          </a>
          <a
            href="/privacy-policy"
            className="text-sm text-muted-foreground hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
