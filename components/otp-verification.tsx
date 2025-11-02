"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface OtpVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  purpose?: "signer_verification" | "email_verification";
  onSendOtp: () => void;
  hasOtpSent: boolean;
}

export default function OtpVerification({
  email,
  onVerificationSuccess,
  purpose = "signer_verification",
  onSendOtp,
  hasOtpSent,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(false);

  const generateOtp = useMutation(api.otp.generateOTP);

  // Handle countdown for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && hasOtpSent) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, hasOtpSent]);

  const verifyOtp = useMutation(api.otp.verifyOTP);

  const verifyOtpCode = async () => {
    if (otp.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyOtp({
        email,
        otp,
        purpose,
      });

      if (result.success) {
        toast.success("Verification successful!");
        onVerificationSuccess();
      } else {
        toast.error(result.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred during verification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setIsSending(true);
    try {
      await generateOtp({
        email,
        purpose,
      });
      toast.success("OTP sent to your email!");
      setCountdown(30);
      setResendDisabled(true);
      onSendOtp();
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const resendOtp = async () => {
    setIsSending(true);
    try {
      await generateOtp({
        email,
        purpose,
      });
      toast.success("New OTP sent to your email!");
      setCountdown(30);
      setResendDisabled(true);
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl font-semibold">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to <span className="font-medium">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasOtpSent ? (
          <div className="py-6">
            <p className="text-center mb-6">Click the button below to send OTP to your email</p>
            <Button
              className="w-full py-5 text-base font-medium"
              onClick={handleSendOtp}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP to Email"
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="py-4">
              <div className="flex justify-center mb-6">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <InputOTPGroup className="gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-16 text-xl border-2 rounded-lg transition-all duration-200 focus:z-10 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                className="w-full py-5 text-base font-medium"
                onClick={verifyOtpCode}
                disabled={isLoading || otp.length < 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </Button>
            </div>
            <CardFooter className="flex-col">
              <p className="text-center text-sm text-muted-foreground">
                Didn't receive the code?
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary ml-1"
                  onClick={resendOtp}
                  disabled={resendDisabled || isSending}
                >
                  {isSending ? "Sending..." : resendDisabled ? `Resend in ${countdown}s` : "Resend code"}
                </Button>
              </p>
            </CardFooter>
          </>
        )}
      </CardContent>
    </Card>
  );
}