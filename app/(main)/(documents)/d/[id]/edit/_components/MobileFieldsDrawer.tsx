"use client";

import { Id } from "@/convex/_generated/dataModel";
import { lazy, memo, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";

const SignersSidebar = lazy(() =>
  import("@/components/SignersSidebar").then((m) => ({ default: m.SignersSidebar }))
);

interface MobileFieldsDrawerProps {
  documentId: Id<"documents">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Mobile drawer that shows Fields & Signers sidebar content (toolbar, field list, settings).
 */
export const MobileFieldsDrawer = memo(
  ({ documentId, open, onOpenChange }: MobileFieldsDrawerProps) => {
    return (
      <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
        <ResponsiveDialogContent className="max-h-[85vh] rounded-t-2xl border-t border-gray-200 bg-white">
          {/* Adobe Sign–style drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-gray-300" aria-hidden />
          </div>
          <ResponsiveDialogHeader className="border-b border-gray-100 px-4 py-3">
            <ResponsiveDialogTitle className="text-center font-semibold text-gray-900">Fields & signers</ResponsiveDialogTitle>
          </ResponsiveDialogHeader>
          <div className="overflow-auto flex-1 min-h-0 px-0">
            <Suspense
              fallback={
                <div className="p-4 space-y-4">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              }
            >
              <SignersSidebar documentId={documentId} />
            </Suspense>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    );
  }
);

MobileFieldsDrawer.displayName = "MobileFieldsDrawer";
