"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ALargeSmall,
  CalendarDays,
  Check,
  Loader2,
  PenTool,
  TextCursor,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import SignatureCanvas from "react-signature-canvas";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { SignatureIcon } from "./SignatureIcon";
import { Label } from "./ui/label";

export interface SignatureFieldData {
  id: string;
  fieldType: "signature" | "initial" | "date" | "text";
  normalizedX: number;
  normalizedY: number;
  normalizedWidth: number;
  normalizedHeight: number;
  page: number;
  signerEmail: string;
  isRequired: boolean;
  label?: string;
  isCompleted: boolean;
  signatureData?: string;
}

interface SigningFieldProps {
  field: SignatureFieldData;
  isEditMode?: boolean;
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
  hasSigned: boolean;
  setHasSigned: (val: boolean) => void;
}

const SIGNER_COLORS = [
  "border-blue-500 bg-blue-50 text-blue-600",
  "border-indigo-500 bg-indigo-50 text-indigo-600",
  "border-red-500 bg-red-50 text-red-600",
  "border-emerald-500 bg-emerald-50 text-emerald-600",
  "border-amber-500 bg-amber-50 text-amber-600",
  "border-rose-500 bg-rose-50 text-rose-600",
];

const getSignerColor = (email: string) => {
  if (!email) return "border-blue-500 bg-blue-50 text-blue-600 rounded-none";
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 4) - hash);
  }
  const index = Math.abs(hash) % SIGNER_COLORS.length;
  return SIGNER_COLORS[index] + " rounded-none";
};

const getFieldIcon = (fieldType: string) => {
  switch (fieldType) {
    case "signature":
      return <SignatureIcon className="w-6 h-6" />;
    case "initial":
      return <TextCursor size={16} strokeWidth={1.5} />;
    case "date":
      return <CalendarDays size={16} strokeWidth={1.5} />;
    case "text":
      return <ALargeSmall size={16} strokeWidth={1.5} />;
    default:
      return <SignatureIcon className="w-6 h-6" />;
  }
};

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
  hasSigned,
  setHasSigned,
}: SigningDialogProps) {
  // Auto-close the dialog after showing success message
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess) {
      timer = setTimeout(() => {
        onOpenChange(false);
        setShowSuccess(false);
      }, 800); // Close faster (previously 1500ms)
    }
    return () => clearTimeout(timer);
  }, [showSuccess, onOpenChange, setShowSuccess]);

  const renderContent = () => {
    if (showSuccess) {
      // Success state content
      return (
        <div className={`text-center py-10 animate-in fade-in zoom-in duration-300 ${isMobile ? "px-4 pb-4" : ""}`}>
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-gray-900">Successfully Signed!</h3>
          <p className="text-gray-500 mb-8 max-w-[280px] mx-auto text-sm">
            Your {field.fieldType} has been added to the document securely.
          </p>
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-4 h-4 text-primary animate-spin" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              Returning to document
            </span>
          </div>
        </div>
      );
    }

    if (field.fieldType === "signature" || field.fieldType === "initial") {
      return (
        <div className={isMobile ? "px-4 pb-4" : ""}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
            <TabsList className="grid w-full grid-cols-3 p-1 bg-gray-100/30 backdrop-blur-md h-10 rounded-lg mb-4">
              <TabsTrigger
                value="draw"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary transition-all duration-300 font-semibold text-[10px] uppercase tracking-wider"
              >
                Draw
              </TabsTrigger>
              <TabsTrigger
                value="type"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary transition-all duration-300 font-semibold text-[10px] uppercase tracking-wider"
              >
                Type
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary transition-all duration-300 font-semibold text-[10px] uppercase tracking-wider"
              >
                Upload
              </TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl blur-[2px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative border border-gray-100 rounded-xl bg-white w-full h-[200px] cursor-crosshair overflow-hidden">
                  <SignatureCanvas
                    ref={canvasRef}
                    penColor="#0f172a"
                    backgroundColor="transparent"
                    onEnd={() => setHasSigned(true)}
                    canvasProps={{
                      className: "w-full h-full",
                    }}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2 opacity-20 pointer-events-none">
                    <PenTool className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Signature area</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCanvas}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 text-[10px] font-semibold uppercase tracking-widest h-8 cursor-pointer"
                >
                  Clear Canvas
                </Button>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    hasSigned ? "bg-green-500" : "bg-gray-200"
                  )} />
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    {hasSigned
                      ? "Captured"
                      : "Awaiting signature"}
                  </span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="type" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300 text-center">
              <Input
                placeholder="Type your name..."
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                className="h-12 text-base border focus-visible:ring-primary/10 bg-gray-50/50 rounded-lg text-center"
              />
              <div className="mt-6 p-10 border border-gray-100 rounded-xl bg-white flex items-center justify-center min-h-[120px] relative group overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-50 to-transparent opacity-30" />
                {typedSignature ? (
                  <p
                    className="text-4xl font-serif text-gray-900 leading-tight select-none pointer-events-none"
                    style={{ fontFamily: '"Style Script", cursive' }}
                  >
                    {typedSignature}
                  </p>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-gray-300">
                    <span className="text-xs italic">Signature preview</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="upload" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-100 rounded-xl p-6 text-center cursor-pointer hover:border-primary/30 hover:bg-primary/[0.01] transition-all duration-500 group bg-gray-50/10"
              >
                <input {...getInputProps()} />
                {signatureData ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <Image
                        src={signatureData}
                        alt="Signature preview"
                        width={200}
                        height={96}
                        className="max-h-24 mx-auto object-contain p-2 bg-white rounded-lg border border-gray-50"
                      />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border text-[9px] font-semibold uppercase tracking-wider text-gray-400 group-hover:text-primary transition-colors">
                        <Upload className="w-2.5 h-2.5" />
                        Replace
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 py-1">
                    <div className="w-10 h-10 bg-white rounded-2xl border flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-500">
                      <Upload className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-gray-900">Upload signature</p>
                      <p className="text-[10px] text-gray-400">Drag & drop or click</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-2 border-t border-gray-50">
            <div className="bg-gray-50/50 rounded-2xl border border-gray-100/50 p-4 transition-all duration-300 hover:bg-gray-50/80 group">
              <div className="flex items-start gap-3.5">
                <div className="pt-0.5">
                  <Checkbox
                    id="agreement-checkbox"
                    checked={agreementChecked}
                    onCheckedChange={(checked) => setAgreementChecked(checked as boolean)}
                    className="w-4 h-4 rounded border-gray-300 data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 transition-all duration-300"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Label
                    htmlFor="agreement-checkbox"
                    className="block text-[11px] font-semibold uppercase tracking-wider text-gray-900 cursor-pointer"
                  >
                    Legal Binding Agreement
                  </Label>
                  <Label
                    htmlFor="agreement-checkbox"
                    className="block text-[10px] text-gray-500 leading-relaxed cursor-pointer select-none font-medium group-hover:text-gray-600 transition-colors"
                  >
                    I understand that this is a legally binding electronic signature. By checking this box, I agree to be bound by the terms of this document.
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-6">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="px-8 font-semibold uppercase tracking-[0.15em] text-[9px] h-11 text-gray-400 hover:text-gray-900 hover:bg-transparent cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSignatureComplete(activeTab)}
              disabled={isCompleting || !isSignatureProvided || !agreementChecked}
              className="w-full sm:w-auto px-10 h-11 font-semibold uppercase tracking-[0.15em] text-[9px] transition-all duration-300 disabled:opacity-40 cursor-pointer"
            >
              {isCompleting ? (
                <div className="flex items-center gap-1.5">
                  <Loader2 className="h-2.5 w-2.5 animate-spin" />
                  <span>Processing</span>
                </div>
              ) : (
                "Sign & Complete"
              )}
            </Button>
          </div>
        </div>
      );
    }

    if (field.fieldType === "text") {
      return (
        <div className={`space-y-6 ${isMobile ? "px-4 pb-4" : ""}`}>
          <div className="space-y-3">
            <Label htmlFor="text-field" className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {field.label || "Enter text content"}
              {field.isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id="text-field"
              autoFocus
              value={signatureData}
              onChange={(e) => setSignatureData(e.target.value)}
              placeholder="Start typing..."
              className="w-full h-14 text-lg border-2 focus-visible:ring-primary/20 bg-gray-50/50 rounded-xl"
            />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="px-8 font-semibold uppercase tracking-widest text-[10px] h-11 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSignatureComplete("text")}
              disabled={isCompleting || !isSignatureProvided}
              className="px-8 bg-gray-900 hover:bg-black text-white rounded-xl h-11 font-semibold uppercase tracking-widest text-[10px] cursor-pointer"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Field"
              )}
            </Button>
          </div>
        </div>
      );
    }

    if (field.fieldType === "date") {
      return (
        <div className={`space-y-6 ${isMobile ? "px-4 pb-4" : ""}`}>
          <div className="space-y-3">
            <Label htmlFor="date-field" className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {field.label || "Select a date"}
              {field.isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className={cn(
                      "w-full h-14 justify-start text-left font-normal border-2 bg-gray-50/50 hover:bg-white transition-all rounded-xl px-4 cursor-pointer",
                      !signatureData && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-3 h-5 w-5 text-primary/60" />
                    {signatureData ? (
                      <span className="text-gray-900 font-medium">
                        {format(new Date(signatureData), "PPP")}
                      </span>
                    ) : (
                      <span className="text-gray-400">Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl border shadow-2xl overflow-hidden" align="start">
                  <div className="bg-white p-1">
                    <Calendar
                      mode="single"
                      selected={signatureData ? new Date(signatureData) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
                          setSignatureData(formattedDate);
                        }
                      }}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear() + 10}
                      className="p-3"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="px-8 font-semibold uppercase tracking-widest text-[10px] h-11 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleSignatureComplete("date")}
              disabled={isCompleting || !signatureData}
              className="px-8 bg-gray-900 hover:bg-black text-white rounded-xl h-11 font-semibold uppercase tracking-widest text-[10px] cursor-pointer"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Field"
              )}
            </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className={cn(
        "bg-white border focus-visible:outline-none overflow-hidden p-0",
        (field.fieldType === "signature" || field.fieldType === "initial") ? "sm:max-w-xl" : "sm:max-w-lg"
      )}>
        <ResponsiveDialogHeader className="p-6 pb-2 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
            {getFieldIcon(field.fieldType)}
          </div>
          <ResponsiveDialogTitle className="text-2xl font-semibold tracking-tight text-gray-900">
            {field.fieldType === "text" ? (field.label || "Fill details") : `Create your ${field.fieldType}`}
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription className="text-gray-400 font-medium text-[13px]">
            {field.fieldType === "text"
              ? "Please provide the requested information below"
              : `Use your preferred method to create a secure digital ${field.fieldType}`}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <div className="md:px-8 pb-8">
          {renderContent()}
        </div>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
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
  const [isCompleting, setIsCompleting] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

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

  const getFieldColor = () => {
    if (field.isCompleted) {
      return "border-transparent bg-transparent text-gray-900";
    }
    return cn(
      "border transition-all duration-300 backdrop-blur-[2px]",
      getSignerColor(field.signerEmail)
    );
  };

  const handleFieldClick = useCallback(() => {
    if (field.isCompleted) return;
    if (field.fieldType === "date") {
      setIsOpen(true);
      // Initialize with current date if no date is selected yet
      if (!signatureData) {
        const now = new Date();
        const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
        setSignatureData(formattedDate);
      }
      return;
    }
    setIsOpen(true);
    setAgreementChecked(false); // Reset agreement checkbox when dialog opens
    setHasSigned(false); // Reset signed state when dialog opens
  }, [field.isCompleted, field.fieldType, signatureData, setSignatureData]);

  useEffect(() => {
    if (isFocused && !field.isCompleted && !isOpen) {
      handleFieldClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, field.isCompleted, handleFieldClick]);

  const createTextDataUrl = (text: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Increase canvas resolution for sharper text in PDF
    canvas.width = 1200;
    canvas.height = 320;

    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Adobe Sign typically uses a script font for typed signatures
    ctx.font = 'italic 140px "Style Script", cursive';
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Subtle shadow for depth
    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Position text lower (65% of height) to align with bottom of signature field
    ctx.fillText(text, canvas.width / 2, canvas.height * 0.65);
    return canvas.toDataURL("image/png", 1.0);
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
    } else if (field.fieldType === "date") {
      finalSignatureData = signatureData; // Date is already formatted as MM/DD/YYYY
    }

    if (finalSignatureData) {
      setIsCompleting(true);
      try {
        await onComplete(field.id, finalSignatureData);
        // Don't close the dialog yet, show success state first
        setShowSuccess(true);
      } finally {
        setIsCompleting(false);
      }
    }
  };

  const isSignatureProvided = () => {
    if (field.fieldType === "text") {
      return signatureData.trim() !== "";
    }
    if (field.fieldType === "date") {
      return signatureData !== ""; // Date field is considered provided if there's a date selected
    }
    if (activeTab === "draw") {
      return hasSigned;
    }
    if (activeTab === "type") {
      return typedSignature.trim() !== "";
    }
    if (activeTab === "upload") {
      return signatureData !== "";
    }
    return false;
  };

  const clearCanvas = () => {
    canvasRef.current?.clear();
    setHasSigned(false);
  };

  const renderFieldContent = () => {
    if (field.isCompleted) {
      if (field.fieldType === "signature" || field.fieldType === "initial") {
        return (
          <div className="w-full h-full flex items-center justify-center p-1">
            <Image
              src={field.signatureData || ""}
              alt="Signature"
              width={200}
              height={100}
              className="max-w-full max-h-full object-contain filter"
            />
          </div>
        );
      }
      return (
        <div className="flex items-center justify-center w-full h-full px-2">
          <span className="text-sm font-medium tracking-tight text-gray-900 font-serif">
            {field.signatureData}
          </span>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full flex items-stretch overflow-visible group/adobe cursor-pointer select-none">
        {/* Floating Label - Top Left outside */}
        {field.label && (
          <div className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-t-md border-b-0 animate-in fade-in slide-in-from-bottom-1 box-content h-4 z-10 transition-colors group-hover/adobe:border-gray-300">
            <div className={cn("w-1.5 h-1.5 rounded-full", getSignerColor(field.signerEmail).split(' ')[0].replace('border-', 'bg-'))} />
            <span className="text-[10px] font-semibold text-gray-600 truncate max-w-[150px]">
              {field.label}
            </span>
          </div>
        )}

        {/* Adobe-style colored Side Flag (Sign Indicator) */}
        {!field.isCompleted && (
          <div
            className={cn(
              "w-8 flex flex-col items-center justify-center shrink-0 relative",
              getSignerColor(field.signerEmail).split(' ')[0].replace('border-', 'bg-')
            )}
          >
            <span className="[writing-mode:vertical-lr] rotate-180 text-[9px] font-black text-white uppercase tracking-widest py-1 select-none">
              {field.fieldType === "signature" ? "SIGN" : field.fieldType === "initial" ? "INIT" : "FILL"}
            </span>
            {/* The signature-pointing arrow */}
            <div className={cn(
              "absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45 z-10",
              getSignerColor(field.signerEmail).split(' ')[0].replace('border-', 'bg-')
            )} />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center relative p-2 min-w-0">
          <div className="opacity-40 scale-110">
            {getFieldIcon(field.fieldType)}
          </div>

          {/* Adobe-style corner detail */}
          {!field.isCompleted && (
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-r border-b border-gray-400/30" />
          )}
        </div>
      </div>
    );
  };

  if (!currentPageDimensions) return null;

  const pixelX = field.normalizedX * currentPageDimensions.width;
  const pixelY = field.normalizedY * currentPageDimensions.height;
  const pixelWidth = field.normalizedWidth * currentPageDimensions.width;
  const pixelHeight = field.normalizedHeight * currentPageDimensions.height;

  return (
    <>
      <div
        id={`field-${field.id}`}
        className={cn(
          "absolute cursor-pointer group/field transition-all duration-300 rounded",
          getFieldColor()
        )}
        style={{
          left: pixelX * scale,
          top: pixelY * scale,
          width: pixelWidth * scale,
          height: pixelHeight * scale,
          borderStyle: field.isCompleted ? 'solid' : 'dashed'
        }}
        onClick={handleFieldClick}
      >
        <div className="w-full h-full flex items-center justify-center relative group">
          {renderFieldContent()}
        </div>
      </div>

      <SigningDialog
        field={field}
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setAgreementChecked(false); // Reset checkbox when dialog is closed
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
        hasSigned={hasSigned}
        setHasSigned={setHasSigned}
      />
    </>
  );
}