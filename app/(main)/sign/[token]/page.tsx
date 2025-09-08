import { api } from "@/convex/_generated/api";
import SigningPage from "./page.client";
import { convexClient } from "@/lib/convex";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const signingSession = await convexClient.query(
    api.signers.getSigningSessionForMetadata,
    { accessToken: token },
  );

  if (!signingSession) {
    return {
      title: "Invalid Signing Link",
      description: "The signing link you are using is invalid or has expired.",
    };
  }
  return {
    title: "Sign Document - Fast Mobile Signing",
    description:
      "Sign your document quickly and securely. No account required, works perfectly on mobile devices. Complete signing in under 3 minutes.",
    keywords: [
      "document signing",
      "electronic signature",
      "mobile signing",
      "esignature",
    ],
    openGraph: {
      title: "Sign Your Document - BoopSign",
      description: "Quick and secure document signing. No account required.",
      url: `https://boopsign.com/sign/${token}`,
      images: [
        {
          url: "https://boopsign.com/images/og-signing.jpg",
          width: 1200,
          height: 630,
          alt: "BoopSign Document Signing",
        },
      ],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function SignDocumentPage() {
  return <SigningPage />;
}
