"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import PDFViewer from '@/components/pdf-viewer'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'sonner'
import SigningField, { SignatureFieldData as SigningFieldDataType } from '@/components/signing-field'
import { usePdfDimensions } from '@/components/PdfDimensionsContext'
import Logo from '@/components/Logo'

const SidebarContent = ({
  signingSession,
  completedFields,
  totalFields,
  progressPercentage,
  requiredFields,
  completedRequiredFields,
  pagesWithFields,
  currentFieldIndex,
  currentPage,
  navigateToFieldPage,
  fieldsOnCurrentPage,
  handleSubmitDocument,
  isSubmitting,
}: {
  signingSession: any
  completedFields: number
  totalFields: number
  progressPercentage: number
  requiredFields: any[]
  completedRequiredFields: number
  pagesWithFields: number[]
  currentFieldIndex: number
  currentPage: number
  navigateToFieldPage: (direction: 'prev' | 'next') => void
  fieldsOnCurrentPage: any[]
  handleSubmitDocument: () => void
  isSubmitting: boolean
}) => (
  <>
    {/* Header */}
    <Logo />
    <div className="space-y-2">
      <h1 className="text-xl font-semibold tracking-tight">{signingSession.document.title}</h1>
      <p className="text-sm text-muted-foreground">Please review and complete all signature fields</p>
    </div>

    <Separator />

    {/* Document Details */}
    <div className="space-y-4">
      <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Document Details</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="md:truncate">{signingSession.document.originalFileName}</span>
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

    <Separator />

    {/* Progress */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Progress</h2>
        <div className="text-xs px-2 py-1 bg-secondary rounded-sm">
          {completedFields}/{totalFields}
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-1.5 transition-all duration-300 ease-out rounded-full"
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

    {pagesWithFields.length > 1 && (
      <>
        <Separator />

        {/* Field Navigation */}
        <div className="space-y-4">
          <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Field Navigation</h2>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFieldPage('prev')}
              disabled={currentFieldIndex <= 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="text-xs text-muted-foreground">
              Page {currentPage} ({currentFieldIndex + 1} of {pagesWithFields.length})
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateToFieldPage('next')}
              disabled={currentFieldIndex >= pagesWithFields.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Fields on current page */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Fields on this page:</p>
            {fieldsOnCurrentPage.map(field => (
              <div key={field.id} className="flex items-center justify-between text-xs py-1">
                <span className="capitalize">
                  {field.fieldType}
                  {field.isRequired && <span className="text-destructive ml-1">*</span>}
                </span>
                {field.isCompleted && (
                  <Check className="h-3 w-3 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    )}

    {/* Custom Message */}
    {signingSession.document.customMessage && (
      <>
        <Separator />
        <div className="space-y-3">
          <h2 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Message</h2>
          <p className="text-sm leading-relaxed">{signingSession.document.customMessage}</p>
        </div>
      </>
    )}

    <Separator />

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
        <div className="flex items-start gap-2 p-3 border border-border bg-muted/30 rounded-md">
          <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Please complete all required signature fields before submitting the document.
          </p>
        </div>
      )}
    </div>
  </>
);

const WelcomeScreen = ({ signingSession, owner, onProceed }: { signingSession: any, owner: any, onProceed: () => void }) => {
  const ownerName = owner?.firstName ? `${owner.firstName} ${owner.lastName || ''}`.trim() : owner?.email || 'Someone';
  const signerName = signingSession.signer.name || signingSession.signer.email;

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center relative z-10"
    >
      <div style={{
        backgroundImage: "url('/noise.png')"
      }} className="pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat opacity-[0.035]"></div>
      <Logo className='mb-6' />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">You're Invited to Sign</h1>
      <p className="text-muted-foreground text-lg mb-8 max-w-2xl">
        <strong>{ownerName}</strong> has invited you to sign the document: <br />
        <span className="font-semibold text-foreground">{signingSession.document.title}</span>
      </p>

      <div className="space-y-8 divide-y text-left max-w-2xl w-full">
        <div className="py-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><User className="mr-3 h-5 w-5" /> Signer Information</h2>
          <div className="space-y-1 text-sm text-muted-foreground pl-8">
            <p><strong>Name:</strong> {signerName}</p>
            <p><strong>Email:</strong> {signingSession.signer.email}</p>
          </div>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center"><FileText className="mr-3 h-5 w-5" /> Document Information</h2>
          <div className="space-y-1 text-sm text-muted-foreground pl-8">
            <p><strong>File:</strong> {signingSession.document.originalFileName}</p>
            <p><strong>Sent:</strong> {new Date(signingSession.document.createdAt).toLocaleDateString()}</p>
            {signingSession.document.customMessage && (
              <div className="pt-2">
                <p className="font-semibold">Message from sender:</p>
                <p className="italic">"{signingSession.document.customMessage}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-10 w-full max-w-xs" onClick={onProceed}>
        Review & Sign Document
      </Button>
    </div>
  );
};


export default function SigningPage() {
  const params = useParams()
  const router = useRouter()

  const accessToken = params.token as string

  // State
  const [showWelcome, setShowWelcome] = useState(true);

  // Queries
  const signingSession = useQuery(api.signers.getSigningSession, { accessToken })
  const ownerId = signingSession?.document?.ownerId;
  const owner = useQuery(api.users.getUserByClerkId, ownerId ? { clerkId: ownerId } : 'skip');
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
  const [hasAutoNavigated, setHasAutoNavigated] = useState(false) // Add this flag
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

      // Auto-navigate to first page with incomplete required fields ONLY once on initial load
      if (!hasAutoNavigated) {
        const incompleteRequiredField = fields.find(f => f.isRequired && !f.isCompleted)
        if (incompleteRequiredField) {
          setCurrentPage(incompleteRequiredField.page)
        }
        setHasAutoNavigated(true) // Set flag to prevent future auto-navigation
      }
    }
  }, [signingSession?.signatureFields, pageDimensions, hasAutoNavigated]) // Add hasAutoNavigated to dependencies

  // Get unique pages with signature fields
  const pagesWithFields = [...new Set(signatureFields.map(f => f.page))].sort((a, b) => a - b)
  const currentFieldIndex = pagesWithFields.indexOf(currentPage)

  const handleFieldComplete = async (fieldId: string, signatureData: string) => {
    if (!signingSession) return
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
        if (signingSession.document && signingSession.signer) {
          await finalizeDocument({
            documentId: signingSession.document._id,
            signerEmail: signingSession.signer.email,
          });
        }

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

      // Auto-navigate to next incomplete required field
      const nextIncompleteField = updatedSignatureFields.find(f =>
        f.isRequired &&
        !f.isCompleted &&
        f.page > currentPage
      )

      // If there's no incomplete field on a later page, check earlier pages
      const nextIncompleteFieldAny = nextIncompleteField || updatedSignatureFields.find(f =>
        f.isRequired &&
        !f.isCompleted
      )

      if (nextIncompleteFieldAny) {
        setCurrentPage(nextIncompleteFieldAny.page)
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to save signature");
      setIsSubmitting(false);
    }
  }

  const handleSubmitDocument = async () => {
    if (!signingSession) return
    const requiredFields = signatureFields.filter(f => f.isRequired)
    const incompleteRequired = requiredFields.filter(f => !f.isCompleted)

    if (incompleteRequired.length > 0) {
      toast.error(`Please complete all required fields (${incompleteRequired.length} remaining)`)
      // Navigate to first incomplete field
      const firstIncomplete = incompleteRequired[0]
      if (firstIncomplete) {
        setCurrentPage(firstIncomplete.page)
      }
      return
    }

    setIsSubmitting(true)
    try {
      if (signingSession.document && signingSession.signer) {
        await finalizeDocument({
          documentId: signingSession.document._id,
          signerEmail: signingSession.signer.email,
        })
      }
      toast.success("Document signed successfully!")
      router.push(`/sign/complete?token=${accessToken}`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to finalize document")
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigateToFieldPage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentFieldIndex > 0) {
      setCurrentPage(pagesWithFields[currentFieldIndex - 1])
    } else if (direction === 'next' && currentFieldIndex < pagesWithFields.length - 1) {
      setCurrentPage(pagesWithFields[currentFieldIndex + 1])
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

  if (signingSession.document?.status === 'completed') {
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

  if (!signingSession?.document) return null;

  if (showWelcome) {
    return <WelcomeScreen signingSession={signingSession} owner={owner} onProceed={() => setShowWelcome(false)} />
  }

  const completedFields = signatureFields.filter(f => f.isCompleted).length
  const totalFields = signatureFields.length
  const requiredFields = signatureFields.filter(f => f.isRequired)
  const completedRequiredFields = requiredFields.filter(f => f.isCompleted).length
  const progressPercentage = totalFields > 0 ? (completedFields / totalFields) * 100 : 0
  const fieldsOnCurrentPage = signatureFields.filter(f => f.page === currentPage)

  const sidebarProps = {
    signingSession,
    completedFields,
    totalFields,
    progressPercentage,
    requiredFields,
    completedRequiredFields,
    pagesWithFields,
    currentFieldIndex,
    currentPage,
    navigateToFieldPage,
    fieldsOnCurrentPage,
    handleSubmitDocument,
    isSubmitting,
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Desktop Sidebar */}
      <div className="w-full lg:w-80 border-r bg-background p-6 space-y-6 overflow-y-auto hidden lg:block">
        <SidebarContent {...sidebarProps} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* PDF Viewer */}
        <div className="flex-1 bg-muted/20">
          {fileUrl ? (
            <PDFViewer
              fileUrl={fileUrl}
              pageNumber={currentPage}
              onPageChange={setCurrentPage}
              onScaleChange={setScale}
            >
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

        {/* Mobile Drawer Trigger */}
        <div className="lg:hidden p-4 border-t bg-background">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="w-full">
                <FileText className="h-4 w-4" />
                View Document Details
              </Button>
            </DrawerTrigger>
            <DrawerContent className="min-h-[90vh]">
              <DrawerHeader>
                <DrawerTitle className='sr-only'>Document Details</DrawerTitle>
              </DrawerHeader>
              <div className="px-6 pb-6 space-y-6 overflow-y-auto">
                <SidebarContent {...sidebarProps} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  )
}
