"use client";

import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Download, Trash2 } from "lucide-react";
import styles from "./OnlineSignatureCreator.module.css";

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
  const [typedSignature, setTypedSignature] = useState("Your Name");
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]); // Changed from fontClasses[0]

  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  const downloadSignature = () => {
    if (activeTab === "draw" && sigCanvas.current?.isEmpty()) {
      alert("Please draw your signature first.");
      return;
    }

    let dataURL;
    if (activeTab === "draw") {
      dataURL = sigCanvas.current?.toDataURL("image/png");
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const font = `72px ${selectedFont.fontFamily}`; // Changed from selectedFont.replace
      ctx.font = font;
      const textMetrics = ctx.measureText(typedSignature);
      canvas.width = textMetrics.width + 40; // Add some padding
      canvas.height = 120;

      // Re-apply font after canvas resize and fill background
      ctx.font = font;
      ctx.fillStyle = "#fff"; // White background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000"; // Black text
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
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-1 sm:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="draw">Draw</TabsTrigger>
          <TabsTrigger value="type">Type</TabsTrigger>
        </TabsList>
        <TabsContent value="draw">
          <div className="border rounded-lg bg-gray-50 w-full h-[250px] cursor-crosshair">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ className: "w-full h-full bg-transparent" }}
            />
          </div>
        </TabsContent>
        <TabsContent value="type">
          <div className="border rounded-lg bg-gray-50 p-4">
            <input
              type="text"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              className={`focus-within:outline-none focus-within:border-b w-full text-xl md:text-3xl border-0 bg-transparent text-center h-auto py-4 ${selectedFont.className}`} // Changed from selectedFont
            />
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Select a style:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {fontOptions.map(
                  (
                    fontOption, // Changed from fontClasses.map
                  ) => (
                    <Button
                      key={fontOption.className} // Changed from fontClass
                      variant={
                        selectedFont.className === fontOption.className
                          ? "secondary"
                          : "outline" // Changed from selectedFont === fontClass
                      }
                      onClick={() => setSelectedFont(fontOption)} // Changed from fontClass
                      className={`py-6 text-lg ${fontOption.className}`} // Changed from fontClass
                    >
                      {typedSignature || "Sample"}
                    </Button>
                  ),
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={clearSignature}
          disabled={activeTab === "type" || sigCanvas.current?.isEmpty()}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button onClick={downloadSignature}>
          <Download className="w-4 h-4 mr-2" />
          Download Signature
        </Button>
      </div>
    </div>
  );
}
