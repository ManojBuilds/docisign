"use client";

import { useState, useCallback, useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'nextjs-toploader/app';
import { useMutation, useQuery } from 'convex/react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { toast } from 'sonner';
import { z } from 'zod';

import { api } from '@/convex/_generated/api';
import { useSignersStore } from '@/stores/signersStore';
import { PENDING_DOC_KEY } from '@/lib/utils';

async function computeFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface UseNewDocumentUploadProps {
  initialFile?: File | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useNewDocumentUpload({ initialFile, isOpen, onOpenChange }: UseNewDocumentUploadProps) {
  const { user, redirectToSignIn } = useClerk();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');

  const { signers, addEmail, clearSigners } = useSignersStore();

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
      if (!title) {
        setTitle(initialFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  }, [initialFile, isOpen, title]);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createDocument = useMutation(api.documents.createDocument);
  const canCreate = useQuery(
    api.users.canCreateDocument,
    user ? { clerkId: user.id } : "skip"
  );

  const emailSchema = z.email();

  const handleAddEmail = useCallback(() => {
    if (currentEmail.trim()) {
      try {
        emailSchema.parse(currentEmail.trim());
        addEmail(currentEmail.trim());
        setCurrentEmail('');
      } catch {
        toast.error('Please enter a valid email address');
      }
    }
  }, [addEmail, currentEmail, emailSchema]);
  
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      toast.error('File exceeds 10MB limit or is invalid type');
      return;
    }

    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
  });

  const handleAnonymousUpload = useCallback(async () => {
    if (!file) return;
    setIsUploading(true);
    setStatusMessage('Uploading document...');
    setUploadProgress(20);
    try {
      const documentHash = await computeFileHash(file);
      setUploadProgress(40);

      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/pdf' },
        body: file,
      });

      if (!res.ok) throw new Error('Upload failed');
      const { storageId } = await res.json();

      setUploadProgress(70);

      localStorage.setItem(
        PENDING_DOC_KEY,
        JSON.stringify({
          storageId,
          originalFileName: file.name,
          fileSizeBytes: file.size,
          fileType: 'pdf',
          title: title || file.name.replace(/\.[^/.]+$/, ''),
          documentHash,
          signers: signers.map(s => s.email),
          createdAt: Date.now(),
        })
      );
      setUploadProgress(100);
      redirectToSignIn();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
      setIsUploading(false);
    }
  }, [file, generateUploadUrl, onOpenChange, redirectToSignIn, signers, title]);

  const handleAuthenticatedUpload = useCallback(async () => {
    if (!file || !user) return;
    const documentTitle = title.trim() || file.name.replace(/\.[^/.]+$/, '');
    setIsUploading(true);
    setUploadProgress(0);
    setStatusMessage('Preparing...');

    try {
      const originalName = file.name;
      const uploadBlob = file;

      setStatusMessage('Encrypting...');
      const documentHash = await computeFileHash(file);
      setUploadProgress(60);

      const uploadUrl = await generateUploadUrl();
      const storageResult = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/pdf' },
        body: uploadBlob,
      });

      if (!storageResult.ok) throw new Error('Upload failed');
      const { storageId } = await storageResult.json();

      setStatusMessage('Finalizing...');
      setUploadProgress(90);

      const documentId = await createDocument({
        title: documentTitle,
        originalFileName: originalName,
        fileStorageId: storageId,
        fileType: 'pdf',
        fileSizeBytes: uploadBlob.size,
        ownerId: user.id,
        pageCount: 1,
        documentHash,
      });

      setUploadProgress(100);
      toast.success('Ready to design!');

      const emails = signers.map(s => encodeURIComponent(s.email)).join(',');
      router.push(`/d/${documentId}/edit?clientEmails=${emails}`);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
    }
  }, [createDocument, file, generateUploadUrl, onOpenChange, router, signers, title, user]);

  const handleUpload = useCallback(async () => {
    if (!file) return;

    if (!user) {
      await handleAnonymousUpload();
      return;
    }

    if (!canCreate) {
      toast.error("Your trial has expired. Please upgrade to continue using the app");
      return;
    }
    await handleAuthenticatedUpload();
  }, [canCreate, file, handleAnonymousUpload, handleAuthenticatedUpload, user]);

  const resetDialog = useCallback(() => {
    setFile(null);
    setTitle('');
    setCurrentEmail('');
    setUploadProgress(0);
    setStatusMessage('');
    setIsUploading(false);
    clearSigners();
  }, [clearSigners]);
  
  const handleRemoveFile = useCallback(() => {
      setFile(null);
      setTitle('');
  }, [])

  return {
    file,
    isUploading,
    uploadProgress,
    statusMessage,
    currentEmail,
    setCurrentEmail,
    handleAddEmail,
    getRootProps,
    getInputProps,
    isDragActive,
    handleUpload,
    resetDialog,
    handleRemoveFile
  };
}
