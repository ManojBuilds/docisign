import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { memo } from "react";

/**
 * Mobile restriction screen - shown when user tries to access editor on mobile
 */
export const MobileRestrictionScreen = memo(() => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Desktop Recommended
        </h2>
        <p className="text-gray-600 mb-4">
          The document editor works best on a laptop or desktop for optimal
          experience. Please continue on a larger screen for the best editing
          experience.
        </p>
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "secondary" })}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
});

MobileRestrictionScreen.displayName = "MobileRestrictionScreen";
