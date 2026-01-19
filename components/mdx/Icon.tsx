import { Activity, ArrowRight, Briefcase, CheckCircle, Clock, Coffee, CreditCard, DollarSign, FileCheck, FileText, GraduationCap, Heart, Home, Key, Landmark, Send, ShieldAlert, ShieldCheck, Smartphone, Star, Stethoscope, UserCheck, XCircle, Zap } from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
}

const icons: Record<string, any> = {
  Activity,
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  Coffee,
  CreditCard,
  DollarSign,
  FileCheck,
  FileText,
  GraduationCap,
  Heart,
  Home,
  Key,
  Landmark,
  Send,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Star,
  Stethoscope,
  UserCheck,
  XCircle,
  Zap
};

export function Icon({ name, className }: IconProps) {
  const LucideIcon = icons[name] || FileText;
  return <LucideIcon className={className || "w-6 h-6"} />;
}