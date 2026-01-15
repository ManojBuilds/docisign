"use client";

import { api } from '@/convex/_generated/api';
import { computeFileHash } from '@/lib/crypto';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Helper to convert Base64 to Blob
function base64ToBlob(base64: string, type: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: type });
}



export function PendingDocumentProcessor() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const createDocument = useMutation(api.documents.createDocument);

    useEffect(() => {
        if (!isLoaded || !user || isProcessing) return;

        const pendingDocumentJSON = localStorage.getItem('pendingDocument');
        if (pendingDocumentJSON) {
            setIsProcessing(true);
            const pendingDocument = JSON.parse(pendingDocumentJSON);

            const handlePendingUpload = async () => {
                toast.info('Processing your pending document...');
                try {
                    const uploadBlob = base64ToBlob(pendingDocument.file, pendingDocument.type);

                    const documentHash = await computeFileHash(uploadBlob);

                    const uploadUrl = await generateUploadUrl();
                    const storageResult = await fetch(uploadUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': pendingDocument.type },
                        body: uploadBlob,
                    });

                    if (!storageResult.ok) throw new Error('Upload failed');
                    const { storageId } = await storageResult.json();

                    const documentId = await createDocument({
                        title: pendingDocument.title,
                        originalFileName: pendingDocument.name,
                        fileStorageId: storageId,
                        fileType: 'pdf',
                        fileSizeBytes: uploadBlob.size,
                        ownerId: user.id,
                        pageCount: 1,
                        documentHash,
                    });

                    localStorage.removeItem('pendingDocument');
                    toast.success('Document created successfully!');

                    const emails = pendingDocument.signers.map((s: string) => encodeURIComponent(s)).join(',');
                    router.push(`/d/${documentId}/edit?clientEmails=${emails}`);
                } catch (error) {
                    console.error("Failed to process pending document:", error);
                    toast.error('Failed to upload pending document. Please try again.');
                } finally {
                    setIsProcessing(false);
                }
            };

            handlePendingUpload();
        }
    }, [user, isLoaded, isProcessing, router, generateUploadUrl, createDocument]);

    return null;
}
