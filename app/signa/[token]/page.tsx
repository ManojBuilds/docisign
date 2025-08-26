"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import PDFViewer from '@/components/pdf-viewer'
import { Button } from '@/components/ui/button'

import {
  Check,
  FileText,
  User,
  Mail,
  Calendar,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'
import SigningField, { SignatureFieldData as SigningFieldDataType } from '@/components/signing-field'
import { usePdfDimensions } from '@/components/PdfDimensionsContext'

export default function SigningPage() {
  const params = useParams()
  const router = useRouter()

  const accessToken = params.token as string

  // Queries
  const signingSession = useQuery(api.signers.getSigningSession, { accessToken })
  const getFileUrl = useMutation(api.documents.getFileUrl)

  // Mutations
  const markAsViewed = useMutation(api.signers.markDocumentAsViewed)
  const completeSignature = useMutation(api.signatureFields.completeSignatureField)
  const finalizeDocument = useMutation(api.signers.finalizeDocument)

  // State
  const [fileUrl, setFileUrl] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [signatureFields, setSignatureFields] = useState<SigningFieldDataType[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasMarkedViewed, setHasMarkedViewed] = useState(false)
  const { pageDimensions, setScale } = usePdfDimensions()

  // Load file URL and mark as viewed
  useEffect(() => {
    const loadAndMarkViewed = async () => {
      if (signingSession && !hasMarkedViewed && signingSession.document) {
        try {
          const url = await getFileUrl({ storageId: signingSession.document.fileStorageId })
          if (url) setFileUrl(url)

          await markAsViewed({ accessToken })
          setHasMarkedViewed(true)
        } catch (error) {
          console.error('Error loading signing session:', error)
        }
      }
    }

    loadAndMarkViewed()
  }, [signingSession, getFileUrl, markAsViewed, accessToken, hasMarkedViewed])

  // Load and normalize signature fields
  useEffect(() => {
    if (signingSession?.signatureFields && pageDimensions) {
      const fields: SigningFieldDataType[] = signingSession.signatureFields.map((field) => {
        const dims = pageDimensions[field.page]
        return {
          id: field._id,
          fieldType: field.fieldType,
          page: field.page,
          assignedToEmail: field.assignedToEmail,
          isRequired: field.isRequired,
          label: field.label,
          isCompleted: field.isCompleted,
          signatureData: field.signatureData,
          normalizedX: dims ? field.x / dims.width : 0,
          normalizedY: dims ? field.y / dims.height : 0,
          normalizedWidth: dims ? field.width / dims.width : 0,
          normalizedHeight: dims ? field.height / dims.height : 0,
        }
      })
      setSignatureFields(fields)
    }
  }, [signingSession?.signatureFields, pageDimensions])

  if (!signingSession?.document) return null;


  const handleFieldComplete = async (fieldId: string, signatureData: string) => {
    try {
      // Check if this completion will satisfy all requirements BEFORE making any changes
      const requiredFields = signatureFields.filter(f => f.isRequired);
      const incompleteRequired = requiredFields.filter(f => !f.isCompleted && f.id !== fieldId);

      if (incompleteRequired.length === 0) {
        // All required fields will be completed, navigate immediately to prevent UI flash
        setIsSubmitting(true);
        router.push(`/sign/complete?token=${accessToken}`);

        // Complete the signature and finalize in the background
        await completeSignature({ fieldId: fieldId as any, signatureData });
        await finalizeDocument({
          documentId: signingSession!.document._id,
          signerEmail: signingSession!.signer.email,
        });

        return; // Exit early
      }

      // If there are more fields to complete, proceed normally
      await completeSignature({ fieldId: fieldId as any, signatureData });

      // Update local state
      const updatedSignatureFields = signatureFields.map(field =>
        field.id === fieldId
          ? { ...field, isCompleted: true, signatureData }
          : field
      );
      setSignatureFields(updatedSignatureFields);

      toast.success("Signature added successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Failed to save signature");
      setIsSubmitting(false);
    }
  }

  const handleSubmitDocument = async () => {
    const requiredFields = signatureFields.filter(f => f.isRequired)
    const incompleteRequired = requiredFields.filter(f => !f.isCompleted)

    if (incompleteRequired.length > 0) {
      toast.error(`Please complete all required fields (${incompleteRequired.length} remaining)`)
      return
    }

    setIsSubmitting(true)
    try {
      await finalizeDocument({
        documentId: signingSession!.document._id,
        signerEmail: signingSession!.signer.email,
      })
      toast.success("Document signed successfully!")
      router.push(`/sign/complete?token=${accessToken}`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to finalize document")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!signingSession) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (signingSession.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Invalid Link</h1>
            <p className="text-muted-foreground">This signing link is invalid or has expired.</p>
          </div>
        </div>
      </div>
    )
  }

  if (signingSession.document.status === 'completed') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Already Completed</h1>
            <p className="text-muted-foreground">This document has already been signed and completed.</p>
          </div>
        </div>
      </div>
    )
  }

  const completedFields = signatureFields.filter(f => f.isCompleted).length
  const totalFields = signatureFields.length
  const requiredFields = signatureFields.filter(f => f.isRequired)
  const completedRequiredFields = requiredFields.filter(f => f.isCompleted).length
  const progressPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-background p-6 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="space-y-2">
          <span>Docisign.com</span>
          <h1 className="text-xl font-semibold tracking-tight">{signingSession.document.title}</h1>
          <p className="text-sm text-muted-foreground">Please review and complete all signature fields</p>
        </div>

        <div className="h-px bg-border"></div>

        {/* Document Details */}
        <div className="space-y-4">
          <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Document Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{signingSession.document.originalFileName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{signingSession.signer.name || signingSession.signer.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{signingSession.signer.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span>Sent {new Date(signingSession.document.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-border"></div>

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Progress</h2>
            <div className="text-xs px-2 py-1 bg-secondary rounded-sm">
              {completedFields}/{totalFields}
            </div>
          </div>

          <div className="space-y-3">
            <div className="w-full bg-secondary h-1.5">
              <div
                className="bg-primary h-1.5 transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {requiredFields.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Required fields: {completedRequiredFields}/{requiredFields.length}</span>
              </div>
            )}
          </div>
        </div>

        {/* Custom Message */}
        {signingSession.document.customMessage && (
          <>
            <div className="h-px bg-border"></div>
            <div className="space-y-3">
              <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Message</h2>
              <p className="text-sm leading-relaxed">{signingSession.document.customMessage}</p>
            </div>
          </>
        )}

        <div className="h-px bg-border"></div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            onClick={handleSubmitDocument}
            disabled={isSubmitting || completedRequiredFields < requiredFields.length}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Finalizing...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Complete Signing
              </>
            )}
          </Button>

          {completedRequiredFields < requiredFields.length && (
            <div className="flex items-start gap-2 p-3 border border-border bg-muted/30">
              <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Please complete all required signature fields before submitting the document.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 bg-muted/20">
        {fileUrl ? (
          <PDFViewer fileUrl={fileUrl} onPageChange={setCurrentPage} onScaleChange={setScale}>
            <div className="absolute inset-0 pointer-events-none">
              <div className="pointer-events-auto">
                {signatureFields
                  .filter(field => field.page === currentPage)
                  .map((field) => (
                    <SigningField
                      key={field.id}
                      field={field}
                      isEditMode={false}
                      onComplete={handleFieldComplete}
                    />
                  ))}
              </div>
            </div>
          </PDFViewer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading document...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
