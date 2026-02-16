"use client"

import { Button } from '@/components/ui/button'
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/responsive-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { api } from '@/convex/_generated/api'
import { computeFileHash } from '@/lib/crypto'
import { cn, PENDING_DOC_KEY } from '@/lib/utils'
import { useSignersStore } from '@/stores/signersStore'
import { useClerk } from '@clerk/nextjs'
import { useAction, useMutation, useQuery } from 'convex/react'
import { FileText, Loader2, Upload, X } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react'
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { z } from 'zod'
import { TrialGate } from './TrialGate'
import { useMobile } from '@/hooks/useMobile'

interface NewDocumentDialogProps {
  children?: ReactNode;
  initialFile?: File | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
// Props for UploadContent
interface UploadContentProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  isMobile: boolean;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  isUploading: boolean;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  uploadProgress: number;
  statusMessage: string;
  currentEmail: string;
  setCurrentEmail: Dispatch<SetStateAction<string>>;
  handleAddEmail: () => void;
  hasFile: boolean;
}

const UploadContent: FC<UploadContentProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  isMobile,
  file,
  setFile,
  isUploading,
  setTitle,
  uploadProgress,
  statusMessage,
  currentEmail,
  setCurrentEmail,
  handleAddEmail,
  hasFile,
}) => {
  const { signers, removeSigner } = useSignersStore();

  return (
    <div className="p-2 md:p-4 space-y-6">
      {/* File Upload Section */}
      <div>
        {!file ? (
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
                PDF or Word up to 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate leading-tight mb-1">
                  {file.name}
                </p>
                <span className="text-xs text-gray-500 font-medium">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0 h-8 w-8"
                onClick={() => { setFile(null); setTitle(''); }}
                disabled={isUploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="title" className="text-[13px] font-semibold text-gray-700 ml-1">Document Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="How should we name this?"
                disabled={isUploading}
                className="h-11 rounded-xl bg-white border-gray-200 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div> */}
          </div>
        )}
      </div>

      {/* Signers Section */}
      {hasFile && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider">Recipients</Label>
            <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Optional</span>
          </div>
          <p className="text-[13px] text-gray-500 font-medium">Add people who need to sign this document, or skip to add them later.</p>

          <div className="flex gap-2 p-1.5 bg-gray-50 rounded-xl border border-gray-300 focus-within:border-blue-300 focus-within:bg-white transition-colors duration-150">
            <Input
              type="email"
              placeholder="Enter email address"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddEmail();
                }
              }}
              className="border-none bg-transparent shadow-none focus-visible:ring-0 h-10"
              disabled={isUploading}
            />
            <Button
              type="button"
              onClick={handleAddEmail}
              size="sm"
              disabled={isUploading || !currentEmail.trim()}
              className="rounded-lg h-auto px-4 bg-gray-900 hover:bg-black text-white"
            >
              Add
            </Button>
          </div>

          {/* Signer Avatars/List */}
          {signers.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {signers.map((signer, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white border border-gray-100 pl-1.5 pr-3 py-1.5 rounded-full shadow-sm"
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shadow-sm",
                    index % 5 === 0 ? 'bg-indigo-500' :
                      index % 5 === 1 ? 'bg-rose-500' :
                        index % 5 === 2 ? 'bg-emerald-500' :
                          index % 5 === 3 ? 'bg-amber-500' :
                            'bg-sky-500'
                  )}>
                    {signer.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[13px] font-semibold text-gray-700">{signer.email}</span>
                  <button
                    type="button"
                    onClick={() => removeSigner(signer.email)}
                    disabled={isUploading}
                    className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload State Overlay */}
      {isUploading && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13px] font-semibold text-gray-900">
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
      )}
    </div>
  );
};

const UploadFooter: FC<{
  handleUpload: () => void;
  file: File | null;
  isUploading: boolean;
  hasFile: boolean;
}> = ({
  handleUpload,
  file,
  isUploading,
  hasFile,
}) => {

    return (
      <div className="flex gap-3 w-full p-2">
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={cn(
            "flex-[2] rounded-lg font-semibold",
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
  };


export function NewDocumentDialog({
  children,
  initialFile,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: NewDocumentDialogProps) {
  const { user, redirectToSignIn } = useClerk()
  const router = useRouter()
  const isMobile = useMobile()

  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;
  const onOpenChange = controlledOnOpenChange || setUncontrolledIsOpen;

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [currentEmail, setCurrentEmail] = useState('')

  const { signers, addEmail, clearSigners } = useSignersStore();

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
      if (!title) {
        setTitle(initialFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  }, [initialFile, title]);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const createDocument = useMutation(api.documents.createDocument)
  const docToPdf = useAction(api.conversion.docToPdfConversion)
  const canCreate = useQuery(
    api.users.canCreateDocument,
    user ? { clerkId: user.id } : "skip"
  );

  const emailSchema = z.email();

  const handleAddEmail = () => {
    if (currentEmail.trim()) {
      try {
        emailSchema.parse(currentEmail.trim());
        addEmail(currentEmail.trim());
        setCurrentEmail('');
      } catch {
        toast.error('Please enter a valid email address');
      }
    }
  };

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      toast.error('File exceeds 10MB limit or is invalid type');
      return;
    }

    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''))
      }
    }
  }, [title, setTitle])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024,
  })



  async function handleAnonymousUpload() {
    if (!file) return;
    setIsUploading(true);
    setStatusMessage('Preparing...');
    setUploadProgress(0);

    try {
      const originalName = file.name;
      const fileData = await file.arrayBuffer();
      setUploadProgress(20);

      // Start hashing and upload/conversion in parallel
      const hashPromise = computeFileHash(fileData);

      let uploadAction: Promise<{ storageId: string; size: number }>;

      if (file.type !== 'application/pdf') {
        setStatusMessage('Converting & Hashing...');
        uploadAction = docToPdf({ fileData });
      } else {
        setStatusMessage('Uploading & Hashing...');
        uploadAction = (async () => {
          const uploadUrl = await generateUploadUrl();
          const res = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/pdf' },
            body: fileData,
          });
          if (!res.ok) throw new Error('Upload failed');
          const { storageId } = await res.json();
          return { storageId, size: file.size };
        })();
      }

      const [documentHash, { storageId: uploadStorageId, size: finalFileSize }] = await Promise.all([
        hashPromise,
        uploadAction
      ]);

      setUploadProgress(80);

      localStorage.setItem(
        PENDING_DOC_KEY,
        JSON.stringify({
          storageId: uploadStorageId,
          originalFileName: originalName,
          fileSizeBytes: finalFileSize,
          fileType: 'pdf',
          title: title || originalName.replace(/\.[^/.]+$/, ''),
          documentHash,
          signers: signers.map(s => s.email),
          createdAt: Date.now(),
        })
      );
      setUploadProgress(100);
      resetDialog();
      redirectToSignIn();
      handleOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
    }
  }

  async function handleAuthenticatedUpload() {
    if (!file || !user) return;
    const documentTitle = title.trim() || file.name.replace(/\.[^/.]+$/, '');
    setIsUploading(true);
    setUploadProgress(0);
    setStatusMessage('Preparing...');

    try {
      const originalName = file.name;
      const fileData = await file.arrayBuffer();
      setUploadProgress(20);

      // Start hashing and upload/conversion in parallel
      const hashPromise = computeFileHash(fileData);

      let uploadAction: Promise<{ storageId: string; size: number }>;

      if (file.type !== 'application/pdf') {
        setStatusMessage('Converting & Hashing...');
        uploadAction = docToPdf({ fileData });
      } else {
        setStatusMessage('Uploading & Hashing...');
        uploadAction = (async () => {
          const uploadUrl = await generateUploadUrl();
          const storageResult = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/pdf' },
            body: fileData,
          });

          if (!storageResult.ok) throw new Error('Upload failed');
          const { storageId } = await storageResult.json();
          return { storageId, size: file.size };
        })();
      }

      // Wait for both hashing and upload/conversion to complete
      const [documentHash, { storageId: uploadStorageId, size: finalFileSize }] = await Promise.all([
        hashPromise,
        uploadAction
      ]);

      setUploadProgress(80);
      setStatusMessage('Finalizing...');

      const documentId = await createDocument({
        title: documentTitle,
        originalFileName: originalName,
        fileStorageId: uploadStorageId as any,
        fileType: 'pdf',
        fileSizeBytes: finalFileSize,
        ownerId: user.id,
        pageCount: 1,
        documentHash,
      });

      setUploadProgress(100);
      toast.success('Opening the editor for you...');

      const emails = signers.map(s => encodeURIComponent(s.email)).join(',');
      const url = emails ? `/d/${documentId}/edit?clientEmails=${emails}` : `/d/${documentId}/edit`;
      resetDialog();
      router.push(url);
      handleOpenChange(false);
    } catch (error) {
      console.error(error)
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
    }
  }


  const handleUpload = async () => {
    if (!file) return;

    // If there's an email in the input, try to add it before uploading
    if (currentEmail.trim()) {
      try {
        emailSchema.parse(currentEmail.trim());
        addEmail(currentEmail.trim());
        setCurrentEmail("");
      } catch {
        // Just ignore invalid email and proceed with upload if they click upload directly
      }
    }

    if (!user) {
      await handleAnonymousUpload();
      return;
    }

    if (!canCreate) {
      toast.error("Your trial has expired. Please upgrade to continue using the app");
      return;
    }
    await handleAuthenticatedUpload();

  };

  const resetDialog = () => {
    setFile(null);
    setTitle('');
    setCurrentEmail('');
    setUploadProgress(0);
    setStatusMessage('');
    setIsUploading(false);
    clearSigners();
  }

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) resetDialog();
  };

  const content = (
    <UploadContent
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      isMobile={isMobile}
      file={file}
      setFile={setFile}
      isUploading={isUploading}
      title={title}
      setTitle={setTitle}
      uploadProgress={uploadProgress}
      statusMessage={statusMessage}
      currentEmail={currentEmail}
      setCurrentEmail={setCurrentEmail}
      handleAddEmail={handleAddEmail}
      hasFile={!!file}
    />
  );

  const footer = (
    <UploadFooter
      handleUpload={handleUpload}
      file={file}
      isUploading={isUploading}
      hasFile={!!file}
    />
  );

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <ResponsiveDialogTrigger asChild>
        {children}
      </ResponsiveDialogTrigger>}
      <ResponsiveDialogContent className="sm:max-w-[580px] border-none overflow-hidden">
        <ResponsiveDialogHeader className="mb-2">
          <ResponsiveDialogTitle className="text-2xl font-semibold tracking-tight">Upload Document</ResponsiveDialogTitle>
          <p className="text-sm">Prepare your file for secure electronic signing.</p>
        </ResponsiveDialogHeader>
        <TrialGate>
          <div className="relative">
            {content}
          </div>
          <ResponsiveDialogFooter className="mt-4 pt-4 border-t border-gray-50 sm:justify-start">
            {footer}
          </ResponsiveDialogFooter>
        </TrialGate>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
