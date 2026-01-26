"use client";

import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const NewDocumentDialog = dynamic(() => import("@/components/NewDocumentDialog").then(m => m.NewDocumentDialog), {
  ssr: false,
});

export function DragAndClickUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      toast.error("Only PDF or Word files up to 10MB are allowed");
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setIsOpen(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
      ],
    },
    maxSize: 10 * 1024 * 1024,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-56",
          "border-2 border-dashed rounded-2xl cursor-pointer",
          "bg-gray-50/60 transition-all duration-200",
          "group",
          isDragActive
            ? "border-primary bg-primary/10 ring-4 ring-primary/20 scale-[1.02]"
            : "border-primary hover:bg-gray-100/60"
        )}
        role="button"
        tabIndex={0}
      >
        <label htmlFor="file-upload-input" className="sr-only" id="file-upload-label">
          Upload PDF or Word document
        </label>
        <input
          {...getInputProps()}
          id="file-upload-input"
        />

        {/* Drag overlay */}
        {isDragActive && (
          <div className="absolute inset-0 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center z-10">
            <p className="text-lg font-semibold text-primary">
              Drop file to upload
            </p>
          </div>
        )}

        <div className="flex flex-col items-center justify-center text-center px-6">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
              "bg-white shadow-sm border border-gray-100",
              "transition-transform duration-200",
              isDragActive
                ? "scale-110"
                : "group-hover:scale-105"
            )}
          >
            <Upload className="w-7 h-7 text-gray-700" />
          </div>

          <p className="text-base font-semibold text-gray-900 mb-1">
            Drag & drop your contract here
          </p>

          <p className="text-sm text-gray-500">
            or click to upload · PDF or Word up to 10MB
          </p>
        </div>
      </div>

      <NewDocumentDialog
        initialFile={file}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
