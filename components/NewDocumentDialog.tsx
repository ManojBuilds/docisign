"use client"

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/convex/_generated/api'
import { useMobile } from '@/hooks/useMobile'
import { cn, PENDING_DOC_KEY } from '@/lib/utils'
import { useSignersStore } from '@/stores/signersStore'
import { useClerk } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react'
import { FileText, Loader2, Upload, X } from 'lucide-react'
import { useRouter } from 'nextjs-toploader/app'
import { Dispatch, FC, ReactNode, SetStateAction, useCallback, useEffect, useState } from 'react'
import { DropzoneInputProps, DropzoneRootProps, useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { z } from 'zod'
import { TrialGate } from './TrialGate'

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
  uploadProgress,
  statusMessage,
  currentEmail,
  setCurrentEmail,
  handleAddEmail,
  hasFile,
}) => {
  const { signers, removeSigner } = useSignersStore();

  return (
    <div className="space-y-6">
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
                PDF up to 10MB
              </p>
            </div>
          </div>
        ) : (
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
                onClick={() => setFile(null)}
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
          <div className="flex flex-col gap-1 ml-1">
            <Label className="text-[13px] font-semibold text-gray-900 uppercase tracking-wider">Recipients</Label>
            <p className="text-[13px] text-gray-500">Who needs to sign this document?</p>
          </div>

          <div className="flex gap-2 p-1.5 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-blue-200 focus-within:bg-white transition-colors duration-150">
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
              className="rounded-lg px-4 bg-gray-900 hover:bg-black text-white"
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
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm",
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
      )}
    </div>
  );
};

interface UploadFooterProps {
  CloseComponent: React.ComponentType<any>;
  handleUpload: () => void;
  file: File | null;
  title: string;
  isUploading: boolean;
  hasFile: boolean;
}

const UploadFooter: FC<UploadFooterProps> = ({
  CloseComponent,
  handleUpload,
  file,
  isUploading,
  hasFile,
}) => {
  const { signers } = useSignersStore();

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
};

async function computeFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function NewDocumentDialog({
  children,
  initialFile,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange,
}: NewDocumentDialogProps) {
  const { user, redirectToSignIn } = useClerk()
  const router = useRouter()

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
  const isMobile = useMobile()

  useEffect(() => {
    if (initialFile) {
      setFile(initialFile);
      if (!title) {
        setTitle(initialFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  }, [initialFile, isOpen]);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const createDocument = useMutation(api.documents.createDocument)
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
  }, [title])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 10 * 1024 * 1024,
  })



  async function handleAnonymousUpload() {
    setIsUploading(true);
    setStatusMessage('Uploading document...');
    setUploadProgress(20);
    try {
      const documentHash = await computeFileHash(file!);
      setUploadProgress(40);

      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/pdf' },
        body: file!,
      });

      if (!res.ok) throw new Error('Upload failed');
      const { storageId } = await res.json();

      setUploadProgress(70);

      localStorage.setItem(
        PENDING_DOC_KEY,
        JSON.stringify({
          storageId,
          originalFileName: file!.name,
          fileSizeBytes: file!.size,
          fileType: 'pdf',
          title: title || file!.name.replace(/\.[^/.]+$/, ''),
          documentHash,
          signers: signers.map(s => s.email),
          createdAt: Date.now(),
        })
      );
      setUploadProgress(100);
      redirectToSignIn()
      onOpenChange(false);
    } catch (err) {
      console.error(err)
      toast.error('Upload failed');
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
      const uploadBlob = file;

      // if (file.type !== 'application/pdf') {
      //   setStatusMessage('Converting to PDF...');
      //   setUploadProgress(20);
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   const convRes = await fetch('/api/convert-to-pdf', { method: 'POST', body: formData });
      //   if (!convRes.ok) throw new Error('Conversion failed');
      //   uploadBlob = await convRes.blob();
      //   setUploadProgress(45);
      // }

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
      console.error(error)
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
    }
  }


  const handleUpload = async () => {
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

  const footer = (Close: React.ComponentType<any>) => (
    <UploadFooter
      CloseComponent={Close}
      handleUpload={handleUpload}
      file={file}
      title={title}
      isUploading={isUploading}
      hasFile={!!file}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        {children && <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>}
        <DrawerContent className="min-h-[70vh] rounded-t-xl">
          <DrawerHeader className="px-0 pt-2">
            <DrawerTitle className="text-xl font-bold text-gray-900 tracking-tight">Upload Document</DrawerTitle>
            <p className="text-[13px] text-gray-500">Prepare your file for secure signing</p>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto pb-4">{content}</div>
          <DrawerFooter className="px-0 border-t border-gray-50 bg-white sticky bottom-0">
            {footer(DrawerClose)}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>
        {children}
      </DialogTrigger>}
      <DialogContent className="sm:max-w-[580px] border-none overflow-hidden">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-2xl font-bold tracking-tight">Upload Document</DialogTitle>
          <p className="text-sm">Prepare your file for secure electronic signing.</p>
        </DialogHeader>
        <TrialGate>
          <div className="relative">
            {content}
          </div>
          <DialogFooter className="mt-4 pt-4 border-t border-gray-50 sm:justify-start">
            {footer(DialogClose)}
          </DialogFooter>
        </TrialGate>
      </DialogContent>
    </Dialog>
  )
}
