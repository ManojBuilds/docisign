import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { lazy, memo, Suspense } from "react";

const SignersSidebar = lazy(() =>
  import("@/components/SignersSidebar").then((m) => ({
    default: m.SignersSidebar,
  }))
);

interface SignersSidebarWrapperProps {
  documentId: Id<"documents">;
}

/**
 * Wrapper for SignersSidebar with loading state
 */
export const SignersSidebarWrapper = memo(
  ({ documentId }: SignersSidebarWrapperProps) => {
    return (
      <Suspense
        fallback={
          <aside className="w-[300px] bg-white border-l p-6 h-full flex flex-col space-y-6">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </aside>
        }
      >
        <SignersSidebar documentId={documentId} />
      </Suspense>
    );
  }
);

SignersSidebarWrapper.displayName = "SignersSidebarWrapper";
