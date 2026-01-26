"use client";

import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { ALargeSmall, CalendarDays, PenTool, TextCursor } from "lucide-react";
import { memo } from "react";

export const ModeIndicator = memo(() => {
    const selectedTool = useDocumentEditorStore((state) => state.selectedTool);

    if (selectedTool === "selection") return null;

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
            <div className="bg-gray-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2">
                    {selectedTool === 'signature' && <PenTool className="w-3.5 h-3.5 text-blue-400" />}
                    {selectedTool === 'initial' && <TextCursor className="w-3.5 h-3.5 text-purple-400" />}
                    {selectedTool === 'date' && <CalendarDays className="w-3.5 h-3.5 text-emerald-400" />}
                    {selectedTool === 'text' && <ALargeSmall className="w-3.5 h-3.5 text-orange-400" />}
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                        {selectedTool} Mode
                    </span>
                </div>
                <div className="h-3 w-[1px] bg-white/20" />
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-white/50">Press</span>
                    <kbd className="bg-white/10 border border-white/20 px-1 rounded text-[9px] font-mono">V</kbd>
                    <span className="text-[10px] text-white/50">to exit</span>
                </div>
            </div>
        </div>
    );
});

ModeIndicator.displayName = "ModeIndicator";
