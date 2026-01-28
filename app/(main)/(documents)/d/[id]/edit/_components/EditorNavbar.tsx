"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { SignatureFieldData } from "@/components/signature-field";
import { UserMenu } from "@/components/UserMenu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, LayoutTemplate, Loader2, Pencil, Save } from "lucide-react";
import Link from "next/link";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { SaveAsTemplateDialog } from "@/components/templates/SaveAsTemplateDialog";

const ShareDialog = lazy(() => import("@/components/ShareDialog").then(m => ({ default: m.ShareDialog })));

interface EditorNavbarProps {
    documentId: Id<"documents">;
    onSave: () => Promise<void>;
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    onSendForSigning: (signers: any[], customMessage?: string) => Promise<void>;
    onSignerAdd: (signer: any) => void;
    hasUnassignedFields: boolean;
    signatureFields?: SignatureFieldData[];
    signers?: any[];
}

export const EditorNavbar = memo(({
    documentId,
    onSave,
    isSaving,
    hasUnsavedChanges,
    onSendForSigning,
    onSignerAdd,
    hasUnassignedFields,
    signatureFields,
    signers,
}: EditorNavbarProps) => {
    const document = useQuery(api.documents.getDocument, { documentId });
    const updateDocumentTitle = useMutation(api.documents.updateDocumentTitle);

    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState(document?.title || "");

    useEffect(() => {
        if (document?.title && !isEditingTitle) {
            setEditedTitle(document.title);
        }
    }, [document?.title, isEditingTitle]);

    const handleTitleUpdate = async () => {
        if (editedTitle.trim() === "") {
            toast.error("Document title cannot be empty");
            setEditedTitle(document?.title || "");
            setIsEditingTitle(false);
            return;
        }

        if (editedTitle !== document?.title) {
            try {
                await updateDocumentTitle({
                    documentId,
                    title: editedTitle,
                });
                toast.success("Document title updated successfully");
            } catch (_error) {
                console.error(_error)
                toast.error("Failed to update document title");
                setEditedTitle(document?.title || "");
            }
        }
        setIsEditingTitle(false);
    };

    return (
        <div className="hidden md:flex justify-between items-center px-4 py-2.5 border-b bg-white">
            <div className="flex items-center space-x-4">
                <Link href={document?.isTemplate ? '/templates' : '/dashboard'} className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}>
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
                <div className="flex items-center w-32 md:w-64 group">
                    {isEditingTitle ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onBlur={handleTitleUpdate}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleTitleUpdate();
                                else if (e.key === 'Escape') {
                                    setEditedTitle(document?.title || "");
                                    setIsEditingTitle(false);
                                }
                            }}
                            className="font-semibold text-sm w-full bg-transparent focus:outline-none border-b-2 border-primary px-2 py-1 leading-tight"
                            autoFocus
                        />
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-100 rounded px-2 py-1 border-b-2 border-transparent leading-tight transition-colors group/title"
                                        onClick={() => setIsEditingTitle(true)}
                                    >
                                        <span className="font-semibold text-sm truncate flex-1 block">
                                            {document?.title || "Loading..."}
                                        </span>
                                        <Pencil className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover/title:opacity-100 transition-opacity" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" align="start" sideOffset={8} className="bg-gray-900 text-white font-medium px-3 py-1.5 text-[11px] border-none shadow-2xl rounded-lg">
                                    Click to edit title
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {document?.isTemplate ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-900 text-xs font-bold rounded-lg border border-amber-200 shadow-sm">
                        <LayoutTemplate className="w-3.5 h-3.5" />
                        TEMPLATE EDITOR
                    </div>
                ) : document?.templateId ? ( // Hide Save as Template button if document was created from a template
                    <div className="text-xs text-muted-foreground italic">
                        From template
                    </div>
                ) : (
                    <SaveAsTemplateDialog documentId={documentId} signatureFields={signatureFields} onSave={onSave} />
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={onSave}
                    disabled={isSaving || !hasUnsavedChanges}
                    className="gap-2 shadow-sm h-10 px-4"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>

                {!document?.isTemplate && (
                    <Suspense fallback={<Skeleton className="h-10 w-32 rounded-lg" />}>
                        <ShareDialog
                            documentId={documentId}
                            onSend={onSendForSigning}
                            hasUnassignedFields={hasUnassignedFields}
                            onSignerAdd={onSignerAdd}
                            skipSignerSync={true}
                            signatureFields={signatureFields}
                            signers={signers}
                        />
                    </Suspense>
                )}
                <div className="w-1 h-6 border-l border-gray-200 mx-1" />
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border shadow-sm">
                    <UserMenu />
                </div>
            </div>
        </div>
    );
});

EditorNavbar.displayName = "EditorNavbar";
