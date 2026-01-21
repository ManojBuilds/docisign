"use client";

import { Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./OnlineSignatureCreator.module.css";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const fontOptions = [
  { className: styles["dancing-script"], fontFamily: "'Dancing Script'" },
  { className: styles["pacifico"], fontFamily: "'Pacifico'" },
  { className: styles["caveat"], fontFamily: "'Caveat'" },
  { className: styles["permanent-marker"], fontFamily: "'Permanent Marker'" },
  { className: styles["sacramento"], fontFamily: "'Sacramento'" },
];

export default function OnlineSignatureCreator() {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [activeTab, setActiveTab] = useState("draw");
  const [typedSignature, setTypedSignature] = useState("");
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]); // Changed from fontClasses[0]

  const [showUpsell, setShowUpsell] = useState(false);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setShowUpsell(false);
  };

  const downloadSignature = () => {
    if (activeTab === "draw" && sigCanvas.current?.isEmpty()) {
      alert("Please draw your signature first.");
      return;
    }

    if (activeTab === "type" && !typedSignature.trim()) {
      alert("Please enter your name first.");
      return;
    }

    let dataURL;
    if (activeTab === "draw") {
      dataURL = sigCanvas.current?.toDataURL("image/png");
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const font = `72px ${selectedFont.fontFamily}`;
      ctx.font = font;
      const textMetrics = ctx.measureText(typedSignature);
      canvas.width = textMetrics.width + 40;
      canvas.height = 120;

      ctx.font = font;
      ctx.fillStyle = "transparent";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.textBaseline = "middle";
      ctx.fillText(typedSignature, 20, canvas.height / 2);

      dataURL = canvas.toDataURL("image/png");
    }

    const link = document.createElement("a");
    link.href = dataURL || "";
    link.download = "signature.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show upsell after download
    setShowUpsell(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-blue-50 p-1 sm:p-8 transition-all duration-300">
      <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setShowUpsell(false); }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-xl mb-6">
          <TabsTrigger value="draw" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Draw Signature</TabsTrigger>
          <TabsTrigger value="type" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Type Signature</TabsTrigger>
        </TabsList>
        <TabsContent value="draw" className="focus-visible:outline-none">
          <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 w-full h-[250px] cursor-crosshair transition-colors hover:border-blue-200">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ className: "w-full h-full bg-transparent" }}
              onBegin={() => setShowUpsell(false)}
            />
          </div>
        </TabsContent>
        <TabsContent value="type" className="focus-visible:outline-none">
          <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-6 transition-colors hover:border-blue-200">
            <input
              type="text"
              value={typedSignature}
              onChange={(e) => { setTypedSignature(e.target.value); setShowUpsell(false); }}
              className={`focus-within:outline-none w-full text-4xl md:text-5xl border-0 bg-transparent text-center h-auto py-8 text-blue-600 ${selectedFont.className}`}
              placeholder="Your Name"
            />
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Select Design Style</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {fontOptions.map((fontOption) => (
                  <Button
                    key={fontOption.className}
                    variant={selectedFont.className === fontOption.className ? "default" : "outline"}
                    onClick={() => { setSelectedFont(fontOption); setShowUpsell(false); }}
                    className={`py-8 text-xl h-auto border-2 ${selectedFont.className === fontOption.className ? "border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-100" : "hover:border-blue-200"} transition-all duration-200 ${fontOption.className}`}
                  >
                    {typedSignature || "Sample"}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {showUpsell ? (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl text-white animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-lg leading-tight mb-1">Signature Downloaded! 🎉</h4>
              <p className="text-blue-100 text-sm">Now use it to sign any PDF document in under 3 minutes.</p>
            </div>
            <Link
              href="/signup"
              className="w-full md:w-auto bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-50 transition-colors shadow-lg"
            >
              Sign My PDF Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            variant="ghost"
            onClick={clearSignature}
            disabled={activeTab === "type" || (activeTab === "draw" && sigCanvas.current?.isEmpty())}
            className="text-gray-500 hover:text-red-500 transition-colors order-2 sm:order-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button
            onClick={downloadSignature}
            size="lg"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-10 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] order-1 sm:order-2"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Signature PNG
          </Button>
        </div>
      )}
    </div>

  );
}
