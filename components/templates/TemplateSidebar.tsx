"use client";

import { VariableDialog } from "@/components/templates/VariableDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTemplateUpload } from "@/hooks/useTemplateUpload";
import { getTemplateConfig } from "@/lib/template-variables";
import { cn } from "@/lib/utils";
import { Check, Download, FileCode, FileSignature, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface TemplateSidebarProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  features?: string[];
  stats?: { label: string; value: string }[];
  className?: string;
  templateId?: string; // Optional: ID of template to load
  templateTitle?: string; // Optional: Default title for the document created from template
}

export function TemplateSidebar({
  title,
  subtitle,
  buttonText = "Use this Template",
  buttonLink = "/dashboard",
  features,
  stats,
  className,
  templateId,
  templateTitle,
}: TemplateSidebarProps) {
  // Use template upload hook if templateId is provided
  const {
    isUploading,
    uploadProgress,
    handleQuickStart,
    showVariableDialog,
    setShowVariableDialog,
    handleVariableSubmit,
    statusMessage,
  } = useTemplateUpload({
    templateId: templateId || "",
    templateTitle: templateTitle || title,
  });

  const isTemplateMode = !!templateId;
  const templateConfig = templateId ? getTemplateConfig(templateId) : null;
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!templateConfig?.fileUrl) return;

    setIsDownloading(true);
    try {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(templateConfig.fileUrl)}&filename=${templateId}.docx`
      );

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${templateId}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Word document download started");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download template");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={cn("sticky top-24", className)}>
      {/* Adobe-Sign inspired Clean Card */}
      <Card className="relative bg-white rounded-xl border-0 ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {/* Minimal Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 border border-blue-100">
            <FileSignature className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-slate-500">
            {subtitle}
          </p>
        </div>

        <CardContent className="px-6 pb-8 pt-2">
          {/* Variant A: Features List (Checkmarks) */}
          {features && (
            <ul className="space-y-3 mb-8 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-medium leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Variant B: Stats List (Rows) */}
          {stats && (
            <div className="space-y-0 mb-8 border-t border-slate-100">
              {stats.map((stat, i) => (
                <div key={i} className="flex justify-between items-center text-sm py-3 border-b border-slate-100 px-1">
                  <span className="text-slate-500 font-medium">{stat.label}</span>
                  <span className="font-semibold text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {isTemplateMode ? (
            <div className="space-y-3">
              <Button
                onClick={handleQuickStart}
                disabled={isUploading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base shadow-none transition-all disabled:opacity-50"
              >
                {isUploading ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center mb-0.5">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span className="text-sm font-bold">{statusMessage || "Processing..."}</span>
                    </div>
                    <span className="text-[10px] font-medium opacity-80">{uploadProgress}% Complete</span>
                  </div>
                ) : (
                  buttonText
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full h-14 border-slate-200 hover:bg-slate-50 hover:border-blue-200 text-slate-700 rounded-xl px-4 flex items-center justify-start gap-4 transition-all group shadow-sm bg-white"
              >
                {isDownloading ? (
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors border border-blue-100">
                    <FileCode className="w-5 h-5" />
                  </div>
                )}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-slate-900 leading-tight">
                    {isDownloading ? "Downloading..." : "Microsoft Word"}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 leading-tight mt-0.5">
                    Edit and customize locally
                  </span>
                </div>
                {!isDownloading && (
                  <Download className="w-4 h-4 ml-auto text-slate-300 group-hover:text-blue-500 transition-colors" />
                )}
              </Button>
            </div>
          ) : (
            <Button asChild className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base shadow-none transition-all">
              <Link href={buttonLink}>
                {buttonText}
              </Link>
            </Button>
          )}

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <Shield className="w-3 h-3" />
            <span>Secure & Enforceable</span>
          </div>
        </CardContent>
      </Card>

      {/* Trust Badge below */}
      <div className="mt-6 flex justify-center gap-6 grayscale opacity-60 hover:opacity-100 transition-opacity">
        {/* Placeholder for trust logos if needed, currently just empty or simple text */}
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Trusted by 10,000+ Signers</span>
      </div>

      {/* Variable Dialog */}
      {templateId && (
        <VariableDialog
          open={showVariableDialog}
          onOpenChange={setShowVariableDialog}
          templateId={templateId}
          onSubmit={handleVariableSubmit}
          isProcessing={isUploading}
          statusMessage={statusMessage}
        />
      )}
    </div>
  );
}
