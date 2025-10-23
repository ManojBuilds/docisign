import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { TrialBanner } from "@/components/TrialBanner";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Suspense fallback={null}>
        <TrialBanner />
      </Suspense>
      <Header />
      <main className="flex min-h-screen flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
