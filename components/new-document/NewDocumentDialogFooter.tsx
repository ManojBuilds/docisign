"use client";

import { FC, memo } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, Upload } from 'lucide-react';
import { useSignersStore } from '@/stores/signersStore';

interface NewDocumentDialogFooterProps {
    CloseComponent: React.ComponentType<any>;
    handleUpload: () => void;
    file: File | null;
    isUploading: boolean;
}

export const NewDocumentDialogFooter: FC<NewDocumentDialogFooterProps> = memo(({
    CloseComponent,
    handleUpload,
    file,
    isUploading,
}) => {
    const { signers } = useSignersStore();
    const hasFile = !!file;

    return (
        <div className="flex gap-3 w-full pt-2">
            <CloseComponent asChild>
                <Button variant="ghost" disabled={isUploading} className="flex-1 rounded-lg font-semibold text-gray-600">
                    Dismiss
                </Button>
            </CloseComponent>
            <Button
                onClick={handleUpload}
                disabled={!file || signers.length === 0 || isUploading}
                className={cn(
                    "flex-[2] rounded-lg font-bold shadow-2xl shadow-blue-500/20",
                    isUploading ? "bg-gray-100 text-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
                )}
            >
                {isUploading ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Almost there...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        <span>{hasFile ? 'Upload & Design' : 'Upload Document'}</span>
                    </div>
                )}
            </Button>
        </div>
    );
});

NewDocumentDialogFooter.displayName = 'NewDocumentDialogFooter';
