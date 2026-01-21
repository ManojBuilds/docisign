"use client";

import { Download, Trash2, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./OnlineSignatureCreator.module.css";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";

const personalities = [
  {
    id: "visionary",
    name: "The Visionary",
    description: "Upward angle, optimistic and ambitious",
    className: styles["dancing-script"],
    fontFamily: "'Dancing Script'",
    style: { transform: "rotate(-2deg)" },
    canvasRotate: -2
  },
  {
    id: "transparent",
    name: "The Open",
    description: "Easy to read, transparent personality",
    className: styles["alex-brush"],
    fontFamily: "'Alex Brush'",
    style: {}
  },
  {
    id: "creative",
    name: "The Creative",
    description: "Artistic, expressive and unique",
    className: styles["parisienne"],
    fontFamily: "'Parisienne'",
    style: {}
  },
  {
    id: "enigma",
    name: "The Enigma",
    description: "Initials only, mysterious aura",
    className: styles["mrs-saint"],
    fontFamily: "'Mrs Saint Delafield'",
    style: {},
    transform: (val: string) => val.split(' ').filter(Boolean).map(n => n[0]).join('. ') + (val ? '.' : '')
  },
  {
    id: "leader",
    name: "The Ruler",
    description: "Bold capitals, strong and confident",
    className: styles["permanent-marker"],
    fontFamily: "'Permanent Marker'",
    style: { textTransform: "uppercase" as const },
    canvasCaps: true
  },
  {
    id: "perfectionist",
    name: "The Elite",
    description: "Clean, precise and sophisticated",
    className: styles["pinyon"],
    fontFamily: "'Pinyon Script'",
    style: {}
  },
  {
    id: "minimalist",
    name: "The Minimal",
    description: "Just a nickname, self-confident",
    className: styles["allura"],
    fontFamily: "'Allura'",
    style: {},
    transform: (val: string) => val.split(' ')[0]
  },
  {
    id: "artistic",
    name: "The Artist",
    description: "Embellished and decorative",
    className: styles["monsieur"],
    fontFamily: "'Monsieur La Doulaise'",
    style: {}
  }
];

export default function OnlineSignatureCreator() {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [activeTab, setActiveTab] = useState("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [showUpsell, setShowUpsell] = useState(false);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setShowUpsell(false);
  };

  const downloadFullCanvas = () => {
    if (sigCanvas.current?.isEmpty()) return;
    handleDownload(sigCanvas.current?.toDataURL("image/png") || "");
  };

  const handleDownload = (dataURL: string) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `signature-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowUpsell(true);
  };

  const downloadPersonality = (personality: typeof personalities[0]) => {
    if (!typedSignature.trim()) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const text = personality.transform ? personality.transform(typedSignature) : typedSignature;
    const finalVal = personality.canvasCaps ? text.toUpperCase() : text;

    // Set font to measure
    ctx.font = `72px ${personality.fontFamily}`;
    const metrics = ctx.measureText(finalVal);

    canvas.width = metrics.width + 100;
    canvas.height = 160;

    // Fill transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (personality.canvasRotate) {
      ctx.rotate((personality.canvasRotate * Math.PI) / 180);
    }

    ctx.font = `72px ${personality.fontFamily}`;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(finalVal, 0, 0);
    ctx.restore();

    handleDownload(canvas.toDataURL("image/png"));
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-2 sm:p-10">
        <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setShowUpsell(false); }} className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="size-5 text-blue-500" />
                Create Your Signature
              </h2>
              <p className="text-slate-500 text-sm mt-1">Draw or type to generate a professional esignature</p>
            </div>
            <TabsList className="bg-slate-100/80 p-1 rounded-2xl h-12">
              <TabsTrigger
                value="draw"
                className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                Draw
              </TabsTrigger>
              <TabsTrigger
                value="type"
                className="rounded-xl px-8 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
              >
                Type
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="draw" className="mt-0 focus-visible:outline-none focus:outline-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-50/50 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/30 w-full h-[350px] cursor-crosshair transition-all hover:border-blue-300 relative overflow-hidden">
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="#0f172a"
                  canvasProps={{ className: "w-full h-full" }}
                  onBegin={() => setShowUpsell(false)}
                />
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearSignature}
                    className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white text-slate-600 rounded-xl"
                  >
                    <Trash2 className="size-4 mr-2" />
                    Clear
                  </Button>
                  <Button
                    onClick={downloadFullCanvas}
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg px-6"
                  >
                    <Download className="size-4 mr-2" />
                    Download PNG
                  </Button>
                </div>
                {!sigCanvas.current?.isEmpty() === false && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <p className="text-slate-400 font-medium">Draw your signature here</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="type" className="mt-0 focus-visible:outline-none focus:outline-none">
            <div className="space-y-8">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  value={typedSignature}
                  onChange={(e) => { setTypedSignature(e.target.value); setShowUpsell(false); }}
                  className="w-full text-4xl md:text-5xl border-b-2 border-slate-100 bg-transparent text-center focus:border-blue-500 focus:outline-none py-6 transition-all placeholder:text-slate-200 font-medium"
                  placeholder="Type your name..."
                  maxLength={30}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {personalities.map((p) => (
                  <div
                    key={p.id}
                    className="group relative bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <div className="w-full aspect-[3/2] flex items-center justify-center mb-4 overflow-hidden rounded-2xl bg-slate-50/50">
                      <span
                        className={cn("text-2xl md:text-3xl text-slate-800", p.className)}
                        style={p.style}
                      >
                        {p.transform ? p.transform(typedSignature || "Sample") : (typedSignature || "Sample")}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{p.name}</h4>
                    <p className="text-[10px] text-slate-500 mb-4 line-clamp-1">{p.description}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!typedSignature}
                      onClick={() => downloadPersonality(p)}
                      className="w-full rounded-xl border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-[10px] font-semibold h-9"
                    >
                      <Download className="size-3 mr-2" />
                      Download Style
                    </Button>

                    {typedSignature && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="size-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="size-3 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {showUpsell && (
          <div className="mt-12 p-1 overflow-hidden">
            <div className="bg-sky-50 rounded-[1.9rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-slate-900 mb-2">Signature Downloaded 🎉</h4>
                <p className="text-slate-600">Now, sign your actual documents legally with Boopsign.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link
                  href="/dashboard"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  Upload & Sign PDF
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-slate-400 text-xs">
        <div className="flex items-center gap-2">
          <Check className="size-3 text-green-500" /> Transparent PNG
        </div>
        <div className="flex items-center gap-2">
          <Check className="size-3 text-green-500" /> High Resolution
        </div>
        <div className="flex items-center gap-2">
          <Check className="size-3 text-green-500" /> Secure Locally
        </div>
      </div>
    </div>
  );
}
