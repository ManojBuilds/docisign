import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import SigningCompletePage from "./page.client";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ token: string }> }) {
    const {token} = await searchParams;
    const signingSession = await convex.query(api.signers.getSigningSessionForMetadata, { accessToken: token });

    if (!signingSession) {
        return {
            title: "Invalid Signing Link",
            description: "The signing link you are using is invalid or has expired.",
        };
    }

    return ({
        title: "Document Signed Successfully",
        description: "You have successfully signed the document.",
    });
}

export default function SignDocumentCompletePage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <SigningCompletePage />
        </Suspense>
    );
}
