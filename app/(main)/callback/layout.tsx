import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export default function CallbackLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <Header classNames="container lg:max-w-6xl mx-auto" />
            <main className="flex min-h-screen flex-1 flex-col">{children}</main>
            <Footer />
        </div>
    );
}
