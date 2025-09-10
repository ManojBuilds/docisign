import { Loader2 } from "lucide-react";

export const Loader = () => (
  <div className="w-full p-6 sm:max-w-lg min-h-[25rem] bg-white rounded-lg border border-gray-300 shadow flex items-center justify-center">
    <Loader2
      className="w-8 h-8 animate-spin text-muted-foreground"
      strokeWidth={1.8}
    />
  </div>
);
