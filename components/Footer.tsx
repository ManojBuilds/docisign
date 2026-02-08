import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import CurrentYear from "./CurrentYear";
import { JSX } from "react";

// Define footer sections interface for scalability
interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    icon?: JSX.Element;
  }[];
}

const Footer = () => {
  // Organize only the most necessary and helpful links by user-focused categories
  const footerSections: FooterSection[] = [
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Free Contracts", href: "/contracts" },
        { label: "What is an eSignature?", href: "/landing/what-is-electronic-signature" },
        { label: "Are eSignatures legal?", href: "/landing/electronic-signature-legality" },
        { label: "Online signature maker", href: "/online-signature-maker" },
        { label: "Electronic Signature", href: "/landing/electronic-signature" },
        { label: "No Account Required", href: "/landing/no-account-esignature" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "For Freelancers", href: "/landing/esignature-for-freelancers" },
        { label: "For Consultants", href: "/landing/esignature-for-consultants" },
        { label: "HR Documents", href: "/landing/hr-document-signing" },
        { label: "Real Estate", href: "/landing/real-estate-document-signing" },
      ],
    },
    {
      title: "Comparisons",
      links: [
        { label: "DocuSign Alternative", href: "/alternatives/docusign-alternative" },
        { label: "HelloSign Alternative", href: "/alternatives/hellosign-alternative" },
        { label: "Adobe Sign Alternative", href: "/alternatives/adobe-sign-alternative" },
        { label: "PandaDoc Alternative", href: "/alternatives/pandadoc-alternative" },
      ],
    },
  ];

  return (
    <footer className="border-t py-10 w-full bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Info Column */}
          <div className="lg:col-span-1">
            <div className="flex flex-col h-full">
              <Logo showStatus={false} />
              <p className="text-sm text-muted-foreground mt-3">
                The simplest e-signature solution for modern businesses.
              </p>

              <div className="flex items-center mt-4 text-sm text-muted-foreground">
                <ShieldCheckIcon size={18} className="text-primary mr-2" />
                <span>Secure & legally binding</span>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  &copy; <CurrentYear /> Boopsign. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Join thousands of professionals saving time and money with Boopsign
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center">
              <ShieldCheckIcon size={12} className="mr-1 text-primary" />
              ESIGN Act Compliant
            </span>
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
