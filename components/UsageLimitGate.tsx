import { Button } from "@/components/ui/button";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CreditCard, Lock } from "lucide-react";

interface UsageLimitGateProps {
  children: React.ReactNode;
  limitType: 'signatureRequests' | 'templates' | 'branding';
  fallback?: React.ReactNode;
  customMessage?: string;
}

export const UsageLimitGate = ({ children, limitType, fallback, customMessage }: UsageLimitGateProps) => {
  const { user } = useUser();
  const trialStatus = useTrialStatus();
  const usageStats = useQuery(api.users.getUsageStats, user ? { clerkId: user.id } : "skip");

  if (trialStatus.isLoading || !usageStats) {
    return <div className="animate-pulse">Loading...</div>;
  }

  // Allow access if user is paid
  if (trialStatus.isPaidUser) {
    return <>{children}</>;
  }

  // Check specific limits for trial users
  if (trialStatus.plan === "trial") {
    if (limitType === "signatureRequests" && usageStats.signatureRequests.used >= usageStats.signatureRequests.limit) {
      // Show fallback or default upgrade message
      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <div className="max-w-md mx-auto text-center py-12">
          <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Signature Request Limit Reached
          </h2>
          <p className="text-gray-600 mb-6">
            {customMessage || `You've reached your limit of ${usageStats.signatureRequests.limit} signature request during the trial. 
            Upgrade to continue sending documents.`}
          </p>
          <Button onClick={() => (window.location.href = "/pricing")}>
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      );
    }

    if (limitType === "templates" && usageStats.templates.used >= usageStats.templates.limit) {
      // Show fallback or default upgrade message
      if (fallback) {
        return <>{fallback}</>;
      }

      return (
        <div className="max-w-md mx-auto text-center py-12">
          <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Template Limit Reached
          </h2>
          <p className="text-gray-600 mb-6">
            {customMessage || `You've reached your limit of ${usageStats.templates.limit} saved template during the trial. 
            Upgrade to save more templates.`}
          </p>
          <Button onClick={() => (window.location.href = "/pricing")}>
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      );
    }

    if (limitType === "branding") {
      // Branding is now allowed for trial users
      return <>{children}</>;
    }
  }

  // Allow access for trial users who haven't reached limits and for paid users
  return <>{children}</>;
};