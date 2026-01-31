"use client";

import { UserSync } from "@/components/UserSync";
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
      appearance={{
        layout: {
          socialButtonsVariant: "blockButton",
          logoPlacement: "none",
        },
        variables: {
          colorPrimary: "#2563eb",
          colorTextOnPrimaryBackground: "white",
          borderRadius: "0.85rem",
        },
        elements: {
          header: "hidden", // Hide Clerk's header to avoid double logo/title
          card: "shadow-none border-none p-0 bg-transparent w-full",
          rootBox: "w-full",
          contentQueued: "w-full",
          socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm font-medium h-11",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 font-semibold h-11",
          footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
          formFieldInput: "rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all h-11 bg-slate-50/50",
          dividerLine: "bg-slate-100",
          dividerText: "text-slate-400 text-xs font-medium",
          formFieldLabel: "text-slate-700 font-medium mb-1.5",
          footer: "bg-transparent",
        }
      }}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <UserSync>{children}</UserSync>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

