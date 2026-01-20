import { api } from "@/convex/_generated/api";
import { convexClient } from "@/lib/convex";
import SigningPage from "./page.client";

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

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
    title: "Sign Contract - Fast Mobile Contract Signing for Freelancers",
    description:
      "Sign your contract quickly and securely. No account required, works perfectly on mobile devices. Complete signing in under 3 minutes. The fastest way for freelancers and small agencies to get contracts signed — no client accounts, no friction.",
    keywords: [
      "contract signing",
      "electronic signature",
      "mobile signing",
      "esignature",
      "freelancer tools",
      "agency tools",
    ],
    openGraph: {
      title: "Sign Your Contract - Boopsign",
      description: "The fastest way for freelancers and small agencies to get contracts signed — no client accounts, no friction.",
      url: `https://Boopsign.com/s/${token}`,
      images: [
        {
          url: "https://Boopsign.com/images/og-signing.jpg",
          width: 1200,
          height: 630,
          alt: "Boopsign Contract Signing",
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
