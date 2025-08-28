import { generatePageMetadata } from "@/lib/metadata";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import SigningPage from "./page.client";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
    const {token} = await params;
    const signingSession = await convex.query(api.signers.getSigningSessionForMetadata, { accessToken: token });

    if (!signingSession) {
        return {
            title: "Invalid Signing Link",
            description: "The signing link you are using is invalid or has expired.",
        };
    }

    return generatePageMetadata.signing(signingSession.documentTitle, signingSession.ownerName);
}

export default function SignDocumentPage() {
    return <SigningPage />;
}
