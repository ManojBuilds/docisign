
const Footer = () => {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Boopsign. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
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

