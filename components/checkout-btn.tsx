"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

const CheckoutButton = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        toast.error(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Upgrade error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="lg"
      className={className}
      disabled={isLoading}
      onClick={handleUpgrade}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CheckoutButton;
