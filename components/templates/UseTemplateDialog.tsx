"use client";

import { Button } from "@/components/ui/button";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/responsive-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";
import {
  Loader2,
  Mail,
  UserPlus,
  Users,
  Sparkles,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BulkRecipientInput } from "@/components/share-dialog/BulkRecipientInput";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { Signer } from "@/components/share-dialog/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { TrialGate } from "../TrialGate";


interface UseTemplateDialogProps {
  template: Doc<"documents">;
  trigger?: React.ReactNode;
}

type SignerMapping = {
  email: string;
  name: string;
};

type SendMode = "individual" | "bulk";

export function UseTemplateDialog({
  template,
  trigger,
}: UseTemplateDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const instantiateTemplate = useAction(api.templates.instantiateTemplate);
  const bulkInstantiateAndSendTemplate = useAction(
    api.templates.bulkInstantiateAndSendTemplate,
  );

  const [documentTitle, setDocumentTitle] = useState(
    `${template.title} - Copied`,
  );

  // Default roles if none specified
  const roles = useMemo(
    () => template.templateRoles || ["Signer 1"],
    [template.templateRoles],
  );

  const [signerMappings, setSignerMappings] = useState<
    Record<string, SignerMapping>
  >(() =>
    roles.reduce(
      (acc, role) => ({ ...acc, [role]: { email: "", name: "" } }),
      {},
    ),
  );

  const [sendMode, setSendMode] = useState<SendMode>("individual");
  const [bulkRecipients, setBulkRecipients] = useState<Signer[]>([]);
  const [primaryRole, setPrimaryRole] = useState(roles[0]);
  const [customMessage, setCustomMessage] = useState("");
  const { plan, isPaidUser } = useTrialStatus();

  const isProfessionalPlan = useMemo(
    () => plan === "professional" || (isPaidUser && plan !== "starter"),
    [plan, isPaidUser],
  );

  const maxBulkRecipients = isProfessionalPlan ? 5 : 1;
  const canUseBulkSend = isProfessionalPlan;

  const handleRemoveBulkRecipient = useCallback((email: string) => {
    setBulkRecipients((prev) => prev.filter((s) => s.email !== email));
  }, []);

  const handleInputChange = useCallback(
    (role: string, field: keyof SignerMapping, value: string) => {
      setSignerMappings((prev) => ({
        ...prev,
        [role]: { ...prev[role], [field]: value },
      }));
    },
    [],
  );

  const handleSendModeChange = useCallback((value: string) => {
    setSendMode(value as SendMode);
  }, []);

  const validateIndividualMode = useCallback(() => {
    const missingRole = roles.find(
      (role) => !signerMappings[role]?.email || !signerMappings[role]?.name,
    );

    if (missingRole) {
      toast.error(
        `Please provide both email and name for the ${missingRole} role.`,
      );
      return false;
    }
    return true;
  }, [roles, signerMappings]);

  const validateBulkMode = useCallback(() => {
    if (bulkRecipients.length === 0) {
      toast.error("Please add at least one recipient for bulk sending.");
      return false;
    }

    // Collect static mappings (everyone except the primary bulk role)
    const staticRoles = roles.filter((role) => role !== primaryRole);
    const missingStaticRole = staticRoles.find(
      (role) => !signerMappings[role]?.email || !signerMappings[role]?.name,
    );

    if (missingStaticRole) {
      toast.error(
        `Please provide both email and name for the ${missingStaticRole} role.`,
      );
      return false;
    }

    return true;
  }, [bulkRecipients.length, roles, primaryRole, signerMappings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (sendMode === "bulk") {
        if (!validateBulkMode()) {
          setIsSubmitting(false);
          return;
        }

        // Collect static mappings (everyone except the primary bulk role)
        const staticMappings = Object.entries(signerMappings)
          .filter(([role]) => role !== primaryRole)
          .map(([role, { email, name }]) => ({
            role,
            email,
            name,
          }));

        await bulkInstantiateAndSendTemplate({
          templateId: template._id,
          recipients: bulkRecipients,
          customMessage,
          ownerId: template.ownerId,
          primaryRole,
          staticSignerMappings: staticMappings,
          title: documentTitle,
        });

        toast.success(
          `Successfully sent to ${bulkRecipients.length} recipient${bulkRecipients.length > 1 ? "s" : ""}!`,
          {
            description: `This used ${bulkRecipients.length} signature request${bulkRecipients.length > 1 ? "s" : ""}.`,
          },
        );
        setOpen(false);
        router.push("/dashboard");
      } else {
        if (!validateIndividualMode()) {
          setIsSubmitting(false);
          return;
        }

        const mappings = Object.entries(signerMappings).map(
          ([role, { email, name }]) => ({
            role,
            email,
            name,
          }),
        );

        const documentId = await instantiateTemplate({
          templateId: template._id,
          title: documentTitle,
          ownerId: template.ownerId,
          signerMappings: mappings,
        });

        toast.success("Document created from template!");
        setOpen(false);
        router.push(`/d/${documentId}/edit`);
      }
    } catch (error: any) {
      console.error("Template instantiation error:", error);
      toast.error(error.message || "Failed to process template");
    } finally {
      setIsSubmitting(false);
    }
  };

  const recipientCount = bulkRecipients.length;
  const isSubmitDisabled =
    isSubmitting ||
    (sendMode === "bulk" && (recipientCount === 0 || !canUseBulkSend));

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen} >
      <ResponsiveDialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Use Template
          </Button>
        )}
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent useScrollArea={false} className="sm:max-w-[600px] max-h-[95vh] md:max-h-[75vh] flex flex-col p-0 overflow-hidden md:overflow-y-auto">
        <ResponsiveDialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <ResponsiveDialogTitle className="text-xl font-semibold">
                Use Template: {template.title}
              </ResponsiveDialogTitle>
              <ResponsiveDialogDescription className="mt-1.5">
                Send this template to one person or multiple recipients at once.
              </ResponsiveDialogDescription>
            </div>
          </div>
        </ResponsiveDialogHeader>
        <TrialGate>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 min-h-0"
          >
            <ScrollArea className="h-[95vh] md:h-[75vh] max-h-fit">
              <Tabs
                value={sendMode}
                onValueChange={handleSendModeChange}
                className="w-full flex flex-col flex-1 min-h-0"
              >
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2 h-auto bg-muted/50">
                    <TabsTrigger
                      value="individual"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Send to One
                    </TabsTrigger>
                    <TabsTrigger
                      value="bulk"
                      disabled={!canUseBulkSend}
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5 relative"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Bulk Send
                      {!canUseBulkSend && (
                        <Badge
                          variant="secondary"
                          className="ml-2 text-[10px] px-1.5 py-0"
                        >
                          Pro
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* INDIVIDUAL TAB */}
                <TabsContent
                  value="individual"
                  className="mt-0 data-[state=inactive]:hidden"

                >
                  <div className="space-y-6 p-6">
                    {/* Document Title */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="doc-title"
                          className="text-sm font-medium"
                        >
                          Document Title
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Optional
                        </span>
                      </div>
                      <Input
                        id="doc-title"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        placeholder="e.g. Service Agreement - John Doe"
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                        This will be the name of the final signed document.
                      </p>
                    </div>

                    {/* Recipients */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">
                          Assign Recipients
                        </h4>
                        <Badge variant="secondary" className="text-xs font-normal">
                          {roles.length} {roles.length === 1 ? "Role" : "Roles"}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        {roles.map((role, index) => (
                          <div
                            key={role}
                            className="p-4 bg-muted/40 hover:bg-muted/60 transition-colors rounded-lg border border-border/50 space-y-3"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center"
                                aria-hidden="true"
                              >
                                <span className="text-xs font-semibold text-primary">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="font-medium text-sm text-foreground">
                                {role}
                              </span>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3 pl-9">
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`email-${role}`}
                                  className="text-xs text-muted-foreground font-medium"
                                >
                                  Email Address
                                </Label>
                                <Input
                                  id={`email-${role}`}
                                  type="email"
                                  required={sendMode === "individual"}
                                  placeholder="client@company.com"
                                  value={signerMappings[role]?.email || ""}
                                  onChange={(e) =>
                                    handleInputChange(role, "email", e.target.value)
                                  }
                                  className="h-10 bg-background"
                                  aria-describedby={`email-${role}-description`}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor={`name-${role}`}
                                  className="text-xs text-muted-foreground font-medium"
                                >
                                  Full Name
                                </Label>
                                <Input
                                  id={`name-${role}`}
                                  required={sendMode === "individual"}
                                  placeholder="John Doe"
                                  value={signerMappings[role]?.name || ""}
                                  onChange={(e) =>
                                    handleInputChange(role, "name", e.target.value)
                                  }
                                  className="h-10 bg-background"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* BULK TAB */}
                <TabsContent
                  value="bulk"
                  className="mt-0 data-[state=inactive]:hidden"

                >
                  {!canUseBulkSend ? (
                    /* Upgrade prompt for non-Professional users */
                    <div className="p-6">
                      <Alert className="border-primary/20 bg-primary/5">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <AlertDescription className="ml-2">
                          <div className="space-y-3">
                            <div>
                              <p className="font-semibold text-foreground mb-1">
                                Bulk Sending is a Professional Feature
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Send the same template to up to 5 people at once.
                                Each recipient gets their own signing link.
                              </p>
                            </div>

                            <ul className="space-y-2 text-sm" role="list">
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                                  aria-hidden="true"
                                />
                                <span>Save 10-15 minutes per bulk send</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                                  aria-hidden="true"
                                />
                                <span>
                                  Perfect for onboarding, renewals, and standard
                                  contracts
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <div
                                  className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
                                  aria-hidden="true"
                                />
                                <span>Automatic tracking in your dashboard</span>
                              </li>
                            </ul>

                            <Button type="button" className="w-full mt-2" asChild>
                              <Link href="/pricing">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Upgrade to Professional - $39/month
                              </Link>
                            </Button>
                          </div>
                        </AlertDescription>
                      </Alert>
                    </div>
                  ) : (
                    <div className="space-y-6 p-6">
                      {/* Document Title */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="bulk-doc-title"
                            className="text-sm font-medium"
                          >
                            Document Title
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            Optional
                          </span>
                        </div>
                        <Input
                          id="bulk-doc-title"
                          value={documentTitle}
                          onChange={(e) => setDocumentTitle(e.target.value)}
                          placeholder="e.g. Service Agreement"
                          className="h-11"
                        />
                        <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                          Each document will use this title followed by the
                          recipient's name (e.g., "{documentTitle} - John Doe").
                        </p>
                      </div>

                      {/* Info banner */}
                      <Alert className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-sm text-blue-900 ml-2">
                          Each recipient will get their own unique signing link.
                          This uses{" "}
                          <strong>1 signature request per recipient</strong>.
                        </AlertDescription>
                      </Alert>

                      {/* Primary role selector (if multiple roles) */}
                      {roles.length > 1 && (
                        <div className="space-y-3">
                          <Label
                            htmlFor="primary-role-select"
                            className="text-sm font-medium"
                          >
                            Which role are you sending to multiple people?
                          </Label>
                          <Select
                            value={primaryRole}
                            onValueChange={setPrimaryRole}
                          >
                            <SelectTrigger
                              id="primary-role-select"
                              className="h-11"
                            >
                              <SelectValue placeholder="Select role for bulk recipients" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                            Each recipient in your bulk list will be assigned to
                            this role. Other roles stay the same for all documents.
                          </p>
                        </div>
                      )}

                      {/* Fixed roles (if multiple roles) */}
                      {roles.length > 1 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                              Fixed Roles
                            </Label>
                            <Badge variant="secondary" className="text-xs">
                              Same for all documents
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground -mt-2">
                            These signers will be the same across all documents in
                            this bulk send.
                          </p>

                          <div className="space-y-3">
                            {roles
                              .filter((r) => r !== primaryRole)
                              .map((role, index) => (
                                <div
                                  key={role}
                                  className="p-4 bg-amber-50/50 border border-amber-200/50 rounded-lg space-y-3"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <div
                                      className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center"
                                      aria-hidden="true"
                                    >
                                      <span className="text-xs font-semibold text-amber-700">
                                        F{index + 1}
                                      </span>
                                    </div>
                                    <span className="font-medium text-sm text-foreground">
                                      {role}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className="ml-auto text-[10px] border-amber-300 text-amber-700"
                                    >
                                      Fixed
                                    </Badge>
                                  </div>
                                  <div className="grid sm:grid-cols-2 gap-3 pl-9">
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`bulk-email-${role}`}
                                        className="text-xs text-muted-foreground font-medium"
                                      >
                                        Email Address
                                      </Label>
                                      <Input
                                        id={`bulk-email-${role}`}
                                        type="email"
                                        required={sendMode === "bulk"}
                                        placeholder="manager@company.com"
                                        value={signerMappings[role]?.email || ""}
                                        onChange={(e) =>
                                          handleInputChange(
                                            role,
                                            "email",
                                            e.target.value,
                                          )
                                        }
                                        className="h-10 bg-white"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label
                                        htmlFor={`bulk-name-${role}`}
                                        className="text-xs text-muted-foreground font-medium"
                                      >
                                        Full Name
                                      </Label>
                                      <Input
                                        id={`bulk-name-${role}`}
                                        required={sendMode === "bulk"}
                                        placeholder="Jane Smith"
                                        value={signerMappings[role]?.name || ""}
                                        onChange={(e) =>
                                          handleInputChange(
                                            role,
                                            "name",
                                            e.target.value,
                                          )
                                        }
                                        className="h-10 bg-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Bulk recipients input */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">
                            Bulk Recipients{" "}
                            {roles.length > 1 && `(${primaryRole})`}
                          </Label>
                          <Badge variant="secondary" className="text-xs">
                            {recipientCount} / {maxBulkRecipients} added
                          </Badge>
                        </div>

                        <BulkRecipientInput
                          onAddSigners={(newSigners) =>
                            setBulkRecipients((prev) => [...prev, ...newSigners])
                          }
                          existingSigners={bulkRecipients}
                          maxRecipients={maxBulkRecipients}
                          isProfessionalPlan={isProfessionalPlan}
                          isLoading={isSubmitting}
                        />
                      </div>

                      {/* Recipients list */}
                      {recipientCount > 0 && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">
                            Added Recipients
                          </Label>
                          <div
                            className="flex flex-wrap gap-2"
                            role="list"
                            aria-label="Bulk recipients"
                          >
                            {bulkRecipients.map((recipient) => (
                              <Badge
                                key={recipient.email}
                                variant="secondary"
                                className="flex items-center gap-1.5 py-1 pl-2.5 pr-1 text-xs font-normal border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700"
                                role="listitem"
                              >
                                {recipient.email}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveBulkRecipient(recipient.email);
                                  }}
                                  className="hover:bg-zinc-200/50 hover:text-zinc-900 text-zinc-400 rounded-full p-0.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  aria-label={`Remove ${recipient.email}`}
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Custom message */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="custom-message"
                            className="text-sm font-medium flex items-center gap-2"
                          >
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            Custom Message
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            Optional
                          </span>
                        </div>
                        <Textarea
                          id="custom-message"
                          className="w-full min-h-[100px] p-3 text-sm rounded-lg resize-none"
                          value={customMessage}
                          onChange={(e) => setCustomMessage(e.target.value)}
                          placeholder="Add a personal message that all recipients will see in their signing email..."
                        />
                        <p className="text-xs text-muted-foreground">
                          This message will be included in the email all recipients
                          receive.
                        </p>
                      </div>

                      {/* Usage warning */}
                      {recipientCount > 0 && (
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-sm text-orange-900 ml-2">
                            This bulk send will use{" "}
                            <strong>
                              {recipientCount} signature request
                              {recipientCount > 1 ? "s" : ""}
                            </strong>{" "}
                            from your monthly quota.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </ScrollArea>
            <ResponsiveDialogFooter className="px-6 py-4 border-t bg-muted/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3">
                <div className="flex-1">
                  {sendMode === "bulk" &&
                    recipientCount > 0 &&
                    canUseBulkSend && (
                      <p className="text-xs text-muted-foreground">
                        Sending to {recipientCount} recipient
                        {recipientCount > 1 ? "s" : ""} • Uses {recipientCount}{" "}
                        signature request
                        {recipientCount > 1 ? "s" : ""}
                      </p>
                    )}
                </div>
                <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="min-w-[140px]"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {sendMode === "bulk" ? (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Send to {recipientCount || 0}
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Document
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </ResponsiveDialogFooter>
          </form>
        </TrialGate>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}