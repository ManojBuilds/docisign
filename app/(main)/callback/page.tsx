
"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

export default function CallbackPage() {
    const { user, isLoaded } = useUser();
    const ensureUser = useMutation(api.users.createUser);
    const router = useRouter();

    useEffect(() => {
        if (user && isLoaded) {
            // Create or update user in database
            ensureUser({
                clerkId: user.id,
                email: user.emailAddresses?.[0].emailAddress,
                firstName: user.firstName || "",
                lastName: user.lastName || ""
            }).then(() => {
                // Skip onboarding and redirect directly to dashboard
                router.push("/dashboard");
            });
        }
    }, [user, ensureUser, isLoaded, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <div className="text-2xl font-semibold">Setting up your account...</div>
            <div className="mt-4 text-muted-foreground">Please wait while we get things ready for you.</div>
        </div>
    );
}
