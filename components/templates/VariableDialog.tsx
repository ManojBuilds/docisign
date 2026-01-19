"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency, formatDate } from "@/lib/format";
import { allTemplates } from "content-collections";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface TemplateVariable {
  key: string;
  label: string;
  required: boolean;
  type?: "text" | "email" | "number" | "currency" | "date" | "textarea";
  placeholder?: string;
  defaultValue?: string;
}

interface VariableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  onSubmit: (variables: Record<string, string>) => void;
  isProcessing?: boolean;
  statusMessage?: string;
}

export function VariableDialog({
  open,
  onOpenChange,
  templateId,
  onSubmit,
  isProcessing = false,
  statusMessage = "",
}: VariableDialogProps) {
  const template = allTemplates.find((t) => t.slug === templateId);
  const variables = (template?.variables || []) as any[] as TemplateVariable[];
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!template) {
    return null;
  }

  const handleInputChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    variables.forEach((variable) => {
      if (variable.required && !values[variable.key]?.trim()) {
        newErrors[variable.key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fillDemoData = () => {
    const demoData: Record<string, string> = {};
    template.variables?.forEach((variable) => {
      // Priority: defaultValue > placeholder (cleaned) > type-based default
      let value = variable.defaultValue || "";

      if (!value && variable.placeholder) {
        // Clean placeholder: remove "e.g., " and take only the first option if multiple are listed
        value = variable.placeholder
          .replace(/^e\.g\.,\s*/i, "")
          .split(/ or |\/|,/)[0]
          .trim();
      }

      if (!value) {
        if (variable.type === "date") {
          value = new Date().toISOString().split("T")[0];
        } else if (variable.type === "email") {
          value = "john@example.com";
        } else if (variable.type === "currency") {
          value = "1500";
        } else if (variable.type === "number") {
          value = "5";
        } else {
          value = "Sample Text";
        }
      }

      demoData[variable.key] = value;
    });

    setValues(demoData);
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Format values before submitting
    const formattedValues: Record<string, string> = {};
    variables.forEach((variable) => {
      const value = values[variable.key] || "";
      if (variable.type === "currency" && value) {
        formattedValues[variable.key] = formatCurrency(value);
      } else if (variable.type === "date" && value) {
        formattedValues[variable.key] = formatDate(value);
      } else {
        formattedValues[variable.key] = value;
      }
    });

    onSubmit(formattedValues);
  };

  const renderField = (variable: TemplateVariable) => {
    const value = values[variable.key] || "";
    const error = errors[variable.key];

    if (variable.type === "textarea") {
      return (
        <div key={variable.key} className="space-y-2">
          <Label htmlFor={variable.key}>
            {variable.label}
            {variable.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Textarea
            id={variable.key}
            placeholder={variable.placeholder}
            value={value}
            onChange={(e) => handleInputChange(variable.key, e.target.value)}
            className={error ? "border-red-500" : ""}
            rows={3}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      );
    }

    return (
      <div key={variable.key} className="space-y-2">
        <Label htmlFor={variable.key}>
          {variable.label}
          {variable.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Input
          id={variable.key}
          type={variable.type === "email" ? "email" : variable.type === "date" ? "date" : variable.type === "number" ? "number" : "text"}
          placeholder={variable.placeholder}
          value={value}
          onChange={(e) => handleInputChange(variable.key, e.target.value)}
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Contract</DialogTitle>
          <DialogDescription>
            Fill in the details below. You can review the contract before adding signature fields.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {variables.map((variable) => renderField(variable))}
        </div>

        <div className="flex gap-3 justify-between items-center border-t pt-4">
          <div className="flex gap-3 flex-1 justify-end">
            <Button onClick={fillDemoData}>Fill for Demo</Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="min-w-[150px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {statusMessage || "Processing..."}
                </>
              ) : (
                "Continue to Sign"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
