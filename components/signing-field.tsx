"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarDays,
  Check,
  Loader2, Upload,
  X
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import SignatureCanvas from "react-signature-canvas";
import { usePdfDimensions } from "./PdfDimensionsContext";
import { SignatureFieldData as BaseSignatureFieldData } from "./signature-field";
import { FIELDS } from "@/components/fields/field-types";
import { Label } from "./ui/label";
import { SignatureIcon } from "./SignatureIcon";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

export interface SignatureFieldData extends BaseSignatureFieldData {
  signatureData?: string;
}

interface SigningFieldProps {
  field: SignatureFieldData;
  isEditMode?: boolean;
  onComplete: (fieldId: string, signatureData: string) => void;
  isFocused?: boolean;
}

interface SigningPanelProps {
  field: SignatureFieldData;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  typedSignature: string;
  setTypedSignature: (value: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
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
  hasSigned: boolean;
  setHasSigned: (val: boolean) => void;
}

const SIGNER_COLORS = [
  "border-indigo-500 bg-indigo-50 text-indigo-600",
  "border-emerald-500 bg-emerald-50 text-emerald-600",
  "border-amber-500 bg-amber-50 text-amber-600",
  "border-rose-500 bg-rose-50 text-rose-600",
  "border-blue-500 bg-blue-50 text-blue-600",
  "border-violet-500 bg-violet-50 text-violet-600",
];

const SIGNATURE_FONTS = [
  { id: "style-script", name: "Style Script", font: '"Style Script", cursive' },
  { id: "dancing-script", name: "Dancing Script", font: '"Dancing Script", cursive' },
  { id: "great-vibes", name: "Great Vibes", font: '"Great Vibes", cursive' },
  { id: "alex-brush", name: "Alex Brush", font: '"Alex Brush", cursive' },
  { id: "satisfy", name: "Satisfy", font: '"Satisfy", cursive' },
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
  const field = FIELDS.find(f => f.id === fieldType);
  if (field) {
    const Icon = field.icon;
    return <Icon className="w-6 h-6" />;
  }
  return <SignatureIcon className="w-6 h-6" />;
};

function SigningPanel({
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
  isCompleting,
  isSignatureProvided,
  agreementChecked,
  setAgreementChecked,
  hasSigned,
  setHasSigned,
  selectedFont,
  setSelectedFont,
}: SigningPanelProps) {
  const isSignatureField = field.fieldType === "signature" || field.fieldType === "initial";

  const renderFooter = () => (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-end gap-3 w-full">
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="px-6 h-11 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          Cancel
        </Button>
        <Button
          onClick={() => handleSignatureComplete(activeTab)}
          disabled={isCompleting || !isSignatureProvided || (isSignatureField && !agreementChecked)}
          className={cn(
            "px-10 h-11 font-bold text-sm transition-all duration-200 disabled:opacity-40 rounded-full shadow-lg shadow-blue-500/20",
            "bg-[#1473E6] text-white hover:bg-[#0d66d0] hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
          )}
        >
          {isCompleting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            field.fieldType === "signature" || field.fieldType === "initial" ? "Apply" : "Continue"
          )}
        </Button>
      </div>
      {isSignatureField && (
        <p className="text-[11px] text-gray-400 leading-relaxed text-right font-medium">
          By clicking Apply, I agree that this signature will be my electronic representation for all purposes.
        </p>
      )}
    </div>
  );

  const renderContent = () => {
    switch (field.fieldType) {
      case "signature":
      case "initial":
        return (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex w-full justify-startmb-6">
                <TabsTrigger value="draw">Draw</TabsTrigger>
                <TabsTrigger value="type" >Type</TabsTrigger>
                <TabsTrigger value="upload">Image</TabsTrigger>
              </TabsList>
              <div className="w-full">
                <TabsContent value="draw" className="mt-0">
                  <div className="relative border border-gray-200 bg-gray-50/30 w-full h-[240px] overflow-hidden rounded-xl">
                    <SignatureCanvas
                      ref={canvasRef}
                      penColor="#000000"
                      velocityFilterWeight={0.7}
                      minWidth={1.5}
                      maxWidth={4}
                      backgroundColor="transparent"
                      onEnd={() => {
                        setHasSigned(true);
                        if (canvasRef.current) setSignatureData(canvasRef.current.toDataURL());
                      }}
                      canvasProps={{ className: "w-full h-full cursor-crosshair" }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCanvas}
                      className="absolute top-4 right-4 text-gray-400 hover:text-black text-[10px] font-bold uppercase tracking-widest h-8"
                    >
                      Clear
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="type" className="mt-0 space-y-4">
                  <Input
                    placeholder="Type your name here"
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    className="h-20 text-4xl text-lg sm:text-2xl text-center transition-colors placeholder:text-gray-200"
                    style={{ fontFamily: SIGNATURE_FONTS.find(f => f.id === selectedFont)?.font }}
                  />
                  <div className="flex flex-wrap items-center justify-center gap-2 py-6">
                    {SIGNATURE_FONTS.map((font) => (
                      <button
                        key={font.id}
                        onClick={() => setSelectedFont(font.id)}
                        className={cn(
                          "px-6 py-4 border transition-all text-center rounded-lg min-w-[120px]",
                          selectedFont === font.id ? "border-[#1473E6] bg-[#1473E6]/5 ring-4 ring-[#1473E6]/5" : "border-gray-100 hover:border-gray-200 bg-white"
                        )}
                      >
                        <span
                          className={cn(
                            "text-2xl block leading-none",
                            selectedFont === font.id ? "text-[#1473E6]" : "text-gray-600"
                          )}
                          style={{ fontFamily: font.font }}
                        >
                          {typedSignature || "Signature"}
                        </span>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="upload" className="mt-0">
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-gray-200 bg-gray-50/30 rounded-2xl p-16 text-center cursor-pointer hover:border-[#1473E6]/40 hover:bg-[#1473E6]/5 transition-all"
                  >
                    <input {...getInputProps()} />
                    {signatureData && activeTab === 'upload' ? (
                      <div className="relative inline-block border-2 border-white bg-white p-6 shadow-xl rounded-lg">
                        <Image src={signatureData} alt="Preview" width={300} height={100} className="max-h-24 object-contain mx-auto" />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute -top-3 -right-3 h-6 w-6 rounded-full p-0 shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSignatureData("");
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-[#1473E6]" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-gray-900">Drag signature image here</p>
                          <p className="text-sm text-gray-500 mt-1">or click to browse from files</p>
                        </div>
                        <p className="text-[11px] text-gray-400 tracking-wide uppercase font-bold pt-4">PNG, JPG, SVG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            <div className="flex items-center gap-3 py-3 px-1 rounded-lg transition-colors hover:bg-gray-50">
              <Checkbox
                id="agreement"
                checked={agreementChecked}
                onCheckedChange={(c) => setAgreementChecked(c as boolean)}
                className="w-5 h-5 rounded-md border-gray-300 data-[state=checked]:bg-[#1473E6] data-[state=checked]:border-[#1473E6] transition-all"
              />
              <Label htmlFor="agreement" className="text-[13px] font-semibold text-gray-700 cursor-pointer select-none">
                Save as my signature
              </Label>
            </div>
          </div>
        );

      case "text":
      case "email":
        return (
          <div className="w-full space-y-6">
            <div className="space-y-4">
              <Label className="text-sm tracking-tight">{field.label || "Enter information"}</Label>
              <Input
                id="field-input"
                autoFocus
                type={field.fieldType === "email" ? "email" : "text"}
                value={signatureData}
                onChange={(e) => setSignatureData(e.target.value)}
                placeholder={field.label || (field.fieldType === "email" ? "Enter email address" : "Enter text...")}
              />
            </div>
          </div>
        );

      case "date":
        return (
          <div className="w-full space-y-6">
            <div className="space-y-4">
              <Label className="text-sm tracking-tight">{field.label || "Select date"}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className="w-full"
                  >
                    <CalendarDays className="mr-3 h-6 w-6 text-[#1473E6]" />
                    {signatureData ? format(new Date(signatureData), "PPP") : <span className="text-gray-200">Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={signatureData ? new Date(signatureData) : undefined}
                    onSelect={(d) => d && setSignatureData(`${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`)}
                    initialFocus
                    className="p-4 bg-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );

      case "radio":
      case "dropdown":
        return (
          <div className="w-full space-y-6">
            <div className="space-y-4">
              <Label className="text-sm tracking-tight">{field.label || "Select option"}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(field.options || []).map((option, i) => (
                  <Button
                    key={i}
                    variant={signatureData === option ? "default" : "outline"}
                    onClick={() => setSignatureData(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="w-full space-y-6">
            <div className="space-y-6">
              <Label className="text-sm font-bold text-gray-900 tracking-tight">{field.label || "Confirmation"}</Label>
              <div
                onClick={() => setSignatureData(signatureData === "checked" ? "" : "checked")}
                className={cn(
                  "w-full h-20 rounded-2xl border-2 flex items-center px-6 cursor-pointer transition-all",
                  signatureData === "checked"
                    ? "bg-[#1473E6]/5 border-[#1473E6] shadow-xl shadow-blue-500/5"
                    : "border-gray-100 hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all mr-5",
                  signatureData === "checked" ? "bg-[#1473E6] border-[#1473E6]" : "border-gray-200 bg-white"
                )}>
                  {signatureData === "checked" && <Check className="w-5 h-5 text-white stroke-[4]" />}
                </div>
                <span className={cn(
                  "text-lg font-bold",
                  signatureData === "checked" ? "text-[#1473E6]" : "text-gray-600"
                )}>
                  {field.label || "Click here to confirm"}
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === "Enter" && !e.shiftKey) {
        const canSubmit = !isCompleting && isSignatureProvided && (isSignatureField ? agreementChecked : true);
        if (canSubmit) {
          e.preventDefault();
          handleSignatureComplete(activeTab);
        }
      }
      if (isOpen && e.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isCompleting, agreementChecked, activeTab, isSignatureProvided, isSignatureField, handleSignatureComplete, onOpenChange]);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto max-w-2xl bg-white border-t rounded-t-[32px] shadow-2xl overflow-hidden focus:outline-none">
        <DrawerHeader className="px-8 sm:px-12 pt-8 pb-2">
          <DrawerTitle className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            {field.label || (isSignatureField ? "Create Signature" : "Required Information")}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500 mt-2 font-medium">
            Please complete the required field below to proceed.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-8 sm:px-12 py-8 overflow-y-auto max-h-[70vh]">
          {renderContent()}
        </div>

        <DrawerFooter className="px-8 sm:px-12 pb-12 pt-6 border-t bg-gray-50/50">
          {renderFooter()}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
  const [selectedFont, setSelectedFont] = useState(SIGNATURE_FONTS[0].id);
  const [activeTab, setActiveTab] = useState("draw");
  const canvasRef = useRef<SignatureCanvas>(null);
  const { pageDimensions, scale } = usePdfDimensions();
  const currentPageDimensions = pageDimensions[field.page];
  const isMobile = useMobile();
  const [isCompleting, setIsCompleting] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
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

    // Checkbox special handling: toggle nicely without full dialog if desired,
    // BUT since we need to confirm and save to backend, a dialog or just immediate save is best.
    // For consistency with other fields, we'll open the dialog, but user experience could be better with immediate toggle.
    // Let's stick to consistent dialog for now as per instructions, or maybe improve later.

    if (field.fieldType === "date") {
      setIsOpen(true);
      if (!signatureData) {
        const now = new Date();
        const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
        setSignatureData(formattedDate);
      }
      return;
    }

    setIsOpen(true);
    setAgreementChecked(false);
    setHasSigned(false);
  }, [field.isCompleted, field.fieldType, signatureData, setSignatureData]);

  useEffect(() => {
    if (isFocused && !field.isCompleted) {
      // Ensure the field is visible when focused
      const timer = setTimeout(() => {
        const element = document.getElementById(`field-${field.id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      if (!isOpen) {
        handleFieldClick();
      }
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, field.isCompleted, field.id, handleFieldClick]);

  const createTextDataUrl = (text: string, fontId: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    const selectedFontConfig = SIGNATURE_FONTS.find(f => f.id === fontId) || SIGNATURE_FONTS[0];

    // Increase canvas resolution for sharper text in PDF
    canvas.width = 1200;
    canvas.height = 300;

    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font based on selection
    ctx.font = `italic 140px ${selectedFontConfig.font}`;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // subtle depth
    ctx.shadowColor = "rgba(0,0,0,0.05)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Draw text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
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
          finalSignatureData = createTextDataUrl(typedSignature, selectedFont);
        }
      } else if (activeTab === "upload") {
        finalSignatureData = signatureData;
      }
    } else if (field.fieldType === "text" || field.fieldType === "email" || field.fieldType === "radio" || field.fieldType === "dropdown" || field.fieldType === "checkbox") {
      finalSignatureData = signatureData.trim();
    } else if (field.fieldType === "date") {
      finalSignatureData = signatureData; // Date is already formatted as MM/DD/YYYY
    }

    const canComplete = finalSignatureData !== "" ||
      field.fieldType === "checkbox" ||
      (field.fieldType === "text" && !field.isRequired) ||
      (field.fieldType === "date" && !field.isRequired);

    if (canComplete) {
      setIsCompleting(true);
      try {
        await onComplete(field.id, finalSignatureData);
        setIsOpen(false);
      } finally {
        setIsCompleting(false);
      }
    }
  };

  const isSignatureProvided = () => {
    if (field.fieldType === "text") {
      const value = signatureData.trim();
      if (value === "") return !field.isRequired;

      // Check validation rules
      if (field.validation) {
        if (field.validation.type === "number") {
          return !isNaN(Number(value));
        }
        if (field.validation.type === "regex" && field.validation.pattern) {
          try {
            const regex = new RegExp(field.validation.pattern);
            return regex.test(value);
          } catch (e) {
            return true; // Invalid regex, fallback to true if not empty
          }
        }
      }
      return true;
    }
    if (field.fieldType === "date") {
      return signatureData !== "";
    }
    if (field.fieldType === "signature" || field.fieldType === "initial") {
      if (activeTab === "draw") {
        return hasSigned;
      }
      if (activeTab === "type") {
        return typedSignature.trim() !== "";
      }
      if (activeTab === "upload") {
        return signatureData !== "";
      }
    }
    if (field.fieldType === "radio" || field.fieldType === "dropdown") {
      return signatureData !== "";
    }
    if (field.fieldType === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signatureData);
    }
    if (field.fieldType === "checkbox") {
      if (field.isRequired) return signatureData === "checked";
      return true;
    }

    return false;
  };

  const clearCanvas = () => {
    canvasRef.current?.clear();
    setHasSigned(false);
  };

  const renderFieldContent = () => {
    // Current data could be from the field (completed) or local state (preview)
    const displayData = field.isCompleted ? field.signatureData : signatureData;
    const isEditing = isOpen && !field.isCompleted;

    if (field.isCompleted || (isEditing && (displayData || (activeTab === 'type' && typedSignature)))) {
      if (field.fieldType === "signature" || field.fieldType === "initial") {
        // Special real-time preview for typed signature
        if (isEditing && activeTab === 'type' && typedSignature) {
          const font = SIGNATURE_FONTS.find(f => f.id === selectedFont)?.font || "cursive";
          return (
            <div className="w-full h-full flex items-center justify-center p-1">
              <span
                className="text-2xl text-gray-900 leading-none select-none pointer-events-none"
                style={{ fontFamily: font }}
              >
                {typedSignature}
              </span>
            </div>
          );
        }

        // Preview or completed image-based signature
        return (
          <div className="w-full h-full flex items-center justify-center p-1">
            <Image
              src={displayData || ""}
              alt="Signature"
              width={200}
              height={100}
              className={cn(
                "max-w-full max-h-full object-contain filter",
                isEditing && "opacity-40 animate-pulse" // More subtle preview
              )}
            />
          </div>
        );
      }

      if (field.fieldType === "checkbox") {
        return (
          <div className="flex items-center justify-center w-full h-full">
            {displayData === "checked" && (
              <Check className={cn("w-6 h-6 stroke-[3]", field.isCompleted ? "text-blue-600" : "text-gray-300")} />
            )}
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center w-full h-full px-2">
          <span className={cn(
            "text-sm font-semibold tracking-tight font-serif text-center",
            field.isCompleted ? "text-gray-900" : "text-gray-300 italic"
          )}>
            {displayData}
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
              {field.isRequired && <span className="text-red-500 ml-0.5">*</span>}
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
              {field.fieldType === "signature" ? "SIGN" : field.fieldType === "initial" ? "INIT" : field.fieldType === "checkbox" ? "CHK" : "FILL"}
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

      <SigningPanel
        field={field}
        isOpen={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setAgreementChecked(false);
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
        hasSigned={hasSigned}
        setHasSigned={setHasSigned}
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
      />
    </>
  );
}