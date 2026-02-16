"use client";

import { Button } from "@/components/ui/button";
import { SignatureFieldData } from "@/components/signature-field";
import { UserMenu } from "@/components/UserMenu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, LayoutTemplate, Loader2, Pencil, Save } from "lucide-react";
import Link from "next/link";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { SaveAsTemplateDialog } from "@/components/templates/SaveAsTemplateDialog";
import { cn } from "@/lib/utils";
import { KeyboardShortcutsHelper } from "./KeyboardShortcutsHelper";

const ShareDialog = lazy(() => import("@/components/ShareDialog").then(m => ({ default: m.ShareDialog })));

interface EditorNavbarProps {
    documentId: Id<"documents">;
    document?: any; // Add document prop to avoid duplicate query
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
    document: propDocument,
    onSave,
    isSaving,
    hasUnsavedChanges,
    onSendForSigning,
    onSignerAdd,
    hasUnassignedFields,
    signatureFields,
    signers,
}: EditorNavbarProps) => {
    // Use prop document if provided, otherwise query (fallback for standalone usage)
    const queriedDocument = useQuery(
        api.documents.getDocument,
        propDocument ? "skip" : { documentId }
    );
    const document = propDocument || queriedDocument;
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
        <div className="hidden md:flex h-16 items-center justify-between px-6 border-b bg-white/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
            <div className="flex items-center gap-6">
                <Link
                    href={document?.isTemplate ? '/templates' : '/dashboard'}
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-gray-900 border border-gray-100/50"
                    title="Back to dashboard"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                <div className="h-4 w-[1px] bg-gray-200" />

                <div className="flex flex-col max-w-xs lg:max-w-md">
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
                            className="font-bold text-sm bg-transparent border-b-2 border-primary outline-none px-0 py-0.5 leading-tight animate-in fade-in zoom-in-95 duration-200"
                            autoFocus
                        />
                    ) : (
                        <div
                            className="flex items-center gap-2 cursor-pointer group/title select-none max-w-full"
                            onClick={() => setIsEditingTitle(true)}
                        >
                            <h1 className="font-bold text-gray-900 text-sm py-0.5 border-b-2 border-transparent group-hover/title:border-gray-300 transition-all truncate">
                                {document?.title || "Untitled Document"}
                            </h1>
                            <Pencil className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover/title:opacity-100 transition-all transform scale-90 group-hover/title:scale-100" />
                        </div>
                    )}
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400/80 px-0.5">
                            {document?.isTemplate ? "Template" : "Document"}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-gray-300/50" />
                        <span className={cn(
                            "text-[10px] font-extrabold uppercase tracking-wider transition-colors",
                            hasUnsavedChanges ? "text-amber-500" : "text-emerald-500"
                        )}>
                            {hasUnsavedChanges ? "Unsaved Changes" : "Saved"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pr-2 border-r border-gray-100 mr-2">
                    {document?.isTemplate ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50/50 text-amber-700 text-[10px] font-bold rounded-lg border border-amber-100/50 uppercase tracking-widest">
                            <LayoutTemplate className="w-3.5 h-3.5" />
                            Template
                        </div>
                    ) : document?.templateId ? null : (
                        <SaveAsTemplateDialog documentId={documentId} signatureFields={signatureFields} onSave={onSave} />
                    )}

                    {/* <Button
                        variant="ghost"
                        size="sm"
                        onClick={onSave}
                        disabled={isSaving || !hasUnsavedChanges}
                        className={cn(
                            "h-10 px-4 font-bold text-xs uppercase tracking-widest transition-all rounded-xl",
                            hasUnsavedChanges
                                ? "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
                                : "text-gray-400 hover:bg-gray-50"
                        )}
                    >
                        {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Save className="w-3.5 h-3.5 mr-2" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button> */}
                </div>

                {!document?.isTemplate && (
                    <Suspense fallback={<Skeleton className="h-10 w-32 rounded-xl" />}>
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

                <UserMenu className="hidden md:flex" />
                <KeyboardShortcutsHelper />
            </div>
        </div>
    );
});

EditorNavbar.displayName = "EditorNavbar";
