"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useAction } from "convex/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
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
  const createCheckout = useAction(api.payments.createCheckout);

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    setIsLoading(true);

    try {
      // Get the product ID from environment variable
      const productId = process.env.NEXT_PUBLIC_DODO_PRICE_ID_PRO;

      if (!productId) {
        toast.error("Product configuration missing. Please contact support.");
        setIsLoading(false);
        return;
      }

      const result = await createCheckout({
        productId,
        returnUrl: `${window.location.origin}/upgrade/success`,
      });

      if (result?.checkout_url) {
        window.location.href = result.checkout_url;
      } else {
        toast.error("Failed to create checkout session");
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
