"use client";

import { FC, memo } from 'react';
import { Loader2 } from 'lucide-react';

interface UploadStatusProps {
    isUploading: boolean;
    uploadProgress: number;
    statusMessage: string;
}

export const UploadStatus: FC<UploadStatusProps> = memo(({
    isUploading,
    uploadProgress,
    statusMessage,
}) => {
    if (!isUploading) {
        return null;
    }

    return (
        <div className="space-y-4 pt-2">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[13px] font-bold text-gray-900">
                    <span className="flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                        {statusMessage || 'Processing document...'}
                    </span>
                    <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
            </div>
        </div>
    );
});

UploadStatus.displayName = 'UploadStatus';
