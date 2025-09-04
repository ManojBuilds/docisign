import { useTrialStatus } from "@/hooks/useTrialStatus";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard } from "lucide-react";

export const TrialBanner = () => {
  const trialStatus = useTrialStatus();

  if (trialStatus.isLoading || trialStatus.isPaidUser) {
    return null;
  }

  const handleUpgrade = () => {
    // Navigate to upgrade page
    window.location.href = "/upgrade";
  };

  if (trialStatus.trialEnded) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-red-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Your trial has expired
              </p>
              <p className="text-sm text-red-700">
                Upgrade to continue using Boopsign
              </p>
            </div>
          </div>
          <Button onClick={handleUpgrade} className="bg-red-600 hover:bg-red-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade Now
          </Button>
        </div>
      </div>
    );
  }

  if (trialStatus.isTrialActive) {
    const isLastDay = trialStatus?.daysRemaining as number <= 1;
    const bgColor = isLastDay ? "bg-orange-50 border-orange-400" : "bg-blue-50 border-blue-400";
    const textColor = isLastDay ? "text-orange-800" : "text-blue-800";
    const iconColor = isLastDay ? "text-orange-400" : "text-blue-400";

    return (
      <div className={`${bgColor} border-l-4 p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className={`h-5 w-5 ${iconColor} mr-2`} />
            <div>
              <p className={`text-sm font-medium ${textColor}`}>
                {trialStatus.daysRemaining as number > 1 
                  ? `${trialStatus.daysRemaining} days left in trial`
                  : `${trialStatus.hoursRemaining} hours left in trial`}
              </p>
              <p className={`text-sm ${textColor.replace('800', '700')}`}>
                Upgrade to Boopsign Pro for unlimited documents
              </p>
            </div>
          </div>
          <Button onClick={handleUpgrade} variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Upgrade - $12/month
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
