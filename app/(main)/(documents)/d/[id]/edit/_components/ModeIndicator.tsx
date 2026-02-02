"use client";

import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { ALargeSmall, CalendarDays, PenTool, TextCursor } from "lucide-react";
import { memo } from "react";

export const ModeIndicator = memo(() => {
    const selectedTool = useDocumentEditorStore((state) => state.selectedTool);

    if (selectedTool === "selection") return null;

    return (
        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
            <div className="bg-gray-900/90 text-white backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/20">
                <div className="flex items-center gap-2.5">
                    {selectedTool === 'signature' && (
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50">
                                <PenTool className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-100">Signature</span>
                        </div>
                    )}
                    {selectedTool === 'initial' && (
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/50">
                                <TextCursor className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-100">Initial</span>
                        </div>
                    )}
                    {selectedTool === 'date' && (
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50">
                                <CalendarDays className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100">Date</span>
                        </div>
                    )}
                    {selectedTool === 'text' && (
                        <div className="flex items-center gap-2">
                            <div className="p-1 rounded-full bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/50">
                                <ALargeSmall className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-100">Text</span>
                        </div>
                    )}
                </div>
                <div className="h-4 w-[1px] bg-white/10" />
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-white/40 uppercase tracking-wide">Press</span>
                    <kbd className="bg-white/10 border border-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-white/80 shadow-[0_2px_0_rgba(255,255,255,0.1)]">Esc</kbd>
                    <span className="text-[10px] font-medium text-white/40 uppercase tracking-wide">to cancel</span>
                </div>
            </div>
        </div>
    );
});

ModeIndicator.displayName = "ModeIndicator";
