"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Sparkles, Briefcase, FileText, Users, Building2, ArrowRight, ArrowLeft, Check } from "lucide-react";

interface OnboardingDialogProps {
  open: boolean;
  onComplete: () => void;
}

interface OnboardingData {
  userRole?: string;
  primaryUseCase?: string;
  teamSize?: string;
  industry?: string;
}

const steps = [
  {
    id: 1,
    title: "Welcome to BoopSign! 🎉",
    description: "Let's get you set up in just a few quick steps.",
  },
  {
    id: 2,
    title: "What best describes you?",
    description: "Help us personalize your experience.",
  },
  {
    id: 3,
    title: "What will you primarily use BoopSign for?",
    description: "We'll tailor your workspace to match your workflow.",
  },
  {
    id: 4,
    title: "How large is your team?",
    description: "This helps us recommend the right features for you.",
  },
  {
    id: 5,
    title: "What industry are you in?",
    description: "We'll suggest templates that fit your needs.",
  },
];

export function OnboardingDialog({ open, onComplete }: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const completeOnboarding = useMutation(api.users.completeOnboarding);

  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      await completeOnboarding({
        clerkId: user.id,
        userRole: onboardingData.userRole,
        primaryUseCase: onboardingData.primaryUseCase,
        teamSize: onboardingData.teamSize,
        industry: onboardingData.industry,
      });
      toast.success("Welcome aboard! Your account is all set up.");
      onComplete();
    } catch (error) {
      console.error("Error completing onboarding:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateData = (field: keyof OnboardingData, value: string) => {
    setOnboardingData({ ...onboardingData, [field]: value });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return !!onboardingData.userRole;
      case 3:
        return !!onboardingData.primaryUseCase;
      case 4:
        return !!onboardingData.teamSize;
      case 5:
        return !!onboardingData.industry;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]" showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <DialogTitle className="text-2xl">{steps[currentStep - 1].title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {steps[currentStep - 1].description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="min-h-[280px]">
            {currentStep === 1 && (
              <div className="space-y-4 text-center py-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Your 7-day free trial starts now!</h3>
                  <p className="text-muted-foreground">
                    No credit card needed. You can send unlimited documents during your trial.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium">Simple & Fast</p>
                  </div>
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium">No Account for Signers</p>
                  </div>
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Check className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm font-medium">Legally Binding</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">I am a...</Label>
                <RadioGroup
                  value={onboardingData.userRole}
                  onValueChange={(value) => updateData("userRole", value)}
                  className="space-y-3"
                >
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("userRole", "freelancer")}
                  >
                    <RadioGroupItem value="freelancer" id="freelancer" />
                    <Label htmlFor="freelancer" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Freelancer</p>
                          <p className="text-sm text-muted-foreground">Working independently</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("userRole", "consultant")}
                  >
                    <RadioGroupItem value="consultant" id="consultant" />
                    <Label htmlFor="consultant" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Consultant</p>
                          <p className="text-sm text-muted-foreground">Providing expert advice</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("userRole", "small_business")}
                  >
                    <RadioGroupItem value="small_business" id="small_business" />
                    <Label htmlFor="small_business" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Small Business Owner</p>
                          <p className="text-sm text-muted-foreground">Running my own company</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("userRole", "other")}
                  >
                    <RadioGroupItem value="other" id="role_other" />
                    <Label htmlFor="role_other" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Other</p>
                          <p className="text-sm text-muted-foreground">Something else</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">I'll mainly use BoopSign for...</Label>
                <RadioGroup
                  value={onboardingData.primaryUseCase}
                  onValueChange={(value) => updateData("primaryUseCase", value)}
                  className="space-y-3"
                >
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("primaryUseCase", "contracts")}
                  >
                    <RadioGroupItem value="contracts" id="contracts" />
                    <Label htmlFor="contracts" className="flex-1 cursor-pointer">
                      <p className="font-medium">Client Contracts</p>
                      <p className="text-sm text-muted-foreground">Service agreements, work contracts</p>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("primaryUseCase", "ndas")}
                  >
                    <RadioGroupItem value="ndas" id="ndas" />
                    <Label htmlFor="ndas" className="flex-1 cursor-pointer">
                      <p className="font-medium">NDAs & Confidentiality</p>
                      <p className="text-sm text-muted-foreground">Non-disclosure agreements</p>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("primaryUseCase", "proposals")}
                  >
                    <RadioGroupItem value="proposals" id="proposals" />
                    <Label htmlFor="proposals" className="flex-1 cursor-pointer">
                      <p className="font-medium">Proposals & Quotes</p>
                      <p className="text-sm text-muted-foreground">Project proposals, price quotes</p>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("primaryUseCase", "invoices")}
                  >
                    <RadioGroupItem value="invoices" id="invoices" />
                    <Label htmlFor="invoices" className="flex-1 cursor-pointer">
                      <p className="font-medium">Invoices & Receipts</p>
                      <p className="text-sm text-muted-foreground">Payment documents</p>
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("primaryUseCase", "other")}
                  >
                    <RadioGroupItem value="other" id="usecase_other" />
                    <Label htmlFor="usecase_other" className="flex-1 cursor-pointer">
                      <p className="font-medium">Other Documents</p>
                      <p className="text-sm text-muted-foreground">Various document types</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">My team size is...</Label>
                <RadioGroup
                  value={onboardingData.teamSize}
                  onValueChange={(value) => updateData("teamSize", value)}
                  className="space-y-3"
                >
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("teamSize", "solo")}
                  >
                    <RadioGroupItem value="solo" id="solo" />
                    <Label htmlFor="solo" className="flex-1 cursor-pointer font-medium">
                      Just me (Solo)
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("teamSize", "2-5")}
                  >
                    <RadioGroupItem value="2-5" id="2-5" />
                    <Label htmlFor="2-5" className="flex-1 cursor-pointer font-medium">
                      2-5 people
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("teamSize", "6-10")}
                  >
                    <RadioGroupItem value="6-10" id="6-10" />
                    <Label htmlFor="6-10" className="flex-1 cursor-pointer font-medium">
                      6-10 people
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("teamSize", "11+")}
                  >
                    <RadioGroupItem value="11+" id="11+" />
                    <Label htmlFor="11+" className="flex-1 cursor-pointer font-medium">
                      11+ people
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <Label className="text-base font-medium">I work in...</Label>
                <RadioGroup
                  value={onboardingData.industry}
                  onValueChange={(value) => updateData("industry", value)}
                  className="space-y-3"
                >
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("industry", "tech")}
                  >
                    <RadioGroupItem value="tech" id="tech" />
                    <Label htmlFor="tech" className="flex-1 cursor-pointer font-medium">
                      Technology & Software
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("industry", "consulting")}
                  >
                    <RadioGroupItem value="consulting" id="consulting" />
                    <Label htmlFor="consulting" className="flex-1 cursor-pointer font-medium">
                      Consulting & Professional Services
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("industry", "real_estate")}
                  >
                    <RadioGroupItem value="real_estate" id="real_estate" />
                    <Label htmlFor="real_estate" className="flex-1 cursor-pointer font-medium">
                      Real Estate
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("industry", "legal")}
                  >
                    <RadioGroupItem value="legal" id="legal" />
                    <Label htmlFor="legal" className="flex-1 cursor-pointer font-medium">
                      Legal Services
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("industry", "creative")}
                  >
                    <RadioGroupItem value="creative" id="creative" />
                    <Label htmlFor="creative" className="flex-1 cursor-pointer font-medium">
                      Creative & Design
                    </Label>
                  </div>
                  <div
                    className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => updateData("industry", "other")}
                  >
                    <RadioGroupItem value="other" id="industry_other" />
                    <Label htmlFor="industry_other" className="flex-1 cursor-pointer font-medium">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
            >
              {currentStep === totalSteps ? (
                isSubmitting ? (
                  "Completing..."
                ) : (
                  <>
                    Complete Setup
                    <Check className="h-4 w-4 ml-2" />
                  </>
                )
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

