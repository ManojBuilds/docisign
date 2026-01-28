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
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UseTemplateDialogProps {
    template: Doc<"documents">;
    trigger?: React.ReactNode;
}

export function UseTemplateDialog({ template, trigger }: UseTemplateDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const instantiateTemplate = useMutation(api.templates.instantiateTemplate);
    const [documentTitle, setDocumentTitle] = useState(`${template.title} - Copied`);

    // Default roles if none specified
    const roles = template.templateRoles || ["Signer 1"];

    const [signerMappings, setSignerMappings] = useState<
        Record<string, { email: string; name: string }>
    >(
        roles.reduce(
            (acc, role) => ({ ...acc, [role]: { email: "", name: "" } }),
            {}
        )
    );

    const handleInputChange = (
        role: string,
        field: "email" | "name",
        value: string
    ) => {
        setSignerMappings((prev) => ({
            ...prev,
            [role]: { ...prev[role], [field]: value },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const mappings = Object.entries(signerMappings).map(
                ([role, { email, name }]) => ({
                    role,
                    email,
                    name: name || email.split("@")[0], // Fallback name
                })
            );

            const documentId = await instantiateTemplate({
                templateId: template._id,
                title: documentTitle,
                ownerId: template.ownerId, // This might need to be passed if checking authentication
                signerMappings: mappings,
            });

            toast.success("Document created from template!");
            setOpen(false);
            router.push(`/d/${documentId}/edit`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to create document from template");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button size="sm" className="gap-2">
                        Use Template
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Use Template: {template.title}</DialogTitle>
                    <DialogDescription>
                        Assign signers to the roles defined in this template.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-2">
                    <div className="space-y-3">
                        <Label htmlFor="doc-title" className="text-sm font-semibold">Document Title</Label>
                        <Input
                            id="doc-title"
                            value={documentTitle}
                            onChange={(e) => setDocumentTitle(e.target.value)}
                            placeholder="e.g. Service Agreement - John Doe"
                            className="h-10"
                        />
                        <p className="text-[11px] text-muted-foreground">
                            This will be the name of the final contract file.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-foreground">
                                Assign Recipients
                            </h4>
                            <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                {roles.length} Roles
                            </span>
                        </div>

                        <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                            {roles.map((role) => (
                                <div key={role} className="p-3.5 bg-muted/30 hover:bg-muted/50 transition-colors rounded-xl border border-border/50 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <UserPlus className="h-3.5 w-3.5" />
                                        </div>
                                        <span className="font-medium text-sm text-foreground">{role}</span>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div className="space-y-1.5">
                                            <Label htmlFor={`email-${role}`} className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                                                Email
                                            </Label>
                                            <Input
                                                id={`email-${role}`}
                                                type="email"
                                                required
                                                placeholder="client@company.com"
                                                value={signerMappings[role]?.email || ""}
                                                onChange={(e) =>
                                                    handleInputChange(role, "email", e.target.value)
                                                }
                                                className="h-9 bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor={`name-${role}`} className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
                                                Full Name
                                            </Label>
                                            <Input
                                                id={`name-${role}`}
                                                required
                                                placeholder="John Doe"
                                                value={signerMappings[role]?.name || ""}
                                                onChange={(e) =>
                                                    handleInputChange(role, "name", e.target.value)
                                                }
                                                className="h-9 bg-background/50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Document
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
