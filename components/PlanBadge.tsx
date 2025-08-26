// components/PlanBadge.tsx
import { Badge } from "@/components/ui/badge";
import { Crown, Clock } from "lucide-react";
import { useTrialStatus } from "@/hooks/useTrialStatus";

interface PlanBadgeProps {
    showDetails?: boolean;
    size?: "sm" | "default" | "lg";
}

export const PlanBadge = ({ showDetails = false, size = "default" }: PlanBadgeProps) => {
    const trialStatus = useTrialStatus();

    if (trialStatus.isLoading) {
        return <Badge variant="secondary">Loading...</Badge>;
    }

    if (trialStatus.isPaidUser) {
        return (
            <Badge variant="default">
                <Crown className="h-3 w-3 mr-1" />
                Pro Plan
                {showDetails && (
                    <span className="ml-1 text-xs opacity-80">• {" "} Active</span>
                )}
            </Badge>
        );
    }

    if (trialStatus.isTrialActive) {
        return (
            <Badge variant="outline" className="border-orange-300 text-orange-700">
                <Clock className="h-3 w-3 mr-1" />
                Trial
                {showDetails && (
                    <span className="ml-1 text-xs">
                        • {trialStatus.daysRemaining} days left
                    </span>
                )}
            </Badge>
        );
    }

    if (trialStatus.trialEnded) {
        return (
            <Badge variant="destructive">
                Trial Expired
            </Badge>
        );
    }

    return (
        <Badge variant="secondary">
            Free
        </Badge>
    );
};
