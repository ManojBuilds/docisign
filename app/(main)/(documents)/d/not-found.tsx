import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocumentNotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">Document Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The document you&apos;re looking for doesn&apos;t exist or you don&apos;t
          have permission to view it.
        </p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
