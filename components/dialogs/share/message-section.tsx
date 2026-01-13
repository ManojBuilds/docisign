
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface MessageSectionProps {
  customMessage: string;
  setCustomMessage: Dispatch<SetStateAction<string>>;
}

export function MessageSection({ customMessage, setCustomMessage }: MessageSectionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-400" />
        Message to Recipients
      </Label>
      <div className="relative">
        <Textarea
          className="min-h-[120px] p-4 bg-gray-50 border-gray-200 focus:bg-white transition-all text-sm resize-none rounded-xl"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Enter a custom message (optional)..."
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-medium bg-white/80 px-2 py-1 rounded border shadow-sm">
          {customMessage.length}/500
        </div>
      </div>
    </div>
  );
}
