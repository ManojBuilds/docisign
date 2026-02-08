import { Header } from "@/components/Header";
import { TrialBanner } from "@/components/TrialBanner";


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <TrialBanner />
      <Header classNames="container lg:max-w-6xl mx-auto" />
      <main className="flex-1 bg-background/50">
        <div className="container lg:max-w-6xl mx-auto py-10 px-4">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
