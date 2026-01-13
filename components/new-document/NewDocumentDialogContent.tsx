"use client";

import { FC, memo } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { useMobile } from '@/hooks/useMobile';
import { FileUpload } from './FileUpload';
import { RecipientForm } from './RecipientForm';
import { SignersList } from './SignersList';
import { UploadStatus } from './UploadStatus';
import { Dispatch, SetStateAction } from 'react';

interface NewDocumentDialogContentProps {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
    isDragActive: boolean;
    file: File | null;
    onRemoveFile: () => void;
    isUploading: boolean;
    uploadProgress: number;
    statusMessage: string;
    currentEmail: string;
    setCurrentEmail: Dispatch<SetStateAction<string>>;
    handleAddEmail: () => void;
}

export const NewDocumentDialogContent: FC<NewDocumentDialogContentProps> = memo(({
    getRootProps,
    getInputProps,
    isDragActive,
    file,
    onRemoveFile,
    isUploading,
    uploadProgress,
    statusMessage,
    currentEmail,
    setCurrentEmail,
    handleAddEmail,
}) => {
    const isMobile = useMobile();
    const hasFile = !!file;

    return (
        <div className="space-y-6">
            <FileUpload
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                isMobile={isMobile}
                file={file}
                onRemove={onRemoveFile}
                isUploading={isUploading}
            />

            {hasFile && (
                <div className="space-y-4">
                    <RecipientForm
                        currentEmail={currentEmail}
                        setCurrentEmail={setCurrentEmail}
                        handleAddEmail={handleAddEmail}
                        isUploading={isUploading}
                    />
                    <SignersList isUploading={isUploading} />
                </div>
            )}

            <UploadStatus
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                statusMessage={statusMessage}
            />
        </div>
    );
});

NewDocumentDialogContent.displayName = 'NewDocumentDialogContent';
