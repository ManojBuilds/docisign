import { Header } from "@/components/Header";
import { TrialBanner } from "@/components/TrialBanner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <TrialBanner />
      <Header classNames="container lg:max-w-6xl mx-auto" />
      <main className="flex min-h-screen flex-1 flex-col">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
