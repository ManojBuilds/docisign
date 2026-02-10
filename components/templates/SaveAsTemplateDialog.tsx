"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { LayoutTemplate, Loader2, Save, CreditCard, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SignatureFieldData } from "@/components/signature-field";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/responsive-dialog";

interface SaveAsTemplateDialogProps {
  documentId: Id<"documents">;
  signatureFields?: SignatureFieldData[];
  onSave?: () => Promise<void>;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function SaveAsTemplateDialog({
  documentId,
  signatureFields = [],
  onSave,
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: SaveAsTemplateDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Controlled vs Uncontrolled state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = setControlledOpen || setInternalOpen;
  const { user } = useUser();
  const usageStats = useQuery(
    api.users.getUsageStats,
    user?.id ? { clerkId: user.id } : "skip",
  );

  const isLimitReached =
    usageStats?.plan === "trial" &&
    usageStats.templates.used >= usageStats.templates.limit;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const createTemplate = useAction(api.templates.createTemplateFromDocument);

  // Extract unique emails that need role mapping
  const signers = useMemo(
    () =>
      Array.from(
        new Set(
          signatureFields
            .map((f) => f.signerEmail)
            .filter((email): email is string => !!email && email.trim() !== ""),
        ),
      ),
    [signatureFields],
  );

  const [templateTitle, setTemplateTitle] = useState("My Template");
  const [roleMappings, setRoleMappings] = useState<Record<string, string>>({});

  // Keep roleMappings in sync with signers and pre-fill from fields if possible
  useEffect(() => {
    setRoleMappings((prev) => {
      const next = { ...prev };
      let updated = false;

      signers.forEach((email) => {
        // If this email doesn't have a mapping yet, OR it has one but it's empty
        if (!(email in next) || !next[email]) {
          // Find a sensible default for this email from existing fields
          const fieldWithData = signatureFields.find(
            (f) => f.signerEmail === email && (f.rolePlaceholder || f.label)
          );

          const defaultValue = fieldWithData?.rolePlaceholder || fieldWithData?.label || "";

          if (!(email in next) || (defaultValue && !next[email])) {
            next[email] = defaultValue;
            updated = true;
          }
        }
      });
      return updated ? next : prev;
    });
  }, [signers, signatureFields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, save any unsaved changes to the document
      if (onSave) {
        await onSave();
      }

      // Validate that all roles are filled
      if (Object.values(roleMappings).some((role) => !role?.trim())) {
        toast.error("Please assign a Role Name to all signers.");
        setIsSubmitting(false);
        return;
      }

      if (!templateTitle.trim()) {
        toast.error("Please provide a template title.");
        setIsSubmitting(false);
        return;
      }

      const mappings = Object.entries(roleMappings).map(([email, role]) => ({
        email,
        role,
      }));

      await createTemplate({
        documentId,
        title: templateTitle,
        roleMappings: mappings,
      });

      toast.success("Saved as Template!");
      setOpen(false);
      router.push("/templates");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Failed to save as template.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TemplateFormContent = (
    <div className="space-y-4">
      {isLimitReached && (
        <Alert className="bg-amber-50 border-amber-200 mb-4">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800 font-semibold">
            Template Limit Reached
          </AlertTitle>
          <AlertDescription className="text-amber-700 text-xs mt-1">
            Trial users are limited to 1 saved template. Upgrade to save
            unlimited templates.
          </AlertDescription>
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto text-amber-900 font-bold mt-2"
            onClick={() => (window.location.href = "/pricing")}
          >
            View Pricing & Upgrade &rarr;
          </Button>
        </Alert>
      )}

      {/* Template Title Section */}
      <div className="space-y-3.5">
        <Label
          htmlFor="template-title"
          className="text-[11px] font-bold text-slate-500 uppercase tracking-widest"
        >
          Template Name
        </Label>
        <Input
          id="template-title"
          value={templateTitle}
          onChange={(e) => setTemplateTitle(e.target.value)}
          placeholder="e.g. Standard Service Agreement"
        />
        <p className="text-[11px] text-slate-400 font-medium">
          Give your template a clear, recognizable name for future use.
        </p>
      </div>

      {/* Role Mapping Section */}
      <div className="space-y-5 pb-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Map Signers to Roles
          </h4>
          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
            {signers.length} {signers.length === 1 ? "Signer" : "Signers"}
          </span>
        </div>

        <div className="space-y-4">
          {signers.length > 0 ? (
            signers.map((email) => (
              <div
                key={email}
                className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/60 space-y-4 hover:border-primary/20 hover:bg-white transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                    @
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                      Assigned Email
                    </p>
                    <p
                      className="text-sm font-semibold text-slate-700 truncate"
                      title={email}
                    >
                      {email}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor={`role-${email}`}
                    className="text-[10px] font-bold text-slate-500 uppercase tracking-wider"
                  >
                    Generic Role Name
                  </Label>
                  <Input
                    id={`role-${email}`}
                    placeholder="e.g. Client, Tenant, Employee"
                    value={roleMappings[email] || ""}
                    onChange={(e) =>
                      setRoleMappings((prev) => ({
                        ...prev,
                        [email]: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                <LayoutTemplate className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-amber-900 text-sm">
                  No signers detected
                </p>
                <p className="text-[11px] text-amber-800/70 leading-relaxed font-medium">
                  Add some fields and assign them to signers first.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const triggerContent = children || (
    <Button variant="secondary" size="sm" className="gap-2 font-bold text-xs uppercase tracking-widest">
      <LayoutTemplate className="w-4 h-4" />
      Save as Template
    </Button>
  );

  const footerContent = (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpen(false)}
        disabled={isSubmitting}
        className="w-full sm:w-auto text-xs uppercase tracking-widest"
      >
        Cancel
      </Button>
      <Button
        type={isLimitReached ? "button" : "submit"}
        onClick={
          isLimitReached ? () => (window.location.href = "/pricing") : undefined
        }
        disabled={isSubmitting}
        className="w-full sm:flex-1 font-bold text-xs uppercase tracking-widest"
      >
        {isSubmitting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isLimitReached ? (
          <CreditCard className="w-4 h-4 mr-2" />
        ) : <Save className="w-4 h-4 mr-2" />}
        {isSubmitting ? "Saving..." : isLimitReached ? "Upgrade to Save" : "Save Template"}
      </Button>
    </div>
  );

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <ResponsiveDialogTrigger asChild>{triggerContent}</ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Save as Template</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Turn this document into a reusable template.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <ScrollArea className="flex-1 max-h-[60vh]">
            {TemplateFormContent}
          </ScrollArea>

          <ResponsiveDialogFooter className="pt-2 border-t border-slate-50">
            {footerContent}
          </ResponsiveDialogFooter>
        </form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
