"use client"

import { useState, useCallback } from 'react'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useDropzone } from 'react-dropzone'
import { useMobile } from '@/hooks/useMobile'
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, FileText, Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'

export function NewDocumentDialog() {
  const { user } = useUser()
  const router = useRouter()

  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')

  const isMobile = useMobile()

  const generateUploadUrl = useMutation(api.files.generateUploadUrl)
  const createDocument = useMutation(api.documents.createDocument)
  const canCreate = useQuery(
    api.users.canCreateDocument,
    user ? { clerkId: user.id } : "skip"
  );

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors && rejection.errors.length > 0) {
        const error = rejection.errors[0];
        if (error.code === 'file-too-large') {
          toast.error(`File is too large. Maximum size is 10MB.`);
        } else if (error.code === 'file-invalid-type') {
          toast.error(`Invalid file type. Only PDF, DOC, and DOCX are allowed.`);
        } else {
          toast.error(`File upload error: ${error.message}`);
        }
      }
      setFile(null);
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
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024,
  })

  // Convert document to PDF using your API endpoint
  const convertToPdf = async (file: File): Promise<{ pdfBlob: Blob; originalName: string }> => {
    const originalName = file.name
    if (file.type === 'application/pdf') {
      return { pdfBlob: file, originalName }
    }

    setStatusMessage('Converting to PDF...')
    setUploadProgress(20)

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/convert-to-pdf', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Conversion failed: ${response.statusText}`)
    }

    setUploadProgress(40)
    const pdfBlob = await response.blob()

    return { pdfBlob, originalName }
  }

  const handleUpload = async () => {
    if (!file || !user || !title.trim() || !canCreate) return

    setIsUploading(true)
    setUploadProgress(0)
    setStatusMessage('Preparing file...')

    try {
      const { pdfBlob, originalName } = await convertToPdf(file)

      setStatusMessage('Getting upload URL...')
      setUploadProgress(60)

      const uploadUrl = await generateUploadUrl()

      setStatusMessage('Uploading PDF to storage...')
      setUploadProgress(75)

      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/pdf' },
        body: pdfBlob,
      })

      if (!result.ok) {
        throw new Error('Failed to upload to storage')
      }

      setUploadProgress(90)
      setStatusMessage('Creating document record...')

      const { storageId } = await result.json()

      const documentId = await createDocument({
        title: title.trim(),
        originalFileName: originalName,
        fileStorageId: storageId,
        fileType: 'pdf',
        fileSizeBytes: pdfBlob.size,
        ownerId: user.id,
        pageCount: 1,
      })

      setUploadProgress(100)
      setStatusMessage('Upload complete!')

      toast.success('Document uploaded successfully!')
      setIsOpen(false)
      router.push(`/documents/${documentId}/edit`)
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload document. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      setStatusMessage('')
    }
  }

  const resetDialog = () => {
    setFile(null)
    setTitle('')
    setUploadProgress(0)
    setStatusMessage('')
    setIsUploading(false)
  }

  const UploadContent = () => (
    <div className="space-y-6 py-4">
      {/* File Upload */}
      <div className='w-full'>
        <Label htmlFor="file">Choose File</Label>
        <div className="mt-2">
          {!file ? (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full ${isMobile ? 'h-32' : 'h-48'
                } border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${isDragActive ? 'border-blue-500' : 'border-gray-300'
                }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center">
                <Upload className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} mb-3 text-muted-foreground`} />
                <p className={`mb-2 ${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground text-center px-2`}>
                  {isDragActive ? (
                    'Drop the files here ...'
                  ) : (
                    <>
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOC, or DOCX (MAX. 10MB)
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4 p-4 border rounded-lg">
              <FileText className="w-8 h-8 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate max-w-3/4">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {file.type !== 'application/pdf' && (
                  <p className="text-xs text-amber-600 mt-1">
                    Will be converted to PDF before upload
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={() => setFile(null)}
                disabled={isUploading}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Document Title */}
      <div>
        <Label htmlFor="title">Document Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter document title"
          className="mt-2"
          disabled={isUploading}
        />
      </div>

      {/* Progress Bar and Status */}
      {isUploading && (
        <div className='space-y-2 -mt-2'>
          <div className='flex items-center gap-2'>
            <Progress value={uploadProgress} className="flex-1" />
            <span className="text-sm font-medium">{uploadProgress}%</span>
          </div>
          {statusMessage && (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <p className="text-sm text-gray-600">{statusMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const UploadFooter = ({ CloseComponent }: { CloseComponent: React.ComponentType<any> }) => (
    <div className="flex gap-3 pt-4">
      <CloseComponent asChild>
        <Button variant="outline" disabled={isUploading} className="flex-1">
          Cancel
        </Button>
      </CloseComponent>
      <Button
        onClick={handleUpload}
        disabled={!file || !title.trim() || isUploading}
        className="flex-1"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload Document
          </>
        )}
      </Button>
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetDialog()
      }}>
        <SheetTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            New Document
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80svh] rounded-t-lg">
          <SheetHeader>
            <SheetTitle>Upload New Document</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto p-4 max-w-full">
            <UploadContent />
          </div>
          <SheetFooter className="pt-0">
            <UploadFooter CloseComponent={SheetClose} />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetDialog()
    }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          New Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl border border-gray-200 shadow-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
        </DialogHeader>
        <UploadContent />
        <DialogFooter>
          <UploadFooter CloseComponent={DialogClose} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
