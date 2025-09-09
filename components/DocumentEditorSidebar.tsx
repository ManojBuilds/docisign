'use client';

import React from 'react';
import { useDocumentEditorStore } from '@/store/document-editor-store';
import { Button } from './ui/button';
import {
  PenTool,
  CalendarDays,
  ALargeSmall,
  TextCursor,
} from 'lucide-react';
import { SignatureFieldData } from './signature-field';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface DocumentEditorSidebarProps {
  onAddField: (fieldType: SignatureFieldData['fieldType']) => void;
}

const gradients = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-green-400 to-blue-500',
  'from-red-500 to-orange-500',
  'from-teal-400 to-cyan-600',
];

const fieldIcons: { [key in SignatureFieldData['fieldType']]: React.ReactNode } = {
  signature: <PenTool className="w-4 h-4" />,
  initial: <TextCursor className="w-4 h-4" />,
  date: <CalendarDays className="w-4 h-4" />,
  text: <ALargeSmall className="w-4 h-4" />,
};

export function DocumentEditorSidebar({
  onAddField,
}: DocumentEditorSidebarProps) {
  const { signers, signatureFields, setSelectedFieldId, setCurrentPage } =
    useDocumentEditorStore();

  const outlineData = React.useMemo(() => {
    const recipientEmails = new Set(
      signatureFields.map((field) => field.assignedToEmail).filter(Boolean)
    ) as Set<string>;

    const recipients = Array.from(recipientEmails).map((email) => {
      const signerDetails = signers.find((s) => s.email === email);
      const fieldsForRecipient = signatureFields.filter(
        (f) => f.assignedToEmail === email
      );

      fieldsForRecipient.sort((a, b) =>
        String(a.id).localeCompare(String(b.id))
      );

      const fieldCounts: { [key: string]: number } = {};

      const processedFields = fieldsForRecipient.map((field) => {
        fieldCounts[field.fieldType] = (fieldCounts[field.fieldType] || 0) + 1;
        return {
          ...field,
          displayName: `${
            field.fieldType.charAt(0).toUpperCase() + field.fieldType.slice(1)
          } ${fieldCounts[field.fieldType]}`,
        };
      });

      return {
        email,
        name: signerDetails?.name,
        fields: processedFields,
      };
    });

    const unassignedFields = signatureFields.filter(
      (field) => !field.assignedToEmail
    );

    if (unassignedFields.length > 0) {
      unassignedFields.sort((a, b) =>
        String(a.id).localeCompare(String(b.id))
      );
      const fieldCounts: { [key: string]: number } = {};
      const processedUnassignedFields = unassignedFields.map((field) => {
        fieldCounts[field.fieldType] =
          (fieldCounts[field.fieldType] || 0) + 1;
        return {
          ...field,
          displayName: `${
            field.fieldType.charAt(0).toUpperCase() + field.fieldType.slice(1)
          } ${fieldCounts[field.fieldType]}`,
        };
      });

      recipients.push({
        email: 'unassigned-fields',
        name: 'Unassigned',
        fields: processedUnassignedFields,
      });
    }

    return recipients;
  }, [signatureFields, signers]);

  const handleFieldClick = (field: SignatureFieldData) => {
    setCurrentPage(field.page);
    setSelectedFieldId(field.id);
  };

  return (
    <aside className="w-72 bg-white border-r p-4 flex-col space-y-4 hidden md:flex">
      <div>
        <h3 className="text-base font-semibold mb-3 px-2">Add Fields</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => onAddField('signature')}
            className="h-20 flex-col"
          >
            <PenTool className="w-5 h-5 mb-1" />
            Signature
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddField('initial')}
            className="h-20 flex-col"
          >
            <TextCursor className="w-5 h-5 mb-1" />
            Initial
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddField('date')}
            className="h-20 flex-col"
          >
            <CalendarDays className="w-5 h-5 mb-1" />
            Date
          </Button>
          <Button
            variant="outline"
            onClick={() => onAddField('text')}
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
          type="multiple"
          className="w-full"
          defaultValue={outlineData.map((r) => r.email)}
        >
          {outlineData.map((recipient, index) => (
            <AccordionItem
              key={recipient.email}
              value={recipient.email}
              className="border-none"
            >
              <AccordionTrigger className="font-semibold hover:no-underline rounded-md px-2 hover:bg-muted">
                <div className="flex items-center w-full">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex-shrink-0 bg-gradient-to-br',
                      gradients[index % gradients.length]
                    )}
                  />
                  <div className="truncate text-left ml-2">
                    <p className="font-medium text-sm">
                      {recipient.name || `Signer ${index + 1}`}
                    </p>
                    {recipient.email !== 'unassigned-fields' && (
                      <p className="text-xs text-muted-foreground truncate">
                        {recipient.email}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-4 pt-1">
                {recipient.fields.length > 0 ? (
                  <ul className="space-y-1 border-l-2 border-dashed ml-3">
                    {recipient.fields.map((field) => (
                      <li key={field.id} className="pl-4">
                        <Button
                          variant="ghost"
                          className="w-full justify-start h-auto py-1.5"
                          onClick={() => handleFieldClick(field)}
                        >
                          <div className="text-muted-foreground mr-2">
                            {fieldIcons[field.fieldType]}
                          </div>
                          <span className="text-sm">{field.displayName}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground px-2">
                    No fields assigned.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
          {outlineData.length === 0 && (
            <p className="text-sm text-muted-foreground px-2">
              No recipients have assigned fields.
            </p>
          )}
        </Accordion>
      </div>
    </aside>
  );
}