"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function UserSync({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isClerkLoaded, isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const isCallbackPage = pathname === "/callback";

  const convexUser = useQuery(
    api.users.getCurrentUser,
    isClerkLoaded && isSignedIn && user?.id ? { clerkId: user.id } : "skip"
  );

  useEffect(() => {
    if (isClerkLoaded && isSignedIn && !isCallbackPage) {
      if (convexUser === null) {
        router.push("/callback");
      }
    }
  }, [isClerkLoaded, isSignedIn, isCallbackPage, convexUser, router]);

  // If we've confirmed the user is missing and are redirecting, don't show the page content
  if (isClerkLoaded && isSignedIn && !isCallbackPage && convexUser === null) {
    return null;
  }

  return <>{children}</>;
}
