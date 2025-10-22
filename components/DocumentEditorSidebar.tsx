'use client';

import React from 'react';
import { Button } from './ui/button';
import {
  PenTool,
  CalendarDays,
  ALargeSmall,
  TextCursor,
} from 'lucide-react';
import { SignatureFieldData } from './signature-field';

interface DocumentEditorSidebarProps {
  onAddField: (fieldType: SignatureFieldData['fieldType']) => void;
}

export function DocumentEditorSidebar({ onAddField }: DocumentEditorSidebarProps) {
  return (
    <aside className="w-72 bg-white border-r p-4 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Tools</h3>

        <div className="grid grid-cols-2 gap-3">
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
    </aside>
  );
}