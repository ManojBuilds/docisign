"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-semibold">Something went wrong!</h1>
        <p className="text-muted-foreground mb-8">
          There was an error loading this document. Please try again later.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>Try again</Button>
          <Button variant="secondary" asChild>
            <Link href="/Dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
