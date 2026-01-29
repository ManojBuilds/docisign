"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction } from "convex/react";
import { LayoutTemplate, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SignatureFieldData } from "@/components/signature-field";

interface SaveAsTemplateDialogProps {
    documentId: Id<"documents">;
    signatureFields?: SignatureFieldData[];
    onSave?: () => Promise<void>; // Add onSave prop
}

export function SaveAsTemplateDialog({ documentId, signatureFields = [], onSave }: SaveAsTemplateDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const createTemplate = useAction(api.templates.createTemplateFromDocument);

    // Extract unique emails that need role mapping
    const signers = useMemo(() => Array.from(new Set(
        signatureFields
            .map(f => f.signerEmail)
            .filter((email): email is string => !!email && email.trim() !== "")
    )), [signatureFields]);

    const [templateTitle, setTemplateTitle] = useState("My Template");
    const [roleMappings, setRoleMappings] = useState<Record<string, string>>({});

    // Keep roleMappings in sync with signers
    useEffect(() => {
        setRoleMappings(prev => {
            const next = { ...prev };
            let updated = false;
            signers.forEach(email => {
                if (!(email in next)) {
                    next[email] = "";
                    updated = true;
                }
            });
            return updated ? next : prev;
        });
    }, [signers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // First, save any unsaved changes to the document
            if (onSave) {
                await onSave();
            }

            // Validate that all roles are filled
            if (Object.values(roleMappings).some(role => !role.trim())) {
                toast.error("Please assign a Role Name to all signers.");
                setIsSubmitting(false);
                return;
            }

            if (!templateTitle.trim()) {
                toast.error("Please provide a template title.");
                setIsSubmitting(false);
                return;
            }

            const mappings = Object.entries(roleMappings).map(
                ([email, role]) => ({ email, role })
            );

            await createTemplate({
                documentId,
                title: templateTitle,
                roleMappings: mappings
            });

            toast.success("Saved as Template!");
            setOpen(false);
            router.push("/templates");

        } catch (error) {
            console.error(error);
            toast.error("Failed to save as template.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutTemplate className="w-4 h-4" />
                    Save as Template
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl sm:rounded-3xl">
                <DialogHeader className="p-6 pb-2 sm:p-8 sm:pb-4 bg-white text-center sm:text-left">
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Save as Template</DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-slate-500 mt-1.5 px-1 sm:px-0">
                        Turn this document into a reusable template by defining roles like <span className="font-semibold text-primary">"Client"</span> or <span className="font-semibold text-primary">"Tenant"</span>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col max-h-[85vh]">
                    <ScrollArea className="flex-1 px-6 py-2 sm:px-8 space-y-8">
                        {/* Template Title Section */}
                        <div className="space-y-3.5">
                            <Label htmlFor="template-title" className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
                                Template Name
                            </Label>
                            <Input
                                id="template-title"
                                value={templateTitle}
                                onChange={(e) => setTemplateTitle(e.target.value)}
                                placeholder="e.g. Standard Service Agreement"
                                className="h-12 px-4 rounded-xl bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-900"
                            />
                            <p className="text-[11px] text-slate-400 font-medium">
                                Give your template a clear, recognizable name for future use.
                            </p>
                        </div>

                        {/* Role Mapping Section */}
                        <div className="space-y-5 pb-8">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wide">
                                    Map Signers to Roles
                                </h4>
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full">
                                    {signers.length} {signers.length === 1 ? 'Signer' : 'Signers'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {signers.length > 0 ? (
                                    signers.map((email) => (
                                        <div key={email} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-200/60 space-y-4 hover:border-primary/20 hover:bg-white transition-all duration-200 group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                    @
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Assigned Email</p>
                                                    <p className="text-sm font-semibold text-slate-700 truncate" title={email}>
                                                        {email}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor={`role-${email}`} className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                                    Generic Role Name
                                                </Label>
                                                <Input
                                                    id={`role-${email}`}
                                                    placeholder="e.g. Client, Tenant, Employee"
                                                    value={roleMappings[email] || ""}
                                                    onChange={(e) => setRoleMappings(prev => ({ ...prev, [email]: e.target.value }))}
                                                    required
                                                    className="h-10 bg-white border-slate-200 rounded-lg focus:ring-primary/20 font-medium"
                                                />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200/60 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                            <LayoutTemplate className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-amber-900 text-sm">No signers detected</p>
                                            <p className="text-xs text-amber-800/70 leading-relaxed font-medium">
                                                You can still save this as a template, but you'll need to manually assign fields later if you add specific signers now.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter className="p-6 sm:p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto rounded-xl h-11 border-slate-200 font-semibold"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:flex-1 h-11 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                            ) : null}
                            Save Template
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
