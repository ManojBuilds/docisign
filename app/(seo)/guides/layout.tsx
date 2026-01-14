import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "BoopSign Guides — E-Signature Tips for Freelancers",
    template: "%s | BoopSign Guides",
  },
  description: "Learn how to optimize your freelance workflow with BoopSign. Guides on contracts, NDAs, and getting paid faster.",
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="pt-20">
        {children}
      </div>
    </div>
  );
}
