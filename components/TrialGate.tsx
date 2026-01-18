import { Button } from "@/components/ui/button";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { CreditCard, Lock } from "lucide-react";

interface TrialGateProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const TrialGate = ({ children, fallback }: TrialGateProps) => {
  const trialStatus = useTrialStatus();

  if (trialStatus.isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  // Allow access if trial is active or user is paid
  if (trialStatus.isTrialActive || trialStatus.isAuthenticated) {
    return <>{children}</>;
  }

  // Show fallback or default upgrade message
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Trial Expired
      </h2>
      <p className="text-gray-600 mb-6">
        Your 7-day free trial has ended. Upgrade to Boopsign Pro to continue
        creating and sending documents.
      </p>
      <Button onClick={() => (window.location.href = "/pricing")}>
        <CreditCard className="h-4 w-4 mr-2" />
        Upgrade to Pro - $20/month
      </Button>
    </div>
  );
};
