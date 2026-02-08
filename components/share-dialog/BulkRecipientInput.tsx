"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Crown, Loader2, UserPlus, X } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Signer } from "./types";
import Link from "next/link";

interface BulkRecipientInputProps {
  onAddSigners: (signers: Signer[]) => void;
  existingSigners: Signer[];
  maxRecipients: number;
  isProfessionalPlan: boolean;
  isLoading?: boolean;
}

export const BulkRecipientInput = ({
  onAddSigners,
  existingSigners,
  maxRecipients,
  isProfessionalPlan,
  isLoading = false,
}: BulkRecipientInputProps) => {
  const [bulkInput, setBulkInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const parseEmails = useCallback((input: string): string[] => {
    // Parse emails from comma-separated, newline-separated, or space-separated input
    const emails = input
      .split(/[,\n\s]+/)
      .map((email) => email.trim().toLowerCase())
      .filter((email) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email && emailRegex.test(email);
      });

    // Remove duplicates
    return [...new Set(emails)];
  }, []);

  const handleBulkAdd = useCallback(() => {
    setIsProcessing(true);

    try {
      const emails = parseEmails(bulkInput);

      if (emails.length === 0) {
        toast.error("No valid email addresses found");
        setIsProcessing(false);
        return;
      }

      // Filter out existing signers
      const existingEmails = new Set(existingSigners.map((s) => s.email.toLowerCase()));
      const newEmails = emails.filter((email) => !existingEmails.has(email));

      if (newEmails.length === 0) {
        toast.info("All recipients are already added");
        setBulkInput("");
        setIsProcessing(false);
        return;
      }

      // Check limit
      const totalAfterAdd = existingSigners.length + newEmails.length;
      if (totalAfterAdd > maxRecipients) {
        const canAdd = maxRecipients - existingSigners.length;
        if (canAdd <= 0) {
          toast.error(
            `You've reached the maximum of ${maxRecipients} recipients. ${!isProfessionalPlan ? "Upgrade to Professional for bulk sending." : ""}`
          );
          setIsProcessing(false);
          return;
        }
        toast.warning(
          `Only adding ${canAdd} of ${newEmails.length} recipients due to plan limit (${maxRecipients} max)`
        );
        newEmails.splice(canAdd);
      }

      // Create signers
      const newSigners: Signer[] = newEmails.map((email) => ({
        email,
        name: email.split("@")[0], // Use email prefix as name
      }));

      onAddSigners(newSigners);
      setBulkInput("");
      toast.success(`Added ${newSigners.length} recipient${newSigners.length > 1 ? "s" : ""}`);
    } finally {
      setIsProcessing(false);
    }
  }, [bulkInput, existingSigners, maxRecipients, isProfessionalPlan, parseEmails, onAddSigners]);

  const parsedCount = parseEmails(bulkInput).length;
  const remainingSlots = Math.max(0, maxRecipients - existingSigners.length);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-zinc-700 uppercase tracking-wider flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-zinc-400" />
          Add Recipients
        </Label>
        {isProfessionalPlan && (
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] font-bold">
            <Crown className="w-3 h-3 mr-1" />
            Bulk Send Enabled
          </Badge>
        )}
      </div>

      <div className="relative">
        <Textarea
          className="min-h-[100px] resize-none text-sm"
          value={bulkInput}
          onChange={(e) => setBulkInput(e.target.value)}
          placeholder={isProfessionalPlan
            ? "Enter up to 5 email addresses, separated by commas or new lines...\n\nexample1@email.com, example2@email.com"
            : "Enter recipient email address..."}
          disabled={isLoading || isProcessing}
        />
        {bulkInput && (
          <button
            onClick={() => setBulkInput("")}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          {parsedCount > 0 && (
            <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 font-medium">
              {parsedCount} email{parsedCount > 1 ? "s" : ""} detected
            </Badge>
          )}
          <span className="text-zinc-400">
            {remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} remaining
          </span>
        </div>

        <Button
          onClick={handleBulkAdd}
          disabled={!bulkInput.trim() || isLoading || isProcessing || remainingSlots === 0}
          size="sm"
          className="font-semibold"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Add{parsedCount > 1 ? ` ${parsedCount}` : ""}
            </>
          )}
        </Button>
      </div>

      {!isProfessionalPlan && existingSigners.length >= 1 && (
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
          <p className="text-xs text-amber-700 font-medium">
            <Crown className="w-3 h-3 inline mr-1" />
            Upgrade to Professional for bulk sending up to 5 recipients at once.{" "}
            <Link href="/#pricing" className="underline font-bold">
              View plans →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};
