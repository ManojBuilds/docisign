"use client";

import Logo from "@/components/Logo";
import { SignatureFieldData } from "@/components/signature-field";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { UserButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { ALargeSmall, CalendarDays, Pencil, PenTool, Share, TextCursor } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";

interface MobileNavbarProps {
  documentId: Id<"documents">;
  setIsShareDialogOpen: (open: boolean) => void;
  onAddField: (fieldType: SignatureFieldData["fieldType"]) => void;
}

export const MobileNavbar = memo(({
  documentId,
  setIsShareDialogOpen,
  onAddField
}: MobileNavbarProps) => {
  const document = useQuery(api.documents.getDocument, { documentId });
  const updateDocumentTitle = useMutation(api.documents.updateDocumentTitle);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(document?.title || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        await updateDocumentTitle({ documentId, title: editedTitle });
        toast.success("Document title updated successfully");
      } catch (_error) {
        console.error(_error)
        toast.error("Failed to update document title");
        setEditedTitle(document?.title || "");
      }
    }
    setIsEditingTitle(false);
  };

  const handleAddFieldAndClose = (type: SignatureFieldData["fieldType"]) => {
    onAddField(type);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="md:hidden flex justify-between items-center p-3 border-b bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Logo showText={false} href="/dashboard" />
      </div>

      <div className="flex items-center w-36 px-1">
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
            className="font-medium text-sm w-full bg-transparent focus:outline-none border-b-2 border-primary px-1 py-0.5 text-center leading-tight"
            autoFocus
          />
        ) : (
          <div
            className="flex items-center justify-center gap-1 w-full cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5 border-b-2 border-transparent leading-tight transition-colors"
            onClick={() => setIsEditingTitle(true)}
          >
            <span className="font-medium text-sm truncate block">
              {document?.title || "Loading..."}
            </span>
            <Pencil className="w-3 h-3 text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsShareDialogOpen(true)}>
          <Share className="w-4 h-4" />
        </Button>
        <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DrawerContent className="min-h-[40vh] rounded-t-lg">
            <DrawerTitle className="sr-only">Add fields</DrawerTitle>
            <div className="flex flex-col space-y-4 p-4">
              <h3 className="font-semibold text-lg">Add Fields</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => handleAddFieldAndClose("signature")} className="flex flex-col items-center justify-center h-20 space-y-2" variant="outline">
                  <PenTool className="w-6 h-6" />
                  <span className="text-sm text-muted-foreground">Signature</span>
                </Button>
                <Button onClick={() => handleAddFieldAndClose("initial")} className="flex flex-col items-center justify-center h-20 space-y-2" variant="outline">
                  <TextCursor className="w-6 h-6" />
                  <span className="text-sm text-muted-foreground">Initial</span>
                </Button>
                <Button onClick={() => handleAddFieldAndClose("date")} className="flex flex-col items-center justify-center h-20 space-y-2" variant="outline">
                  <CalendarDays className="w-6 h-6" />
                  <span className="text-sm text-muted-foreground">Date</span>
                </Button>
                <Button onClick={() => handleAddFieldAndClose("text")} className="flex flex-col items-center justify-center h-20 space-y-2" variant="default">
                  <ALargeSmall className="w-6 h-6" />
                  <span className="text-sm text-white">Text</span>
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
        <UserButton />
      </div>
    </div>
  );
});

MobileNavbar.displayName = "MobileNavbar";
