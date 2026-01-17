import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

interface CalloutProps {
  type?: "default" | "warning" | "danger" | "success";
  title?: string;
  children: React.ReactNode;
}

const icons = {
  default: Info,
  warning: AlertCircle,
  danger: XCircle,
  success: CheckCircle,
};

export function Callout({ type = "default", title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "my-6 flex items-start gap-3 rounded-lg border p-4",
        type === "default" && "border-blue-200 bg-blue-50 text-blue-900",
        type === "warning" && "border-amber-200 bg-amber-50 text-amber-900",
        type === "danger" && "border-red-200 bg-red-50 text-red-900",
        type === "success" && "border-green-200 bg-green-50 text-green-900"
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div className="text-sm [&>p]:last:mb-0">
        {title && <p className="mb-1 font-bold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
