"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  PenTool,
  Check,
  Upload,
  TextCursor,
  CalendarDays,
  ALargeSmall,
  Loader2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { usePdfDimensions } from "./PdfDimensionsContext";
import { useMobile } from "@/hooks/useMobile";
import { Label } from "./ui/label";
import { Confetti } from "./ui/confetti";

export interface SignatureFieldData {
  id: string;
  fieldType: "signature" | "initial" | "date" | "text";
  normalizedX: number;
  normalizedY: number;
  normalizedWidth: number;
  normalizedHeight: number;
  page: number;
  assignedToEmail: string;
  isRequired: boolean;
  label?: string;
  isCompleted: boolean;
  signatureData?: string;
}

interface SigningFieldProps {
  field: SignatureFieldData;
  isEditMode: boolean;
  onComplete: (fieldId: string, signatureData: string) => void;
  isFocused?: boolean;
}

interface SigningDialogProps {
  field: SignatureFieldData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  typedSignature: string;
  setTypedSignature: (value: string) => void;
  signatureData: string;
  setSignatureData: (value: string) => void;
  canvasRef: React.RefObject<SignatureCanvas | null>;
  getRootProps: any;
  getInputProps: any;
  handleSignatureComplete: (activeTab: string) => void;
  clearCanvas: () => void;
  isMobile: boolean;
  isCompleting: boolean;
  isSignatureProvided: boolean;
  agreementChecked: boolean;
  setAgreementChecked: (checked: boolean) => void;
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
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
  isMobile,
  isCompleting,
  isSignatureProvided,
  agreementChecked,
  setAgreementChecked,
  showSuccess,
  setShowSuccess,
}: SigningDialogProps) {
  const renderContent = () => {
    if (showSuccess) {
      // Success state content
      return (
        <div className={`text-center py-8 ${isMobile ? "px-4 pb-4" : ""}`}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Signature Added!</h3>
          <p className="text-gray-600 mb-6">
            Your {field.fieldType} has been successfully added to the document.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                onOpenChange(false);
                setShowSuccess(false); // Reset success state
              }}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        </div>
      );
    }

    if (field.fieldType === "signature" || field.fieldType === "initial") {
      return (
        <div className={isMobile ? "px-4 pb-4" : ""}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="draw">
              <div className="border rounded-lg bg-gray-50 w-full h-[250px] cursor-crosshair mt-4">
                <SignatureCanvas
                  ref={canvasRef}
                  penColor="black"
                  canvasProps={{
                    className: "w-full h-full bg-transparent",
                  }}
                />
              </div>
              <Button variant="outline" onClick={clearCanvas} className="mt-2">
                Clear
              </Button>
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
                  <p
                    className="text-3xl font-serif"
                    style={{ fontFamily: '"Gochi Hand", cursive' }}
                  >
                    {typedSignature}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="upload">
              <div
                {...getRootProps()}
                className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50"
              >
                <input {...getInputProps()} />
                {signatureData ? (
                  <Image
                    src={signatureData}
                    alt="Signature preview"
                    width={150}
                    height={75}
                    className="max-h-24 mx-auto object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p>Drag &amp; drop an image, or click to select</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex items-start space-x-2 mt-4">
            <Checkbox
              id="agreement-checkbox"
              checked={agreementChecked}
              onCheckedChange={setAgreementChecked}
            />
            <Label 
              htmlFor="agreement-checkbox" 
              className="text-sm text-muted-foreground leading-tight"
            >
              By signing, you agree to be legally bound by this electronic
              signature.
            </Label>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSignatureComplete(activeTab)}
              disabled={isCompleting || !isSignatureProvided || !agreementChecked}
            >
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing...
                </>
              ) : (
                "Sign and Accept"
              )}
            </Button>
          </div>
        </div>
      );
    }

    if (field.fieldType === "text") {
      return (
        <div className={`space-y-4 ${isMobile ? "px-4 pb-4" : ""}`}>
          <Input
            value={signatureData}
            onChange={(e) => setSignatureData(e.target.value)}
            placeholder="Enter text here..."
            className="w-full"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSignatureComplete("text")}
              disabled={isCompleting || !isSignatureProvided}
            >
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Text"
              )}
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="min-h-[70svh] rounded-t-xl">
          <div className="mx-auto w-16 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 my-4" /> {/* Separator */}
          <SheetHeader>
            <SheetTitle>
              {field.fieldType === "text"
                ? "Add Text"
                : `Add ${field.fieldType}`}
            </SheetTitle>
            {field.fieldType === "text" && (
              <SheetDescription>
                {field.label || "Enter the required text"}
              </SheetDescription>
            )}
          </SheetHeader>
          {renderContent()}
        </SheetContent>
      </Sheet>
);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {field.fieldType === "signature" || field.fieldType === "initial" ? (
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
            <DialogDescription>
              {field.label || "Enter the required text"}
            </DialogDescription>
          </DialogHeader>
          {renderContent()}
        </DialogContent>
      )}
    </Dialog>
  );
}

export default function SigningField({
  field,
  onComplete,
  isFocused,
}: SigningFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [signatureData, setSignatureData] = useState(field.signatureData || "");
  const [typedSignature, setTypedSignature] = useState("");
  const [activeTab, setActiveTab] = useState("draw");
  const canvasRef = useRef<SignatureCanvas>(null);
  const { pageDimensions, scale } = usePdfDimensions();
  const currentPageDimensions = pageDimensions[field.page];
  const isMobile = useMobile();
  const mobileSize = 40; // Define mobile size for consistent field appearance
  const [isCompleting, setIsCompleting] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignatureData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });

  const getFieldIcon = () => {
    switch (field.fieldType) {
      case "signature":
        return <PenTool size={16} strokeWidth={1.5} />;
      case "initial":
        return <TextCursor size={16} strokeWidth={1.5} />;
      case "date":
        return <CalendarDays size={16} strokeWidth={1.5} />;
      case "text":
        return <ALargeSmall size={16} strokeWidth={1.5} />;
      default:
        return <PenTool size={16} strokeWidth={1.5} />;
    }
  };

  const getFieldColor = () => {
    if (field.isCompleted) {
      return "border-green-600 bg-green-100"; 
    }
    const colors = {
      signature: "border-blue-500 bg-blue-200",
      initial: "border-green-500 bg-green-200",
      date: "border-yellow-500 bg-yellow-200",
      text: "border-purple-500 bg-purple-200",
    };
    return colors[field.fieldType] || colors.signature;
  };

  const handleFieldClick = () => {
    if (field.isCompleted) return;
    if (field.fieldType === "date") {
      const currentDate = new Date().toLocaleDateString();
      onComplete(field.id, currentDate);
      return;
    }
    setIsOpen(true);
    setAgreementChecked(false); // Reset agreement checkbox when dialog opens
  };

  const handleSignatureComplete = async (activeTab: string) => {
    let finalSignatureData = "";

    if (field.fieldType === "signature" || field.fieldType === "initial") {
      if (activeTab === "draw") {
        const sigCanvas = canvasRef.current;
        if (sigCanvas && !sigCanvas.isEmpty()) {
          finalSignatureData = sigCanvas.toDataURL("image/png");
        }
      } else if (activeTab === "type") {
        if (typedSignature.trim()) {
          finalSignatureData = createTextDataUrl(typedSignature);
        }
      } else if (activeTab === "upload") {
        finalSignatureData = signatureData;
      }
    } else if (field.fieldType === "text") {
      finalSignatureData = signatureData.trim();
    }

    if (finalSignatureData) {
      setIsCompleting(true);
      try {
        await onComplete(field.id, finalSignatureData);
        // Don't close the dialog yet, show success state first
        setShowSuccess(true);
        setShowConfetti(true);
        // Hide confetti after it completes
        setTimeout(() => setShowConfetti(false), 3000);
      } finally {
        setIsCompleting(false);
      }
    }
  };

  const isSignatureProvided = () => {
    if (field.fieldType === "text") {
      return signatureData.trim() !== "";
    }
    if (activeTab === "draw") {
      return !canvasRef.current?.isEmpty();
    }
    if (activeTab === "type") {
      return typedSignature.trim() !== "";
    }
    if (activeTab === "upload") {
      return signatureData !== "";
    }
    return false;
  };

  const createTextDataUrl = (text: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    canvas.width = 300;
    canvas.height = 80;
    ctx.font = '30px "Gochi Hand", cursive';
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL();
  };

  const clearCanvas = () => {
    canvasRef.current?.clear();
  };

  const renderFieldContent = () => {
    if (field.isCompleted) {
      return (
        <div className="flex items-center text-xs text-green-800">
          <Check className={`w-3 h-3 ${isMobile ? "" : "mr-1"}`} />
          {isMobile ? null : <span>Completed</span>}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Button
          variant="secondary"
          className="w-full h-full rounded-full"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {getFieldIcon()}
        </Button>
      );
    }

    return (
      <div className="flex items-center">
        {getFieldIcon()}
        <span className="ml-1 capitalize">
          {field.label || field.fieldType}{" "}
          {field.isRequired && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
    );
  };

  const pixelX = currentPageDimensions
    ? field.normalizedX * currentPageDimensions.width
    : 0;
  const pixelY = currentPageDimensions
    ? field.normalizedY * currentPageDimensions.height
    : 0;
  const pixelWidth = currentPageDimensions
    ? field.normalizedWidth * currentPageDimensions.width
    : 0;
  const pixelHeight = currentPageDimensions
    ? field.normalizedHeight * currentPageDimensions.height
    : 0;

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti 
            className="w-full h-full"
            options={{
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            }}
          />
        </div>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`absolute cursor-pointer transition-all hover:shadow-md ${getFieldColor()} ${isFocused ? "ring-2 ring-offset-2 ring-blue-500" : ""} ${isMobile ? "rounded-full" : ""}`}
              style={{
                left: pixelX * scale,
                top: pixelY * scale,
                width: (isMobile ? mobileSize : pixelWidth) * scale,
                height: (isMobile ? mobileSize : pixelHeight) * scale,
              }}
              onClick={handleFieldClick}
            >
              <div className="w-full h-full border-2 border-dashed flex items-center justify-center relative group">
                {renderFieldContent()}
                <div className="absolute inset-0 bg-black bg-opacity-5 opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {field.isCompleted
              ? `${field.fieldType} completed`
              : `Click to add ${field.fieldType}`}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SigningDialog
        field={field}
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setAgreementChecked(false); // Reset checkbox when dialog is closed
            setShowSuccess(false); // Reset success state when dialog closes
          }
        }}
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
        isMobile={isMobile}
        isCompleting={isCompleting}
        isSignatureProvided={isSignatureProvided()}
        agreementChecked={agreementChecked}
        setAgreementChecked={setAgreementChecked}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
      />
    </>
  );
}