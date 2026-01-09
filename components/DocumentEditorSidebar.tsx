'use client';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useDocumentEditorStore } from '@/stores/document-editor-store';
import {
    ALargeSmall,
    CalendarDays,
    Info,
    MousePointer2,
    PenTool,
    TextCursor,
} from 'lucide-react';
import { Button } from './ui/button';

export function DocumentEditorSidebar() {
  const { selectedTool, setSelectedTool } = useDocumentEditorStore();

  const tools = [
    { id: 'selection', icon: MousePointer2, label: 'Move & Edit', shortcut: 'V' },
    { id: 'signature', icon: PenTool, label: 'Add Signature', shortcut: 'S' },
    { id: 'initial', icon: TextCursor, label: 'Add Initial', shortcut: 'I' },
    { id: 'date', icon: CalendarDays, label: 'Add Date', shortcut: 'D' },
    { id: 'text', icon: ALargeSmall, label: 'Add Text', shortcut: 'T' },
  ] as const;

  return (
    <aside className="w-16 bg-white border-r flex flex-col items-center py-6 h-full shadow-sm z-10">
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col gap-4">
          {tools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === tool.id ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setSelectedTool(tool.id)}
                  className={cn(
                    "w-10 h-12 rounded-xl flex flex-col items-center justify-center gap-1",
                    selectedTool === tool.id
                      ? "shadow-blue-200 shadow-lg"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <tool.icon className={cn(
                    "w-5 h-5",
                    selectedTool === tool.id ? "text-primary-foreground" : "text-gray-600"
                  )} />
                  <span className={cn(
                    "text-[9px] font-bold font-mono px-1 rounded-sm border",
                    selectedTool === tool.id
                      ? "bg-white/20 border-white/30 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  )}>
                    {tool.shortcut}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={12}
                className="bg-gray-900 text-white font-medium px-3 py-1.5 text-[11px] flex items-center gap-2 border-none shadow-2xl rounded-lg"
              >
                {tool.label}
                <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded bg-white/10 px-1 font-mono text-[9px] font-medium text-white/60 border-none">
                  {tool.shortcut}
                </kbd>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="mt-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-3 text-gray-400 hover:text-blue-500 cursor-help group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-transparent group-hover:border-blue-100 group-hover:bg-blue-50">
                  <Info className="w-5 h-5" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              sideOffset={16}
              className="max-w-[200px] bg-gray-900 text-white border-none shadow-2xl p-4 rounded-xl"
            >
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Pro Tip</p>
                <p className="text-[11px] leading-relaxed text-white/80 font-medium">
                  Select a tool and click or drag on the document to place fields exactly where you want them.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </aside>
  );
}