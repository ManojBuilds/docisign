"use client"
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import SignatureField, { SignatureFieldData } from '@/components/signature-field'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2, Plus, Share, ChevronLeftIcon, ChevronRightIcon, ZoomOutIcon, ZoomInIcon, PenTool, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { usePdfDimensions } from '@/components/PdfDimensionsContext'
import { ShareDialog } from '@/components/ShareDialog'
import Image from 'next/image'
import PdfControls from '@/components/PdfControls'
import { UserButton } from '@clerk/clerk-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import Logo from '@/components/Logo'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

const PDFViewer = dynamic(() => import("@/components/pdf-viewer"), { ssr: false })

interface Signer {
    email: string
    name?: string
}

export default function DocumentEditor() {
    const params = useParams()
    const router = useRouter()
    const { pageDimensions, scale, setScale } = usePdfDimensions()

    const documentId = params.id as Id<"documents">

    // Queries
    const document = useQuery(api.documents.getDocument, { documentId })
    const getFileUrl = useMutation(api.documents.getFileUrl)

    // Mutations
    const addSignatureField = useMutation(api.signatureFields.addSignatureField)
    const updateSignatureField = useMutation(api.signatureFields.updateSignatureField)
    const deleteSignatureField = useMutation(api.signatureFields.deleteSignatureField)
    const addSigner = useMutation(api.signers.addSigner)
    const sendForSigning = useMutation(api.signers.sendDocumentForSigning)

    // State
    const [fileUrl, setFileUrl] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [numPages, setNumPages] = useState<number>(0)
    const [signatureFields, setSignatureFields] = useState<SignatureFieldData[]>([])
    const [selectedFieldId, setSelectedFieldId] = useState<string>('')
    const [signers, setSigners] = useState<Signer[]>([])
    const [hasInitializedFields, setHasInitializedFields] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

    // Load file URL when document is loaded
    useEffect(() => {
        const loadFileUrl = async () => {
            if (document?.fileStorageId) {
                try {
                    const url = await getFileUrl({ storageId: document.fileStorageId })
                    if (url) setFileUrl(url)
                } catch (error) {
                    console.error('Error loading file URL:', error)
                }
            }
        }

        loadFileUrl()
    }, [document?.fileStorageId, getFileUrl])

    // Load signature fields and signers
    useEffect(() => {
        if (document?.signatureFields && Object.keys(pageDimensions).length > 0 && !hasInitializedFields) {
            const fields: SignatureFieldData[] = document.signatureFields.map((field) => {
                const dims = pageDimensions[field.page]
                if (!dims || dims.width === 0 || dims.height === 0) {
                    console.warn(`Page dimensions not available for page ${field.page}`)
                    return null
                }
                return {
                    id: field._id,
                    fieldType: field.fieldType,
                    page: field.page,
                    assignedToEmail: field.assignedToEmail,
                    isRequired: field.isRequired,
                    label: field.label,
                    normalizedX: Math.max(0, Math.min(1, field.x / dims.width)),
                    normalizedY: Math.max(0, Math.min(1, field.y / dims.height)),
                    normalizedWidth: Math.max(0.01, Math.min(1, field.width / dims.width)),
                    normalizedHeight: Math.max(0.01, Math.min(1, field.height / dims.height)),
                }
            }).filter(Boolean) as SignatureFieldData[]
            
            if (fields.length > 0) {
                setSignatureFields(fields)
                setHasInitializedFields(true)
            }
        }

        const uniqueSignerEmails = new Set<string>();
        const combinedSigners: Signer[] = [];

        if (document?.signers) {
            document.signers.forEach(signer => {
                if (!uniqueSignerEmails.has(signer.email)) {
                    uniqueSignerEmails.add(signer.email);
                    combinedSigners.push(signer);
                }
            });
        }

        signatureFields.forEach(field => {
            if (field.assignedToEmail && !uniqueSignerEmails.has(field.assignedToEmail)) {
                uniqueSignerEmails.add(field.assignedToEmail);
                combinedSigners.push({ 
                    email: field.assignedToEmail, 
                    name: (field as any).assignedToName || '' 
                });
            }
        });

        if (JSON.stringify(signers) !== JSON.stringify(combinedSigners)) {
            setSigners(combinedSigners);
        }
    }, [document, pageDimensions, hasInitializedFields, signatureFields, signers])

    const handleAddSignatureField = async (fieldType: SignatureFieldData['fieldType']) => {
        const dims = pageDimensions[currentPage]
        if (!dims) return

        try {
            const x = 100
            const y = 100
            const width = 150
            const height = 40

            const fieldId = await addSignatureField({
                documentId,
                fieldType,
                page: currentPage,
                x,
                y,
                width,
                height,
                assignedToEmail: '',
                assignedToName: '',
                isRequired: true,
            })

            const newField: SignatureFieldData = {
                id: fieldId,
                fieldType,
                page: currentPage,
                assignedToEmail: '',
                isRequired: true,
                label: "",
                normalizedX: x / dims.width,
                normalizedY: y / dims.height,
                normalizedWidth: width / dims.width,
                normalizedHeight: height / dims.height,
            }

            setSignatureFields(prev => [...prev, newField])
            setSelectedFieldId(fieldId)
            setIsMobileMenuOpen(false)
        } catch (error) {
            console.error(error)
            toast.error("Failed to add signature field")
        }
    }

    const handleUpdateField = async (updatedField: SignatureFieldData) => {
        const dims = pageDimensions[updatedField.page]
        if (!dims) return

        try {
            await updateSignatureField({
                fieldId: updatedField.id as Id<"signatureFields">,
                x: updatedField.normalizedX * dims.width,
                y: updatedField.normalizedY * dims.height,
                width: updatedField.normalizedWidth * dims.width,
                height: updatedField.normalizedHeight * dims.height,
                assignedToEmail: updatedField.assignedToEmail,
                assignedToName: updatedField.assignedToName,
                label: updatedField.label,
                isRequired: updatedField.isRequired,
            })

            setSignatureFields(prev =>
                prev.map(field =>
                    field.id === updatedField.id ? updatedField : field
                )
            )
        } catch (error) {
            console.error('Error updating field:', error)
        }
    }

    const handleDeleteField = async (fieldId: string) => {
        try {
            await deleteSignatureField({
                fieldId: fieldId as Id<"signatureFields">
            })

            setSignatureFields(prev => prev.filter(field => field.id !== fieldId))
            setSelectedFieldId('')
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete signature field")
        }
    }

    const handleSignerAdd = (signer: Signer) => {
        const unassignedFields = signatureFields.filter(field => !field.assignedToEmail);
        if (unassignedFields.length === 0) return;

        const updatedFields = signatureFields.map(field => {
            if (!field.assignedToEmail) {
                const updatedField = { ...field, assignedToEmail: signer.email, assignedToName: signer.name };
                handleUpdateField(updatedField);
                return updatedField;
            }
            return field;
        });

        setSignatureFields(updatedFields);
        toast.success(`Assigned ${signer.email} to ${unassignedFields.length} field(s).`);
    };

    const handleSendForSigning = async (signers: Signer[], customMessage?: string) => {
        for (const signer of signers) {
            await addSigner({
                documentId,
                email: signer.email,
                name: signer.name,
            })
        }

        await sendForSigning({
            documentId,
            customMessage: customMessage || undefined,
        })
        router.push('/dashboard')
    }

    const hasUnassignedFields = signatureFields.some(field => !field.assignedToEmail);

    if (!document) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
            {/* Desktop Navbar */}
            <div className="hidden md:flex justify-between items-center px-4 py-2.5 border-b bg-white">
                <div className="flex items-center space-x-4">
                    <Logo/>
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Button>
                    </Link>
                    <span className="font-semibold text-lg truncate max-w-[8rem] md:max-w-xs">{document.title}</span>
                </div>

                <div className="flex items-center space-x-4 flex-1">
                    <div className='flex items-center justify-center space-x-4 flex-1'>
                        <PdfControls
                            pageNumber={currentPage}
                            numPages={numPages}
                            scale={scale}
                            onPageChange={setCurrentPage}
                            onScaleChange={setScale}
                            onSignatureFieldClick={() => handleAddSignatureField('signature')}
                            onDateSignatureFieldClick={() => handleAddSignatureField('date')}
                        />
                    </div>
                    <ShareDialog
                        documentId={documentId}
                        initialSigners={signers}
                        onSend={handleSendForSigning}
                        hasUnassignedFields={hasUnassignedFields}
                        onSignerAdd={handleSignerAdd}
                    />
                    <UserButton />
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden flex justify-between items-center p-3 border-b bg-white shadow-sm">
                <div className="flex items-center space-x-2">
                    <Logo showText={false}/>
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="p-1">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                
                <div className="flex-1 text-center">
                    <span className="font-medium text-sm truncate max-w-[10rem] inline-block">{document.title}</span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1"
                        onClick={() => setIsShareDialogOpen(true)}
                    >
                        <Share className="w-4 h-4" />
                    </Button>
                    <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <DrawerContent className="h-[30vh] rounded-t-lg">
                            <div className="flex flex-col space-y-4 p-4">
                                <h3 className="font-semibold text-lg">Add Fields</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button 
                                        onClick={() => handleAddSignatureField('signature')}
                                        className="flex flex-col items-center justify-center h-20 space-y-2"
                                        variant="secondary"
                                    >
                                        <PenTool className="w-6 h-6" />
                                        <span className="text-sm text-muted-foreground">Signature</span>
                                    </Button>
                                    <Button 
                                        onClick={() => handleAddSignatureField('date')}
                                        className="flex flex-col items-center justify-center h-20 space-y-2"
                                        variant="secondary"
                                    >
                                        <CalendarDays className="w-6 h-6" />
                                        <span className="text-sm text-muted-foreground">Date</span>
                                    </Button>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <UserButton />
                </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="flex-1 min-h-0 relative overflow-hidden0">
                {fileUrl ? (
                    <div className="h-full w-full relative">
                        <PDFViewer
                            fileUrl={fileUrl}
                            pageNumber={currentPage}
                            onPageChange={setCurrentPage}
                            onScaleChange={setScale}
                            onNumPagesChange={setNumPages}
                            showControls={false}
                            className="h-full w-full"
                        >
                            <div
                                className="absolute inset-0 pointer-events-none"
                                onClick={() => setSelectedFieldId('')}
                                style={{ paddingBottom: window.innerWidth < 768 ? '4rem' : '0' }}
                            >
                                <div className="pointer-events-auto">
                                    {signatureFields
                                        .filter(field => field.page === currentPage)
                                        .map((field) => (
                                            <SignatureField
                                                key={field.id}
                                                field={field}
                                                isEditMode={true}
                                                isSelected={selectedFieldId === field.id}
                                                onUpdate={handleUpdateField}
                                                onDelete={handleDeleteField}
                                                onSelect={setSelectedFieldId}
                                                onSave={handleUpdateField}
                                            />
                                        ))}
                                </div>
                            </div>
                        </PDFViewer>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full w-full">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Loading document...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Share Dialog */}
            {isShareDialogOpen && (
                <ShareDialog
                    documentId={documentId}
                    initialSigners={signers}
                    onSend={handleSendForSigning}
                    open={isShareDialogOpen}
                    onOpenChange={setIsShareDialogOpen}
                    hasUnassignedFields={hasUnassignedFields}
                    onSignerAdd={handleSignerAdd}
                />
            )}

            {/* Mobile Fixed Bottom Controls */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
                <div className="flex items-center justify-between p-3">
                    {/* Page Navigation */}
                    <div className="flex items-center space-x-3">
                        <Button 
                            variant="secondary" 
                            size="icon"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeftIcon/>
                        </Button>
                        <div className="text-xs font-medium min-w-[2rem] text-center">
                            {currentPage}/{numPages}
                        </div>
                        <Button 
                            variant="secondary" 
                            size="icon"
                            onClick={() => setCurrentPage(Math.min(numPages, currentPage + 1))}
                            disabled={currentPage >= numPages}
                            className="px-3"
                        >
                            <ChevronRightIcon/>
                        </Button>
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center">
                        <Button 
                            variant="secondary" 
                            size="icon"
                            onClick={() => setScale(Math.max(0.25, scale - 0.25))}
                        >
                            <ZoomOutIcon/>
                        </Button>
                        <div className="text-xs font-medium min-w-[3rem] text-center">
                            {Math.round(scale * 100)}%
                        </div>
                        <Button 
                            variant="secondary" 
                            size="icon"
                            onClick={() => setScale(Math.min(5, scale + 0.25))}
                        >
                            <ZoomInIcon/>
                        </Button>
                    </div>

                    {/* Add Fields Button */}
                    <Button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="px-3 fixed bottom-16 right-4 w-12 h-12 rounded-full aspect-square"
                        size="lg"
                    >
                        <Plus className="w-8 h-8" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
