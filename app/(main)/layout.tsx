import { PdfDimensionsProvider } from "@/components/PdfDimensionsContext";
import { Style_Script } from "next/font/google";

const styleScript = Style_Script({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-style-script",
    display: "swap",
});

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <PdfDimensionsProvider>
            <div className={styleScript.variable}>{children}</div>
        </PdfDimensionsProvider>
    );
}
