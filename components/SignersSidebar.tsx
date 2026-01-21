'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useDocumentEditorStore } from '@/stores/document-editor-store';
import { useSignersStore } from '@/stores/signersStore';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import {
  ALargeSmall, CalendarDays,
  ChevronLeft,
  MousePointer2,
  PenTool,
  Plus,
  Settings,
  TextCursor,
  X
} from 'lucide-react';
import { useMemo } from 'react';
import { SignatureFieldData } from './signature-field';
import { SignatureFieldSettings } from './signature-field-settings';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Kbd } from './ui/kbd';


interface SignersSidebarProps {
  documentId: Id<'documents'>;
}

const gradients = [
  'from-pink-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-green-400 to-blue-500',
  'from-red-500 to-orange-500',
  'from-teal-400 to-cyan-600',
];

export function SignersSidebar({ }: SignersSidebarProps) {
  const {
    signatureFields,
    selectedFieldId,
    setSelectedFieldId,
    updateSignatureFieldInStore,
    deleteSignatureFieldInStore,
    selectedTool,
    setSelectedTool,
    setCurrentPage,
  } = useDocumentEditorStore();

  const { user } = useUser();
  const allSigners = useQuery(api.signers.getUserSigners, user ? { ownerId: user.id } : 'skip');

  const { signers: storeSigners } = useSignersStore();

  const documentSigners = useMemo(() => {
    const signersMap = new Map<string, string>();

    // First, add all signers from the store
    storeSigners.forEach(s => {
      signersMap.set(s.email, s.name || s.email);
    });

    // Then, potentially add signers from fields (though they should already be in storeSigners)
    signatureFields.forEach(field => {
      if (field.signerEmail && !signersMap.has(field.signerEmail)) {
        signersMap.set(field.signerEmail, field.signerName || field.signerEmail);
      }
    });

    return Array.from(signersMap.entries()).map(([email, name]) => ({ email, name }));
  }, [storeSigners, signatureFields]);

  const activeFields = useMemo(() => {
    return signatureFields
      .filter((f: SignatureFieldData) => f.status !== "signed" && !f.isCompleted)
      .sort((a, b) => {
        if (a.page !== b.page) return a.page - b.page;
        return a.normalizedY - b.normalizedY;
      });
  }, [signatureFields]);

  const selectedField = activeFields.find((field: SignatureFieldData) => field.id === selectedFieldId);

  const tools = [
    { id: 'selection', icon: MousePointer2, label: 'Move', shortcut: 'V' },
    { id: 'signature', icon: PenTool, label: 'Sign', shortcut: 'S' },
    { id: 'initial', icon: TextCursor, label: 'Initial', shortcut: 'I' },
    { id: 'date', icon: CalendarDays, label: 'Date', shortcut: 'D' },
    { id: 'text', icon: ALargeSmall, label: 'Text', shortcut: 'T' },
  ] as const;

  const handleFieldClick = (field: SignatureFieldData) => {
    setSelectedFieldId(field.id);
    setCurrentPage(field.page);
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'signature':
        return <PenTool className="w-3.5 h-3.5" />;
      case 'initial':
        return <TextCursor className="w-3.5 h-3.5" />;
      case 'date':
        return <CalendarDays className="w-3.5 h-3.5" />;
      default:
        return <ALargeSmall className="w-3.5 h-3.5" />;
    }
  };

  if (selectedField) {
    return (
      <aside id="signers-sidebar" className="w-full max-w-sm bg-white border-l flex flex-col h-full shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Settings Header */}
        <div className="px-2 py-3 bg-gray-50/80 border-b backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-1">
            <button
              onClick={() => setSelectedFieldId('')}
              className="group flex items-center gap-1.5 text-gray-500 hover:text-primary transition-colors"
            >
              <div className="p-1 rounded-lg group-hover:bg-primary/10 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider">Back to tools</span>
            </button>
            <button
              onClick={() => {
                deleteSignatureFieldInStore(selectedField.id);
                setSelectedFieldId('');
              }}
              className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-all"
              title="Delete field"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2.5 px-1 mt-3">
            <div className="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900 leading-tight">Field Settings</h3>
              <p className="text-[10px] text-gray-500 font-medium">Configure properties and assignment</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <SignatureFieldSettings
              field={selectedField}
              onFieldUpdate={(updates: Partial<SignatureFieldData>) => {
                const updatedField = { ...selectedField, ...updates };
                updateSignatureFieldInStore(updatedField);
              }}
              signers={allSigners ?? []}
            />
          </div>
        </ScrollArea>
      </aside>
    );
  }

  return (
    <aside id="signers-sidebar" className="w-full max-w-sm bg-white border-l flex flex-col h-full shadow-xl z-20 overflow-hidden">
      {/* Tools Section */}
      <div className="p-4 bg-gray-50/50 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-1">Toolbar</h3>
          <div className="flex gap-1">
            <span className="text-[10px] text-gray-400 font-medium bg-white px-1.5 py-0.5 rounded border border-gray-100 italic">Press shortcut keys</span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <TooltipProvider delayDuration={0}>
            {tools.map((tool) => (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSelectedTool(tool.id)}
                    className={cn(
                      'cursor-pointer flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all border-2',
                      selectedTool === tool.id
                        ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:bg-gray-50'
                    )}
                  >
                    <tool.icon className={cn('w-4 h-4', selectedTool === tool.id ? 'text-white' : 'text-gray-600')} />
                    <Kbd className={cn('text-[9px] font-semibold uppercase')}>
                      {tool.shortcut}
                    </Kbd>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[10px] bg-gray-900 border-none px-2 py-1">
                  {tool.label} ({tool.shortcut})
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Fields List Section */}
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Fields ({activeFields.length})</h3>
            </div>
            {activeFields.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-6 text-center border-2 border-dashed border-gray-100">
                <Plus className="w-6 h-6 mx-auto text-gray-300 mb-2" />
                <p className="text-[11px] text-gray-500 font-medium">No fields placed yet</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Select a tool above to start</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {activeFields.map((field: SignatureFieldData) => (
                  <div
                    key={field.id}
                    onClick={() => handleFieldClick(field)}
                    className={cn(
                      'group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer',
                      selectedFieldId === field.id
                        ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/20'
                        : 'bg-white border-gray-100 hover:border-gray-200'
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                        selectedFieldId === field.id ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        {getFieldIcon(field.fieldType)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[11px] truncate text-gray-900 capitalize leading-none mb-0.5">
                          {field.label || `${field.fieldType} Field`}
                        </div>
                        <div className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                          Page {field.page} • {field.signerEmail || 'Unassigned'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSignatureFieldInStore(field.id);
                        if (selectedFieldId === field.id) setSelectedFieldId('');
                      }}
                      className="p-1 px-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all text-gray-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Separator className="bg-gray-100" />

          {/* Signers Reference Section */}
          <section>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Recipients ({documentSigners.length})</h3>
            </div>
            {documentSigners.length === 0 ? (
              <p className="text-[10px] text-gray-400 italic px-1 font-medium">No recipients assigned yet</p>
            ) : (
              <div className="space-y-2">
                {documentSigners.map((signer, index) => (
                  <div key={signer.email} className="flex items-center gap-2.5 px-1 group">
                    <div className={cn(
                      'w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white shrink-0 bg-gradient-to-tr uppercase',
                      gradients[index % gradients.length]
                    )}>
                      {signer.name?.charAt(0) || signer.email.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-gray-900 truncate tracking-tight">{signer.name || signer.email}</p>
                      {signer.name && signer.name !== signer.email && (
                        <p className="text-[9px] text-gray-500 font-medium truncate mt-[-1px]">{signer.email}</p>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </ScrollArea>
    </aside>
  );
}