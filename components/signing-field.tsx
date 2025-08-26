"use client"

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image';
import { PenTool, Calendar, Type, Check, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import { usePdfDimensions } from './PdfDimensionsContext'
import { useMobile } from '@/hooks/useMobile';

export interface SignatureFieldData {
  id: string
  fieldType: 'signature' | 'initial' | 'date' | 'text'
  normalizedX: number
  normalizedY: number
  normalizedWidth: number
  normalizedHeight: number
  page: number
  assignedToEmail: string
  isRequired: boolean
  label?: string
  isCompleted: boolean
  signatureData?: string
}

interface SigningFieldProps {
  field: SignatureFieldData
  isEditMode: boolean
  onComplete: (fieldId: string, signatureData: string) => void
  isFocused?: boolean
}

interface SigningDialogProps {
  field: SignatureFieldData
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  typedSignature: string
  setTypedSignature: (value: string) => void
  signatureData: string
  setSignatureData: (value: string) => void
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  getRootProps: any
  getInputProps: any
  handleSignatureComplete: (activeTab: string) => void
  clearCanvas: () => void
  startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void
  draw: (e: React.MouseEvent<HTMLCanvasElement>) => void
  stopDrawing: () => void
  startTouchDrawing?: (e: React.TouchEvent<HTMLCanvasElement>) => void
  touchDraw?: (e: React.TouchEvent<HTMLCanvasElement>) => void
  setupCanvas: (canvas: HTMLCanvasElement | null) => void
  isMobile: boolean
}

function SigningDialog({
  field,
  isOpen,
  onOpenChange,
  activeTab,
  setActiveTab,
  typedSignature,
  setTypedSignature,
  signatureData,
  setSignatureData,
  canvasRef,
  getRootProps,
  getInputProps,
  handleSignatureComplete,
  clearCanvas,
  startDrawing,
  draw,
  stopDrawing,
  startTouchDrawing,
  touchDraw,
  setupCanvas,
  isMobile
}: SigningDialogProps) {
  const renderContent = () => {
    if (field.fieldType === 'signature' || field.fieldType === 'initial') {
      return (
        <div className={isMobile ? "px-4 pb-4" : ""}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="draw">
              <div className="border-2 border-gray-300 rounded mt-4">
                <canvas
                  ref={(canvas) => { canvasRef.current = canvas; setupCanvas(canvas) }}
                  width={isMobile ? 360: 450}
                  height={isMobile? 120  :150}
                  className="cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startTouchDrawing}
                  onTouchMove={touchDraw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <Button variant="outline" onClick={clearCanvas} className="mt-2">Clear</Button>
            </TabsContent>
            <TabsContent value="type">
              <Input
                placeholder="Type your signature..."
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                className="mt-4"
              />
              {typedSignature && (
                <div className="mt-2 p-4 border rounded-lg bg-gray-50 text-center">
                  <p className="text-3xl font-serif" style={{ fontFamily: '"Gochi Hand", cursive' }}>
                    {typedSignature}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="upload">
              <div {...getRootProps()} className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50">
                <input {...getInputProps()} />
                {signatureData ? (
                  <Image src={signatureData} alt="Signature preview" width={150} height={75} className="max-h-24 mx-auto object-contain" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p>Drag & drop an image, or click to select</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => handleSignatureComplete(activeTab)}>Add {field.fieldType}</Button>
          </div>
        </div>
      )
    }

    if (field.fieldType === 'text') {
      return (
        <div className={`space-y-4 ${isMobile ? "px-4 pb-4" : ""}`}>
          <Input
            value={signatureData}
            onChange={(e) => setSignatureData(e.target.value)}
            placeholder="Enter text here..."
            className="w-full"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={() => handleSignatureComplete('text')} disabled={!signatureData.trim()}>
              Add Text
            </Button>
          </div>
        </div>
      )
    }

    return null
  }

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className='min-h-[60svh]'>
          <DrawerHeader>
            <DrawerTitle>
              {field.fieldType === 'text' ? 'Add Text' : `Add ${field.fieldType}`}
            </DrawerTitle>
            {field.fieldType === 'text' && (
              <DrawerDescription>{field.label || 'Enter the required text'}</DrawerDescription>
            )}
          </DrawerHeader>
          {renderContent()}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {field.fieldType === 'signature' || field.fieldType === 'initial' ? (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add {field.fieldType}</DialogTitle>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Text</DialogTitle>
            <DialogDescription>{field.label || 'Enter the required text'}</DialogDescription>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      )}
    </Dialog>
  )
}

export default function SigningField({ field, onComplete, isFocused }: SigningFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [signatureData, setSignatureData] = useState(field.signatureData || '')
  const [typedSignature, setTypedSignature] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  const [activeTab, setActiveTab] = useState('draw')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { pageDimensions, scale } = usePdfDimensions()
  const currentPageDimensions = pageDimensions[field.page]
  const isMobile = useMobile()


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignatureData(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    multiple: false,
  })

  const getFieldIcon = () => {
    switch (field.fieldType) {
      case 'signature': return <PenTool className="w-3 h-3" />
      case 'initial': return <span className="text-xs font-bold">I</span>
      case 'date': return <Calendar className="w-3 h-3" />
      case 'text': return <Type className="w-3 h-3" />
      default: return <PenTool className="w-3 h-3" />
    }
  }

  const getFieldColor = () => {
    if (field.isCompleted) return 'border-green-500 bg-green-50'
    const colors = {
      signature: 'border-blue-500 bg-blue-50',
      initial: 'border-green-500 bg-green-50',
      date: 'border-yellow-500 bg-yellow-50',
      text: 'border-purple-500 bg-purple-50',
    }
    return colors[field.fieldType] || colors.signature
  }

  const handleFieldClick = () => {
    if (field.isCompleted) return
    if (field.fieldType === 'date') {
      const currentDate = new Date().toLocaleDateString()
      onComplete(field.id, currentDate)
      return
    }
    setIsOpen(true)
  }

  const handleSignatureComplete = (activeTab: string) => {
    let finalSignatureData = '';

    if (field.fieldType === 'signature' || field.fieldType === 'initial') {
      if (activeTab === 'draw') {
        const canvas = canvasRef.current
        if (canvas && !isCanvasEmpty(canvas)) {
          finalSignatureData = canvas.toDataURL()
        }
      } else if (activeTab === 'type') {
        if (typedSignature.trim()) {
          finalSignatureData = createTextDataUrl(typedSignature)
        }
      } else if (activeTab === 'upload') {
        finalSignatureData = signatureData
      }
    } else if (field.fieldType === 'text') {
      finalSignatureData = signatureData.trim()
    }

    if (finalSignatureData) {
      onComplete(field.id, finalSignatureData)
      setIsOpen(false)
    }
  }

  const createTextDataUrl = (text: string) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''
    canvas.width = 300
    canvas.height = 80
    ctx.font = '30px "Gochi Hand", cursive'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    return canvas.toDataURL()
  }

  const isCanvasEmpty = (canvas: HTMLCanvasElement) => {
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    return canvas.toDataURL() === blank.toDataURL();
  }

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
      ctx.stroke()
    }
  }

  const stopDrawing = () => setIsDrawing(false)

  // Touch drawing functions for mobile
  const startTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = canvasRef.current
    if (!canvas) return
    setIsDrawing(true)
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const touch = e.touches[0]
    if (ctx && touch) {
      ctx.beginPath()
      ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top)
    }
  }

  const touchDraw = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')
    const touch = e.touches[0]
    if (ctx && touch) {
      ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top)
      ctx.stroke()
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const setupCanvas = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.strokeStyle = '#000000'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }
  }

  const renderFieldContent = () => {
    if (field.isCompleted) {
      return (
        <div className="flex items-center text-xs text-green-700">
          <Check className="w-3 h-3 mr-1" />
          <span>Completed</span>
        </div>
      )
    }
    return (
      <div className="flex items-center text-xs text-gray-600">
        {getFieldIcon()}
        <span className="ml-1 capitalize">
          {field.fieldType}
          {field.isRequired && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
    )
  }

  const pixelX = currentPageDimensions ? field.normalizedX * currentPageDimensions.width : 0
  const pixelY = currentPageDimensions ? field.normalizedY * currentPageDimensions.height : 0
  const pixelWidth = currentPageDimensions ? field.normalizedWidth * currentPageDimensions.width : 0
  const pixelHeight = currentPageDimensions ? field.normalizedHeight * currentPageDimensions.height : 0

  return (
    <>
      <div
        className={`absolute cursor-pointer transition-all hover:shadow-md ${getFieldColor()} ${isFocused ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
        style={{
          left: pixelX * scale,
          top: pixelY * scale,
          width: pixelWidth * scale,
          height: pixelHeight * scale,
        }}
        onClick={handleFieldClick}
      >
        <div className="w-full h-full border-2 border-dashed border-opacity-70 flex items-center justify-center relative group">
          {renderFieldContent()}
          <div className="absolute inset-0 bg-black bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            {field.isCompleted ? `${field.fieldType} completed` : `Click to add ${field.fieldType}`}
          </div>
        </div>
      </div>

      <SigningDialog
        field={field}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        typedSignature={typedSignature}
        setTypedSignature={setTypedSignature}
        signatureData={signatureData}
        setSignatureData={setSignatureData}
        canvasRef={canvasRef}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        handleSignatureComplete={handleSignatureComplete}
        clearCanvas={clearCanvas}
        startDrawing={startDrawing}
        draw={draw}
        stopDrawing={stopDrawing}
        startTouchDrawing={startTouchDrawing}
        touchDraw={touchDraw}
        setupCanvas={setupCanvas}
        isMobile={isMobile}
      />
    </>
  )
}
