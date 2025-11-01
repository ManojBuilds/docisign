
"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingDialog } from "@/components/OnboardingDialog";
import { Loader2 } from "lucide-react";

export default function CallbackPage() {
    const { user, isLoaded } = useUser();
    const ensureUser = useMutation(api.users.createUser);
    const router = useRouter();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [isCreatingUser, setIsCreatingUser] = useState(true);

    // Check if user has completed onboarding
    const hasCompletedOnboarding = useQuery(
        api.users.hasCompletedOnboarding,
        user ? { clerkId: user.id } : "skip"
    );

    useEffect(() => {
        if (user && isLoaded) {
            ensureUser({
                clerkId: user.id,
                email: user.emailAddresses?.[0].emailAddress,
                firstName: user.firstName || "",
                lastName: user.lastName || ""
            }).then(() => {
                setIsCreatingUser(false);
            });
        }
    }, [user, ensureUser, isLoaded]);

    // Once user is created, check if they need onboarding
    useEffect(() => {
        if (!isCreatingUser && hasCompletedOnboarding !== undefined) {
            if (hasCompletedOnboarding) {
                // User has already completed onboarding, redirect to dashboard
                router.push("/dashboard");
            } else {
                // Show onboarding for new users
                setShowOnboarding(true);
            }
        }
    }, [isCreatingUser, hasCompletedOnboarding, router]);

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
        router.push("/dashboard");
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <div className="text-2xl font-semibold">Setting up your account...</div>
                <div className="mt-4 text-muted-foreground">Please wait while we get things ready for you.</div>
            </div>

            {showOnboarding && (
                <OnboardingDialog
                    open={showOnboarding}
                    onComplete={handleOnboardingComplete}
                />
            )}
        </>
    );
}
