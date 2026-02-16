"use client";

import { useDocumentEditorStore } from "@/stores/document-editor-store";
import { FIELDS } from "@/components/fields/field-types";
import { cn } from "@/lib/utils";
import { memo } from "react";

export const ModeIndicator = memo(() => {
    const selectedTool = useDocumentEditorStore((state) => state.selectedTool);

    if (selectedTool === "selection") return null;

    // Find the field configuration for the selected tool
    const fieldConfig = FIELDS.find(field => field.id === selectedTool);

    if (!fieldConfig) return null;

    // Map field types to their Tailwind classes (must be complete strings for Tailwind to detect)
    const getFieldColors = (fieldType: string) => {
        switch (fieldType) {
            case 'signature':
                return {
                    text: 'text-blue-100',
                    bg: 'bg-blue-500/20',
                    ring: 'ring-blue-500/50'
                };
            case 'initials':
                return {
                    text: 'text-purple-100',
                    bg: 'bg-purple-500/20',
                    ring: 'ring-purple-500/50'
                };
            case 'date':
                return {
                    text: 'text-green-100',
                    bg: 'bg-green-500/20',
                    ring: 'ring-green-500/50'
                };
            case 'text':
                return {
                    text: 'text-amber-100',
                    bg: 'bg-amber-500/20',
                    ring: 'ring-amber-500/50'
                };
            case 'checkbox':
                return {
                    text: 'text-pink-100',
                    bg: 'bg-pink-500/20',
                    ring: 'ring-pink-500/50'
                };
            default:
                return {
                    text: 'text-blue-100',
                    bg: 'bg-blue-500/20',
                    ring: 'ring-blue-500/50'
                };
        }
    };

    const colors = getFieldColors(selectedTool);

    return (
        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
            <div className="bg-gray-900/90 text-white backdrop-blur-md px-4 py-2 rounded-full shadow-2xl border border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/20">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-2">
                        <div className={cn("p-1 rounded-full ring-1", colors.bg, colors.ring)}>
                            <fieldConfig.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className={cn("text-[11px] font-bold uppercase tracking-wider", colors.text)}>
                            {fieldConfig.label}
                        </span>
                    </div>
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
