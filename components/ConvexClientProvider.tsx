"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider
      signInForceRedirectUrl={"/dashboard"}
      signUpForceRedirectUrl={"/callback"}
      appearance={{
        elements: {
          // card: {
          //   boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.25), inset 0 -1.5px 0 rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)',
          // },
          rootBox: {
            boxShadow: 'none',
          },
        }
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

