"use client";

import { VariableDialog } from "@/components/templates/VariableDialog";
import { Button } from "@/components/ui/button";
import { useTemplateUpload } from "@/hooks/useTemplateUpload";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

interface TemplateActionButtonProps {
    templateId: string;
    templateTitle: string;
    className?: string;
    buttonText?: string;
}

export function TemplateActionButton({
    templateId,
    templateTitle,
    className,
    buttonText = "Customize & Sign Document",
}: TemplateActionButtonProps) {
    const {
        isUploading,
        uploadProgress,
        handleQuickStart,
        showVariableDialog,
        setShowVariableDialog,
        handleVariableSubmit,
        statusMessage,
    } = useTemplateUpload({
        templateId,
        templateTitle,
    });

    return (
        <>
            <div className={cn("space-y-3", className)}>
                <Button
                    onClick={handleQuickStart}
                    disabled={isUploading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base shadow-lg transition-all disabled:opacity-50"
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center mb-0.5">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                <span className="text-sm font-semibold">{statusMessage || "Processing..."}</span>
                            </div>
                            <span className="text-[10px] font-medium opacity-80">{uploadProgress}% Complete</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Sparkles className="size-4" />
                            {buttonText}
                        </div>
                    )}
                </Button>
            </div>

            <VariableDialog
                open={showVariableDialog}
                onOpenChange={setShowVariableDialog}
                templateId={templateId}
                onSubmit={handleVariableSubmit}
                isProcessing={isUploading}
                statusMessage={statusMessage}
            />
        </>
    );
}
