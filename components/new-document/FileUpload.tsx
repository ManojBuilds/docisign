"use client";

import { FC, memo } from 'react';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import { FileText, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
    isMobile: boolean;
    file: File | null;
    onRemove: () => void;
    isUploading: boolean;
}

export const FileUpload: FC<FileUploadProps> = memo(({
    getRootProps,
    getInputProps,
    isDragActive,
    isMobile,
    file,
    onRemove,
    isUploading
}) => {
    if (!file) {
        return (
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center w-full",
                    isMobile ? 'h-40' : 'h-52',
                    "border-2 border-dashed rounded-xl cursor-pointer bg-gray-50/50",
                    isDragActive
                        ? "border-blue-500 bg-blue-50/50 ring-4 ring-blue-500/10"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-100/50"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center px-6">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                        <Upload className="w-6 h-6 text-gray-600" />
                    </div>
                    <p className="text-[15px] font-medium text-gray-900 mb-1">
                        {isDragActive ? 'Drop to start' : 'Upload your document'}
                    </p>
                    <p className="text-sm text-gray-500">
                        PDF up to 10MB
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm group">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-gray-900 truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[13px] text-gray-500 font-medium">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                    onClick={onRemove}
                    disabled={isUploading}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
});

FileUpload.displayName = 'FileUpload';
