"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function UpgradeSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Verify the payment and update user status
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            setIsVerifying(false);
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      }
      setIsVerifying(false);
    };

    verifyPayment();
  }, [sessionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex items-center justify-center pt-24 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-md mx-auto shadow-none border-none">
          <CardHeader className="text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Welcome to Docisign Pro!
            </CardTitle>
            <CardDescription>
              Your subscription is now active. You have access to all Pro features.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-left space-y-2">
              <h3 className="font-semibold">What&apos;s included:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Unlimited documents</li>
                <li>✅ All file types supported</li>
                <li>✅ Priority support</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>

              <p className="text-xs text-muted-foreground">
                A receipt has been sent to your email address.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
