'use client';

import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useDocumentEditorStore } from '@/stores/document-editor-store';
import {
  ALargeSmall, CalendarDays,
  ChevronLeft,
  MousePointer2,
  PenTool,
  Plus, TextCursor,
  X
} from 'lucide-react';
import { useMemo } from 'react';
import { SignatureFieldData } from './signature-field';
import { SignatureFieldSettings } from './signature-field-settings';
import { ScrollArea } from './ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Avatar, AvatarFallback } from './ui/avatar';


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


  // Use all active signers (merges manual + field) for the sidebar display
  // const activeSigners = useMemo(() => {
  //   const uniqueSigners = new Map();
  //   manualSigners.forEach(s => uniqueSigners.set(s.email, s));
  //   signatureFields.forEach(f => {
  //     if (f.signerEmail && !uniqueSigners.has(f.signerEmail)) {
  //       uniqueSigners.set(f.signerEmail, {
  //         email: f.signerEmail,
  //         name: f.signerName || "",
  //       });
  //     }
  //   });
  //   return Array.from(uniqueSigners.values()).sort((a, b) => a.email.localeCompare(b.email));
  // }, [manualSigners, signatureFields]);

  // Only signers who are assigned to signature fields (for sending purposes)
  const signersAssignedToFields = useMemo(() => {
    const uniqueSigners = new Map();
    signatureFields.forEach(f => {
      if (f.signerEmail && !uniqueSigners.has(f.signerEmail)) {
        uniqueSigners.set(f.signerEmail, {
          email: f.signerEmail,
          name: f.signerName || "",
        });
      }
    });
    return Array.from(uniqueSigners.values()).sort((a, b) => a.email.localeCompare(b.email));
  }, [signatureFields]);

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
      <aside id="signers-sidebar" className="w-full md:max-w-[320px] bg-white border-l flex flex-col h-full shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="px-5 py-4 border-b bg-gray-50/30 backdrop-blur-sm sticky top-0 z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedFieldId('')}
              className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 group-hover:border-gray-900 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest">Back</span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                deleteSignatureFieldInStore(selectedField.id);
                setSelectedFieldId('');
              }}
              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm">
              {getFieldIcon(selectedField.fieldType)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">
                {selectedField.fieldType} Field
              </h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Properties</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-5">
            <div className="space-y-6">
              <SignatureFieldSettings
                field={selectedField}
                onFieldUpdate={(updates: Partial<SignatureFieldData>) => {
                  const updatedField = { ...selectedField, ...updates };
                  updateSignatureFieldInStore(updatedField);
                }}
                signers={signersAssignedToFields.map(s => ({
                  ...s,
                  documentId: selectedField.id as any,
                  documentTitle: ""
                }))}
              />
            </div>
          </div>
        </ScrollArea>
      </aside>
    );
  }

  return (
    <aside id="signers-sidebar" className="w-full md:max-w-[320px] bg-white border-l border-gray-200/60 flex flex-col h-full overflow-hidden shadow-sm relative">
      <div className="p-6 border-b bg-gray-50/40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <h2 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Field Palette</h2>
            <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5 opacity-60">Drag or Click to place</p>
          </div>
          <div className="flex h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse ring-4 ring-primary/10" />
        </div>
        <div className="grid grid-cols-5 gap-2">
          <TooltipProvider delayDuration={0}>
            {tools.map((tool) => (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSelectedTool(tool.id)}
                    className={cn(
                      'cursor-pointer relative group flex flex-col items-center justify-center gap-2 h-14 rounded-lg transition-all border-2',
                      selectedTool === tool.id
                        ? 'bg-white border-primary text-primary shadow-xl shadow-primary/5 scale-105 z-10'
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300 hover:shadow-md'
                    )}
                  >
                    <tool.icon className={cn('w-4 h-4 transition-all', selectedTool === tool.id ? 'text-primary scale-110' : 'text-gray-400 group-hover:text-gray-600')} />
                    <span className={cn('text-[9px] font-bold uppercase tracking-tighter transition-all', selectedTool === tool.id ? 'text-primary' : 'opacity-40')}>
                      {tool.shortcut}
                    </span>
                    {selectedTool === tool.id && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full ring-2 ring-white animate-in zoom-in-50" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[10px] font-bold bg-gray-900 text-white border-none px-3 py-1.5 rounded-lg shadow-xl translate-y-2">
                  <div className="flex items-center gap-2">
                    <span>{tool.label}</span>
                    <span className="opacity-50 text-[9px] border border-white/20 px-1 rounded uppercase tracking-tighter font-extrabold">{tool.shortcut}</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-9">
          {/* Recipients Section */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Recipients</h3>
              <span className="text-[10px] font-extrabold text-primary bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full">
                {signersAssignedToFields.length}
              </span>
            </div>

            {signersAssignedToFields.length === 0 ? (
              <div className="p-5 rounded-2xl bg-gray-50/50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 py-8 group hover:bg-gray-50 transition-colors">
                <Plus className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest text-center">No recipients yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {signersAssignedToFields.map((signer, index) => {
                  const initials = (signer.name || signer.email)
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2);

                  return (
                    <div
                      key={signer.email}
                      className="group relative flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all cursor-default"
                    >
                      <Avatar className="h-9 w-9 rounded-xl border-2 border-white shadow-sm ring-1 ring-gray-100">
                        <AvatarFallback className={cn(
                          "bg-gradient-to-br text-[10px] font-bold text-white uppercase tracking-widest border-none",
                          gradients[index % gradients.length]
                        )}>
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate tracking-tight">
                          {signer.name || signer.email}
                        </p>
                        {signer.name && signer.name !== signer.email && (
                          <p className="text-[10px] text-gray-400 font-bold truncate tracking-tight uppercase opacity-70">{signer.email}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Placed Fields Section */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-gray-400">Document Fields</h3>
              <span className="text-[10px] font-extrabold text-gray-900 bg-gray-50 border border-gray-100 px-2.5 py-0.5 rounded-full">
                {activeFields.length}
              </span>
            </div>

            {activeFields.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-10 rounded-[2rem] bg-gray-50/50 border-2 border-dashed border-gray-200 transition-all hover:bg-gray-100/50 group">
                <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-4 border border-gray-100 group-hover:scale-110 transition-transform">
                  <Plus className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-center">Place your first field</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeFields.map((field: SignatureFieldData) => (
                  <div
                    key={field.id}
                    onClick={() => handleFieldClick(field)}
                    className={cn(
                      'group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none',
                      selectedFieldId === field.id
                        ? 'bg-primary/5 border-primary shadow-[0_8px_25px_-5px_rgba(var(--primary),0.1)] ring-1 ring-primary/10'
                        : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
                    )}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-[12px] transition-all shadow-sm",
                        selectedFieldId === field.id
                          ? "bg-primary text-white scale-105"
                          : "bg-gray-50 text-gray-400 group-hover:text-gray-900 border border-gray-100 group-hover:border-gray-200"
                      )}>
                        {getFieldIcon(field.fieldType)}
                      </div>
                      <div className="min-w-0">
                        <p className={cn(
                          "text-[11px] font-bold truncate uppercase tracking-tight",
                          selectedFieldId === field.id ? "text-primary" : "text-gray-900"
                        )}>
                          {field.label || field.fieldType}
                        </p>
                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-0.5 opacity-60">
                          Page {field.page}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSignatureFieldInStore(field.id);
                        if (selectedFieldId === field.id) setSelectedFieldId('');
                      }}
                      className="h-7 w-7 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:text-red-500 hover:border-red-100 scale-90 group-hover:scale-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    {selectedFieldId === field.id && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary rounded-r-full" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </ScrollArea>

      <div className="p-6 bg-white/80 backdrop-blur-md border-t border-gray-100 flex items-center justify-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-center">
          Pro Editor Active
        </p>
      </div>
    </aside>
  );
}