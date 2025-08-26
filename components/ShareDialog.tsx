"use client"

import { useEffect, useState, FC, Dispatch, SetStateAction } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Send, UserPlus, X, Loader2, Trash2, AlertCircle } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Textarea } from './ui/textarea'

interface Signer {
  email: string
  name?: string
}

interface ShareDialogProps {
  documentId: Id<"documents">
  initialSigners: Signer[]
  onSend: (signers: Signer[], customMessage?: string) => Promise<void>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hasUnassignedFields?: boolean
  onSignerAdd?: (signer: Signer) => void
}

const validateEmail = (email: string) => {
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
};

interface DialogContentSharedProps {
  hasUnassignedFields?: boolean;
  newSignerEmail: string;
  setNewSignerEmail: Dispatch<SetStateAction<string>>;
  emailError: string;
  setEmailError: Dispatch<SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  newSignerName: string;
  setNewSignerName: Dispatch<SetStateAction<string>>;
  addSigner: () => void;
  signers: Signer[];
  setSigners: Dispatch<SetStateAction<Signer[]>>;
  removeSigner: (email: string) => void;
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
}

const DialogContentShared: FC<DialogContentSharedProps> = ({
  hasUnassignedFields,
  newSignerEmail,
  setNewSignerEmail,
  emailError,
  setEmailError,
  handleKeyPress,
  newSignerName,
  setNewSignerName,
  addSigner,
  signers,
  setSigners,
  removeSigner,
  customMessage,
  setCustomMessage,
}) => (
  <div className="space-y-4">
    {hasUnassignedFields && (
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Unassigned Signature Fields</AlertTitle>
        <AlertDescription>
          This document has signature fields that are not assigned to any signer. Adding a signer will automatically assign them.
        </AlertDescription>
      </Alert>
    )}
    {/* Add Signers Section */}
    <div className="space-y-3">
      <Label className="text-base font-semibold">Add Signers</Label>

      {/* Mobile: Stack inputs vertically, Desktop: Side by side */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 space-y-1">
          <Input
            placeholder="Enter email address"
            type="email"
            value={newSignerEmail}
            onChange={(e) => {
              setNewSignerEmail(e.target.value)
              if (emailError) setEmailError('')
            }}
            onKeyPress={handleKeyPress}
            className={emailError ? 'border-red-500' : ''}
          />
          {emailError && (
            <p className="text-sm text-red-500">{emailError}</p>
          )}
        </div>

        <div className="flex-1 md:flex-none md:w-40">
          <Input
            placeholder="Name (optional)"
            value={newSignerName}
            onChange={(e) => setNewSignerName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <Button
          onClick={addSigner}
          variant="outline"
          className="md:w-auto w-full"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Signer
        </Button>
      </div>
    </div>

    {/* Current Signers Section */}
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">
          Signers ({signers.length})
        </Label>
        {signers.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSigners([])
              toast.success('All signers removed')
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-1 max-h-48 overflow-y-auto">
        {signers.length > 0 ? (
          signers.map((signer, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-md bg-secondary/50 p-2"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {signer.name || 'Unnamed Signer'}
                </p>
                <p className="text-gray-600 text-sm truncate">
                  {signer.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSigner(signer.email)}
                className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-20 text-center">
            <div>
              <UserPlus className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No signers added yet</p>
              <p className="text-xs text-gray-400">Add an email address to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Custom Message Section */}
    <div className="space-y-1">
      <Label className="text-base font-semibold">Custom Message (Optional)</Label>
      <Textarea
        className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows={3}
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        placeholder="Add a personal message to the signers..."
        maxLength={500}
      />
      <p className="text-xs text-gray-500 text-right">
        {customMessage.length}/500 characters
      </p>
    </div>
  </div>
);

export function ShareDialog({
  initialSigners,
  onSend,
  open,
  onOpenChange,
  hasUnassignedFields,
  onSignerAdd,
}: ShareDialogProps) {
  const [signers, setSigners] = useState<Signer[]>(initialSigners)
  const [newSignerEmail, setNewSignerEmail] = useState('')
  const [newSignerName, setNewSignerName] = useState('')
  const [customMessage, setCustomMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [emailError, setEmailError] = useState('')

  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    setSigners(initialSigners)
  }, [initialSigners])

  const addSigner = () => {
    const email = newSignerEmail.trim()
    const name = newSignerName.trim()

    if (!email) {
      setEmailError('Email is required')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    if (signers.find(s => s.email === email)) {
      setEmailError('This email is already added')
      return
    }

    const newSigner = { email, name: name || undefined }
    setSigners([...signers, newSigner])

    if (hasUnassignedFields) {
      onSignerAdd?.(newSigner)
    }

    setNewSignerEmail('')
    setNewSignerName('')
    setEmailError('')
    toast.success('Signer added successfully')
  }

  const removeSigner = (email: string) => {
    setSigners(signers.filter(s => s.email !== email))
    toast.success('Signer removed')
  }

  const handleSend = async () => {
    if (signers.length === 0) {
      toast.error("Please add at least one signer.")
      return
    }

    setIsSending(true)
    try {
      await onSend(signers, customMessage)
      toast.success("Document sent for signing!")
      onOpenChange?.(false)
    } catch (error) {
      console.error(error)
      toast.error("Failed to send document.")
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addSigner()
    }
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button className="w-full">
            <Send className="w-4 h-4" />
            Share
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full min-h-[90svh]">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl">Share Document</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 pb-6 overflow-y-auto">
            <DialogContentShared
              hasUnassignedFields={hasUnassignedFields}
              newSignerEmail={newSignerEmail}
              setNewSignerEmail={setNewSignerEmail}
              emailError={emailError}
              setEmailError={setEmailError}
              handleKeyPress={handleKeyPress}
              newSignerName={newSignerName}
              setNewSignerName={setNewSignerName}
              addSigner={addSigner}
              signers={signers}
              setSigners={setSigners}
              removeSigner={removeSigner}
              customMessage={customMessage}
              setCustomMessage={setCustomMessage}
            />
          </div>

          <DrawerFooter className="pt-4 border-t">
            <Button
              onClick={handleSend}
              disabled={isSending || signers.length === 0}
              className="w-full"
              size="lg"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Sending Document...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send for Signing ({signers.length})
                </>
              )}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Send className="w-4 h-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Share Document</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <DialogContentShared
            hasUnassignedFields={hasUnassignedFields}
            newSignerEmail={newSignerEmail}
            setNewSignerEmail={setNewSignerEmail}
            emailError={emailError}
            setEmailError={setEmailError}
            handleKeyPress={handleKeyPress}
            newSignerName={newSignerName}
            setNewSignerName={setNewSignerName}
            addSigner={addSigner}
            signers={signers}
            setSigners={setSigners}
            removeSigner={removeSigner}
            customMessage={customMessage}
            setCustomMessage={setCustomMessage}
          />
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSend}
            disabled={isSending || signers.length === 0}
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send for Signing ({signers.length})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
