"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  List,
  MoreVertical,
  Pencil,
  Plus,
  Send,
  LayoutTemplate,
} from "lucide-react";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { SaveAsTemplateDialog } from "@/components/templates/SaveAsTemplateDialog";
import { SignatureFieldData } from "@/components/signature-field";

interface MobileNavbarProps {
  documentId: Id<"documents">;
  document?: any; // Add document prop to avoid duplicate query
  setIsShareDialogOpen: (open: boolean) => void;
  onOpenAddFieldSheet?: () => void;
  onOpenFieldsDrawer?: () => void;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
  signatureFields?: SignatureFieldData[];
}

/**
 * Adobe Sign–style mobile navbar: back, title, primary Send, overflow menu.
 */
export const MobileNavbar = memo(({
  documentId,
  document: propDocument,
  setIsShareDialogOpen,
  onOpenAddFieldSheet,
  onOpenFieldsDrawer,
  onSave,
  isSaving,
  hasUnsavedChanges,
  signatureFields,
}: MobileNavbarProps) => {
  // Use prop document if provided, otherwise query (fallback for standalone usage)
  const queriedDocument = useQuery(
    api.documents.getDocument,
    propDocument ? "skip" : { documentId }
  );
  const document = propDocument || queriedDocument;
  const updateDocumentTitle = useMutation(api.documents.updateDocumentTitle);
  const [editedTitle, setEditedTitle] = useState(document?.title || "");
  const [isTitleDrawerOpen, setIsTitleDrawerOpen] = useState(false);
  const [isSaveAsTemplateOpen, setIsSaveAsTemplateOpen] = useState(false);

  useEffect(() => {
    if (document?.title) setEditedTitle(document.title);
  }, [document?.title]);

  const handleTitleSave = async () => {
    if (editedTitle.trim() === "") {
      toast.error("Document title cannot be empty");
      setEditedTitle(document?.title || "");
      setIsTitleDrawerOpen(false);
      return;
    }
    if (editedTitle !== document?.title) {
      try {
        await updateDocumentTitle({ documentId, title: editedTitle });
        toast.success("Title updated");
      } catch {
        toast.error("Failed to update title");
        setEditedTitle(document?.title || "");
      }
    }
    setIsTitleDrawerOpen(false);
  };

  return (
    <header className="md:hidden sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl px-4 transition-all duration-300">
      <Link
        href="/dashboard"
        className="flex shrink-0 items-center justify-center p-2 -ml-1 text-gray-600 hover:text-gray-900"
        aria-label="Back to dashboard"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <button
        type="button"
        onClick={() => setIsTitleDrawerOpen(true)}
        className="flex-1 min-w-0 flex items-center justify-center px-2 py-1"
      >
        <span className="text-sm font-medium text-gray-900 truncate block">
          {document?.title || "Untitled"}
        </span>
      </button>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          size="sm"
          className="h-8 rounded-lg px-3 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setIsShareDialogOpen(true)}
        >
          <Send className="h-3.5 w-3.5 mr-1" />
        </Button>
        {/* UserMenu is hidden on mobile edit per request */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreVertical className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            {onOpenFieldsDrawer && (
              <DropdownMenuItem onClick={onOpenFieldsDrawer}>
                <List className="mr-2 h-4 w-4" />
                Fields
              </DropdownMenuItem>
            )}
            {onOpenAddFieldSheet && (
              <DropdownMenuItem onClick={onOpenAddFieldSheet}>
                <Plus className="mr-2 h-4 w-4" />
                Add field
              </DropdownMenuItem>
            )}
            {onSave && (
              <DropdownMenuItem
                onClick={onSave}
                disabled={isSaving || !hasUnsavedChanges}
                className={cn("flex items-center justify-between", hasUnsavedChanges && "text-primary")}
              >
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 flex items-center justify-center">
                    {isSaving ? (
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : (
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                    )}
                  </div>
                  {isSaving ? "Saving..." : "Save Draft"}
                </div>
                {hasUnsavedChanges && !isSaving && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </DropdownMenuItem>
            )}

            {document?.isTemplate ? (
              <DropdownMenuItem disabled className="text-amber-700 bg-amber-50/50 focus:text-amber-700 focus:bg-amber-100">
                <LayoutTemplate className="mr-2 h-4 w-4" />
                Template
              </DropdownMenuItem>
            ) : document?.templateId ? null : (
              <DropdownMenuItem onSelect={() => setIsSaveAsTemplateOpen(true)}>
                <LayoutTemplate className="mr-2 h-4 w-4" />
                Save as Template
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onClick={() => setIsTitleDrawerOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit title
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Drawer open={isTitleDrawerOpen} onOpenChange={setIsTitleDrawerOpen}>
        <DrawerContent className="rounded-t-2xl">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-base">Edit document title</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-3 px-4 pb-6">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Document title"
              className="rounded-lg"
            />
            <Button onClick={handleTitleSave} className="rounded-lg">
              Save
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      <SaveAsTemplateDialog
        documentId={documentId}
        signatureFields={signatureFields}
        onSave={onSave}
        open={isSaveAsTemplateOpen}
        onOpenChange={setIsSaveAsTemplateOpen}
      >
        <div className="hidden" />
      </SaveAsTemplateDialog>
    </header>
  );
});

MobileNavbar.displayName = "MobileNavbar";
