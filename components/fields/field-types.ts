import {
    ALargeSmall,
    CalendarDays,
    CheckSquare,
    ChevronDown,
    CircleDot,
    Mail,
    TextCursor
} from "lucide-react";
import { SignatureIcon } from "@/components/SignatureIcon";

export type FieldType = "signature" | "initial" | "date" | "text" | "email" | "checkbox" | "dropdown" | "radio";

export interface FieldConfig {
    id: FieldType;
    label: string;
    icon: React.ElementType;
    shortcut: string;
    color: string;
    bgColor: string;
    description: string;
}

export const FIELDS: FieldConfig[] = [
    {
        id: "signature",
        label: "Signature",
        icon: SignatureIcon,
        shortcut: "S",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        description: "Capture a legal signature"
    },
    {
        id: "initial",
        label: "Initial",
        icon: TextCursor,
        shortcut: "I",
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        description: "Add initials to pages"
    },
    {
        id: "date",
        label: "Date",
        icon: CalendarDays,
        shortcut: "D",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        description: "Auto-fill signing date"
    },
    {
        id: "text",
        label: "Text",
        icon: ALargeSmall,
        shortcut: "T",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        description: "Single line text input"
    },
    {
        id: "email",
        label: "Email",
        icon: Mail,
        shortcut: "E",
        color: "text-rose-600",
        bgColor: "bg-rose-50",
        description: "Validated email input"
    },
    {
        id: "checkbox",
        label: "Checkbox",
        icon: CheckSquare,
        shortcut: "C",
        color: "text-cyan-600",
        bgColor: "bg-cyan-50",
        description: "Yes/No toggle"
    },
    {
        id: "dropdown",
        label: "Dropdown",
        icon: ChevronDown,
        shortcut: "R",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        description: "Select one from list"
    },
    {
        id: "radio",
        label: "Radio",
        icon: CircleDot,
        shortcut: "O",
        color: "text-indigo-600",
        bgColor: "bg-indigo-50",
        description: "Exclusive notification"
    }
];
