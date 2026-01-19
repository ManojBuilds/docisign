// components/PlanBadge.tsx
import { Badge } from "@/components/ui/badge";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { Clock, Gem } from "lucide-react";

interface PlanBadgeProps {
    showDetails?: boolean;
    size?: "sm" | "default" | "lg";
}

export const PlanBadge = ({ showDetails = false }: PlanBadgeProps) => {
    const trialStatus = useTrialStatus();

    if (trialStatus.isLoading) {
        return <Badge variant="secondary">Loading...</Badge>;
    }

    if (trialStatus.isPaidUser) {
        return (
            <Badge variant="secondary" className="bg-primary/10 text-primary border border-primary/20">
                <Gem className="h-3 w-3 mr-1" />
                Pro
                {showDetails && (
                    <span className="ml-1 opacity-80 font-normal">Active</span>
                )}
            </Badge>
        );
    }

    if (trialStatus.isTrialActive) {
        return (
            <Badge variant="outline" className="border-orange-200 text-orange-600 bg-orange-50">
                <Clock className="h-3 w-3 mr-1" />
                Free Trial
                {showDetails && (
                    <span className="ml-1 font-normal text-muted-foreground">
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
