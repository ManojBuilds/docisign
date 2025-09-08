
"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
    const { user, isLoaded } = useUser();
    const ensureUser = useMutation(api.users.createUser);
    const router = useRouter();

    useEffect(() => {
        if (user && isLoaded) {
            ensureUser({
                clerkId: user.id,
                email: user.emailAddresses?.[0].emailAddress,
                firstName: user.firstName || "",
                lastName: user.lastName || ""
            }).then(() => {
                router.push("/dashboard");
            });
        }
    }, [user, ensureUser, router, isLoaded]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-2xl font-semibold">Setting up your account...</div>
            <div className="mt-4">Please wait while we get things ready for you.</div>
        </div>
    );
}
