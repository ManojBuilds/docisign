"use client";

import { useEffect, useState } from "react";
import mammoth from "mammoth";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface WordViewerProps {
    fileUrl: string;
    className?: string;
}

export function WordViewer({ fileUrl, className }: WordViewerProps) {
    const [html, setHtml] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadWordFile() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error("Failed to fetch document");

                const arrayBuffer = await response.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                setHtml(result.value);
            } catch (err) {
                console.error("Error loading word file:", err);
                setError("Failed to render the document. You can still download it using the buttons below.");
            } finally {
                setLoading(false);
            }
        }

        if (fileUrl) {
            loadWordFile();
        }
    }, [fileUrl]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-slate-50 rounded-3xl border border-slate-100">
                <Loader2 className="size-8 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Preparing document preview...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="rounded-2xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className={`bg-white border overflow-hidden ${className}`}>
            <div className="p-8 md:p-12 prose prose-slate max-w-none
        prose-headings:font-primary prose-headings:font-black prose-headings:tracking-tight
        prose-p:leading-relaxed prose-p:text-slate-700
        prose-strong:text-slate-900
        prose-table:border prose-table:border-slate-200 prose-td:p-2 prose-th:p-2 prose-th:bg-slate-50"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
