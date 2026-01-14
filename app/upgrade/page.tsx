import { ClientHeaderWrapper } from "@/components/ClientHeaderWrapper";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";

export default function UpgradePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ClientHeaderWrapper />
      <main className="flex-1">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
