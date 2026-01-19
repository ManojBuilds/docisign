"use client";

import StartTrialBtn from "@/components/StartTrialBtn";
import Cta from "@/components/cta";
import Faq from "@/components/faq";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMDXComponent } from "@content-collections/mdx/react";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  Clock as ClockIcon,
  Database,
  DollarSign,
  Download,
  DownloadCloud,
  FileLock,
  FileText,
  Frown,
  Globe,
  Key,
  Link as LinkIcon,
  Lock,
  Mail,
  MailOpen,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  User,
  Users,
  XCircle,
  Zap
} from "lucide-react";
import Link from "next/link";
import ComparasionTable from "../ComparasionTable";
import HowItWorks from "../HowItWorks";
import SmallComparasionTable from "../SmallComparasionTable";
import { Callout } from "./Callout";
import CustomImage from "./Image";

const sharedComponents = {
  SmallComparasionTable,
  HowItWorks,
  ComparasionTable,
  Callout,
  Link,
  Image: CustomImage,
  img: CustomImage,
  StartTrialBtn,
  Cta,
  Faq,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  Button,
  Separator,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  Clock: ClockIcon,
  Database,
  DollarSign,
  Download,
  DownloadCloud,
  FileLock,
  FileText,
  Frown,
  Globe,
  Key,
  LinkIcon,
  Lock,
  Mail,
  MailOpen,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  User,
  Users,
  XCircle,
  Zap,
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href as string} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
        {children}
      </a>
    );
  },
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  table: ({ className, ...props }: React.ComponentProps<typeof Table>) => (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
      <Table className={cn("m-0", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentProps<typeof TableHeader>) => (
    <TableHeader className={cn("bg-slate-50", className)} {...props} />
  ),
  tbody: ({ className, ...props }: React.ComponentProps<typeof TableBody>) => (
    <TableBody className={className} {...props} />
  ),
  tfoot: ({ className, ...props }: React.ComponentProps<typeof TableFooter>) => (
    <TableFooter className={className} {...props} />
  ),
  tr: ({ className, ...props }: React.ComponentProps<typeof TableRow>) => (
    <TableRow className={cn("group/row", className)} {...props} />
  ),
  th: ({ className, children, ...props }: React.ComponentProps<typeof TableHead>) => {
    const isBoopSign = typeof children === "string" && children.toLowerCase().includes("boopsign");
    return (
      <TableHead
        className={cn(
          "px-6 py-4 font-black uppercase tracking-widest text-[10px] md:text-xs whitespace-normal",
          isBoopSign ? "text-blue-600 bg-blue-50/50" : "text-slate-900",
          className
        )}
        {...props}
      >
        {children}
      </TableHead>
    );
  },
  td: ({ className, children, ...props }: React.ComponentProps<typeof TableCell>) => {
    const content = typeof children === "string" ? children : "";
    const isPositive = content.includes("✅") || content.includes("Yes");
    const isNegative = content.includes("❌") || (content.includes("No") && !content.includes("None"));

    return (
      <TableCell
        className={cn(
          "px-6 py-5 align-top text-slate-600 group-hover/row:text-slate-900 transition-colors whitespace-normal",
          className
        )}
        {...props}
      >
        <span className={cn(
          isPositive ? "text-green-600 font-medium" :
            isNegative ? "text-red-500" : ""
        )}>
          {children}
        </span>
      </TableCell>
    );
  },
  caption: ({ className, ...props }: React.ComponentProps<typeof TableCaption>) => (
    <TableCaption className={className} {...props} />
  ),
};

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);

  return <Component components={{ ...sharedComponents, ...components }} />;
}
