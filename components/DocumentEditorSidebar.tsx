"use client";

import React from "react";
import { useDocumentEditorStore } from "@/store/document-editor-store";
import { Button } from "./ui/button";
import { PenTool, CalendarDays, ALargeSmall, TextCursor } from "lucide-react";
import { SignatureFieldData } from "./signature-field";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DocumentEditorSidebarProps {
  onAddField: (fieldType: SignatureFieldData["fieldType"]) => void;
}

const gradients = [
  "from-pink-500 to-yellow-500",
  "from-purple-500 to-indigo-500",
  "from-green-400 to-blue-500",
  "from-red-500 to-orange-500",
  "from-teal-400 to-cyan-600",
];

export function DocumentEditorSidebar({
  onAddField,
}: DocumentEditorSidebarProps) {
  const { signers, signatureFields, setSelectedFieldId, setCurrentPage } =
    useDocumentEditorStore();

  const recipients = React.useMemo(() => {
    const recipientEmails = new Set(
      signatureFields.map((field) => field.assignedToEmail).filter(Boolean),
    ) as Set<string>;

    return Array.from(recipientEmails).map((email) => {
      const signerDetails = signers.find((s) => s.email === email);
      return {
        email,
        name: signerDetails?.name,
      };
    });
  }, [signatureFields, signers]);

  const handleRecipientClick = (email: string) => {
    const field = signatureFields.find((f) => f.assignedToEmail === email);
    if (field) {
      setCurrentPage(field.page);
      setSelectedFieldId(field.id);
    } else {
      toast.info(`No fields assigned to ${email}`);
    }
  };

  return (
    <aside className="w-72 bg-white border-r p-4 flex-col space-y-4 hidden md:flex">
      <div>
        <h3 className="text-base font-semibold mb-3 px-2">Add Fields</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => onAddField("signature")}
            className="h-20 flex-col"
          >
            <PenTool className="w-5 h-5 mb-1" />
            Signature
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddField("initial")}
            className="h-20 flex-col"
          >
            <TextCursor className="w-5 h-5 mb-1" />
            Initial
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddField("date")}
            className="h-20 flex-col"
          >
            <CalendarDays className="w-5 h-5 mb-1" />
            Date
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddField("text")}
            className="h-20 flex-col"
          >
            <ALargeSmall className="w-5 h-5 mb-1" />
            Text
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-base font-semibold mb-3">Document Outline</h3>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="recipients"
        >
          <AccordionItem value="recipients" className="border-none">
            <AccordionTrigger className="font-semibold hover:no-underline">
              Recipients
            </AccordionTrigger>
            <AccordionContent>
              {recipients.length > 0 ? (
                <ul className="space-y-1">
                  {recipients.map((recipient, index) => (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-2"
                        onClick={() => handleRecipientClick(recipient.email)}
                      >
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex-shrink-0 bg-gradient-to-br",
                            gradients[index % gradients.length],
                          )}
                        />
                        <div className="truncate text-left ml-2">
                          <p className="font-medium text-sm">
                            {recipient.name || `Signer ${index + 1}`}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {recipient.name && `${recipient.name} - `}
                            {recipient.email}
                          </p>
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground px-2">
                  No recipients have assigned fields.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}