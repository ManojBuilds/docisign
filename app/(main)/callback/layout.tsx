import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export default function CallbackLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex min-h-screen flex-1 flex-col">{children}</main>
            <Footer />
        </div>
    );
}