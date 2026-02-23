import { api } from "@/convex/_generated/api";
import { convexClient } from "@/lib/convex";
import SigningPage from "./page.client";

// MIGRATED from: export const dynamic = 'force-dynamic'
// → Dynamic is now the default with Cache Components, so this export is no longer needed
// MIGRATED from: export const runtime = 'nodejs'
// → This export is no longer needed as 'nodejs' is the default runtime

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
    title: "Sign Contract - Fast Mobile Contract Signing for Solo Entrepreneurs",
    description:
      "Sign your contract quickly and securely. No account required, works perfectly on mobile devices. Complete signing in under 3 minutes. The fastest way for solo entrepreneurs and small agencies to get contracts signed — no client accounts, no friction.",
    keywords: [
      "contract signing",
      "electronic signature",
      "mobile signing",
      "esignature",
      "solo entrepreneur tools",
      "agency tools",
    ],
    openGraph: {
      title: "Sign Your Contract - Boopsign",
      description: "The fastest way for solo entrepreneurs and small agencies to get contracts signed — no client accounts, no friction.",
      url: `https://www.boopsign.com/s/${token}`,
      images: [
        {
          url: "https://www.boopsign.com/images/og-signing.jpg",
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

export default async function SignDocumentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Preload the signing session data server-side so the page loads instantly
  // This avoids the client-side waterfall
  const initialSigningSession = await convexClient.query(
    api.signers.getSigningSession,
    { accessToken: token }
  );

  return (
    <>
      {initialSigningSession?.fileUrl && (
        <link rel="preload" href={initialSigningSession.fileUrl} as="fetch" crossOrigin="anonymous" />
      )}
      <SigningPage initialSigningSession={initialSigningSession} />
    </>
  );
}
