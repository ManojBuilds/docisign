"use client";

import { Download, Trash2, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";

interface Personality {
  id: string;
  name: string;
  description: string;
  fontFamily: string;
  style: React.CSSProperties;
  canvasUnderline?: boolean;
  canvasRotate?: number;
  canvasSkew?: number;
  canvasCaps?: boolean;
  transform?: (val: string) => string;
}

const personalities: Personality[] = [
  {
    id: "unreadable",
    name: "Sharp & Creative",
    description: "Unreadable letters (Qwigley)",
    fontFamily: '"Qwigley", cursive',
    style: { fontFamily: '"Qwigley", cursive', fontSize: "clamp(1.5rem, 10vw, 3.5rem)" }
  },
  {
    id: "readable",
    name: "Clean & Elegant",
    description: "Easy to read (Pinyon Script)",
    fontFamily: '"Pinyon Script", cursive',
    style: { fontFamily: '"Pinyon Script", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }
  },
  {
    id: "underline",
    name: "Proud & Energetic",
    description: "With underline (Sacramento)",
    fontFamily: '"Sacramento", cursive',
    style: { fontFamily: '"Sacramento", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)", textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "6px" },
    canvasUnderline: true
  },
  {
    id: "upward",
    name: "Ambitious",
    description: "Upward angle (Caveat)",
    fontFamily: '"Caveat", cursive',
    style: { fontFamily: '"Caveat", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)", transform: "rotate(-10deg)" },
    canvasRotate: -10
  },
  {
    id: "slanted",
    name: "Friendly",
    description: "Slanted (Dancing Script)",
    fontFamily: '"Dancing Script", cursive',
    style: { fontFamily: '"Dancing Script", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)", transform: "skewX(-10deg)" },
    canvasSkew: -10
  },
  {
    id: "nickname",
    name: "Bold & Confident",
    description: "Nickname style (Kaushan Script)",
    fontFamily: '"Kaushan Script", cursive',
    style: { fontFamily: '"Kaushan Script", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }
  },
  {
    id: "digital",
    name: "Digital Signature",
    description: "DocuSign Style (Zeyada)",
    fontFamily: '"Zeyada", cursive',
    style: { fontFamily: '"Zeyada", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
  },
  {
    id: "formal",
    name: "Formal",
    description: "Classic (Great Vibes)",
    fontFamily: '"Great Vibes", cursive',
    style: { fontFamily: '"Great Vibes", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }
  },
  {
    id: "refined",
    name: "Refined",
    description: "Elegant (Allison)",
    fontFamily: '"Allison", cursive',
    style: { fontFamily: '"Allison", cursive', fontSize: "clamp(1.5rem, 12vw, 3.5rem)" }
  },
  {
    id: "flamboyant",
    name: "Flamboyant",
    description: "Fancy Caps (Bilbo Swash Caps)",
    fontFamily: '"Bilbo Swash Caps", cursive',
    style: { fontFamily: '"Bilbo Swash Caps", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
  },
  {
    id: "brushwork",
    name: "Brushwork",
    description: "Artistic (Comforter Brush)",
    fontFamily: '"Comforter Brush", cursive',
    style: { fontFamily: '"Comforter Brush", cursive', fontSize: "clamp(1.5rem, 9vw, 2.8rem)" }
  },
  {
    id: "eccentric",
    name: "Eccentric",
    description: "Unique (Dr Sugiyama)",
    fontFamily: '"Dr Sugiyama", cursive',
    style: { fontFamily: '"Dr Sugiyama", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
  },
  {
    id: "whimsical",
    name: "Whimsical",
    description: "Playful (Fuggles)",
    fontFamily: '"Fuggles", cursive',
    style: { fontFamily: '"Fuggles", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
  },
  {
    id: "calligraphic",
    name: "Calligraphic",
    description: "Expressive (Liu Jian Mao Cao)",
    fontFamily: '"Liu Jian Mao Cao", cursive',
    style: { fontFamily: '"Liu Jian Mao Cao", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
  },
  {
    id: "classic-bold",
    name: "Classic Bold",
    description: "Strong (Montez)",
    fontFamily: '"Montez", cursive',
    style: { fontFamily: '"Montez", cursive', fontSize: "clamp(1.5rem, 9vw, 2.8rem)" }
  },
  {
    id: "aristocratic",
    name: "Aristocratic",
    description: "High Society (Mrs Saint Delafield)",
    fontFamily: '"Mrs Saint Delafield", cursive',
    style: { fontFamily: '"Mrs Saint Delafield", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
  },
  {
    id: "dreamy",
    name: "Dreamy",
    description: "Casual (Over the Rainbow)",
    fontFamily: '"Over the Rainbow", cursive',
    style: { fontFamily: '"Over the Rainbow", cursive', fontSize: "clamp(1.5rem, 8vw, 2.5rem)" }
  },
  {
    id: "notebook",
    name: "Notebook",
    description: "Ballpoint (Reenie Beanie)",
    fontFamily: '"Reenie Beanie", cursive',
    style: { fontFamily: '"Reenie Beanie", cursive', fontSize: "clamp(1.5rem, 9vw, 2.8rem)" }
  },
  {
    id: "modern-script",
    name: "Modern Script",
    description: "Stylish (Style Script)",
    fontFamily: '"Style Script", cursive',
    style: { fontFamily: '"Style Script", cursive', fontSize: "clamp(1.5rem, 10vw, 3rem)" }
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

  const handleDownload = (dataURL: string) => {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `signature-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowUpsell(true);
  };

  const downloadFullCanvas = () => {
    if (sigCanvas.current?.isEmpty()) return;
    handleDownload(sigCanvas.current?.toDataURL("image/png") || "");
  };

  const downloadPersonality = (personality: Personality) => {
    if (!typedSignature.trim()) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const text = personality.transform ? personality.transform(typedSignature) : typedSignature;
    const finalVal = personality.canvasCaps ? text.toUpperCase() : text;

    // Set font to measure
    ctx.font = `72px ${personality.fontFamily}`;
    const metrics = ctx.measureText(finalVal);

    // Increase padding for rotation/skew
    canvas.width = metrics.width + 50;
    canvas.height = 120;

    // Fill transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Apply Rotation
    if (personality.canvasRotate) {
      ctx.rotate((personality.canvasRotate * Math.PI) / 180);
    }

    // Apply Skew
    if (personality.canvasSkew) {
      ctx.transform(1, 0, Math.tan((personality.canvasSkew * Math.PI) / 180), 1, 0, 0);
    }

    ctx.font = `72px ${personality.fontFamily}`;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(finalVal, 0, 0);

    // Apply Underline
    if (personality.canvasUnderline) {
      const width = metrics.width;
      const yOffset = 15; // px below baseline
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(-width / 2, yOffset);
      ctx.lineTo(width / 2, yOffset);
      ctx.stroke();
    }

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
                  className="w-full font-sans text-4xl md:text-5xl border-b-2 border-slate-100 bg-transparent text-center focus:border-blue-500 focus:outline-none py-6 transition-all placeholder:text-slate-200 font-medium"
                  placeholder="Type your name..."
                  maxLength={40}
                />
              </div>

              <div className="flex flex-col gap-4 pt-4">
                {personalities.map((p) => (
                  <div
                    key={p.id}
                    className="group relative bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                  >
                    <div className="flex-1 w-full bg-slate-50/50 rounded-xl h-32 md:h-40 flex items-center justify-center overflow-hidden relative px-8">
                      <div className="w-full overflow-hidden flex items-center justify-center">
                        <span
                          className="text-4xl md:text-6xl text-slate-800 whitespace-nowrap px-4 pb-2"
                          style={p.style}
                        >
                          {p.transform ? p.transform(typedSignature || "Sample") : (typedSignature || "Sample")}
                        </span>
                      </div>
                    </div>

                    <div className="w-full md:w-64 flex flex-col gap-3 shrink-0 text-center md:text-left">
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg">{p.name}</h4>
                        <p className="text-sm text-slate-500">{p.description}</p>
                      </div>

                      <Button
                        variant="outline"
                        disabled={!typedSignature}
                        onClick={() => downloadPersonality(p)}
                        className="w-full rounded-xl border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all font-semibold h-11 shadow-sm"
                      >
                        <Download className="size-4 mr-2" />
                        Download Style
                      </Button>
                    </div>

                    {typedSignature && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="size-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
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

        <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
          <DialogContent className="sm:max-w-md rounded-[2rem] p-0 overflow-hidden border-0">
            <div className="bg-sky-50 px-8 py-10 text-center">
              <div className="mx-auto size-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <Sparkles className="size-6 text-blue-500" />
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900 mb-2">Signature Ready! 🎉</DialogTitle>
              <DialogDescription className="text-slate-600 text-base">
                Your signature has been downloaded. Now, sign your actual documents legally with Boopsign.
              </DialogDescription>
            </div>
            <div className="p-8 bg-white border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="w-full inline-flex items-center justify-center px-4 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Upload & Sign PDF Free
              </Link>
              <Button variant="ghost" className="w-full rounded-xl text-slate-500 hover:text-slate-900" onClick={() => setShowUpsell(false)}>
                Maybe later
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer Checks */}
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
