"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, Download, User, Mail, FileText, Lock } from "lucide-react";

import { z } from "zod";

interface TemplateDownloadDialogProps {
    templateName: string;
    templateSlug: string;
    children: React.ReactNode;
    onSuccess?: () => void;
}

const emailSchema = z.string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .refine((email) => {
        const domain = email.split('@')[1];
        if (!domain) return false;

        // Block known "garbage" domains if explicitly desired, though strictly speaking some might be valid.
        // The user specifically disliked "something@x.com". "x.com" is actually Twitter, but it looks fake.
        // Let's block it for this context if they think it's "made up".
        const blockedDomains = ['example.com', 'test.com'];
        if (blockedDomains.includes(domain)) return false;

        return true;
    }, "Please enter a valid email address");

export function TemplateDownloadDialog({ templateName, templateSlug, children, onSuccess }: TemplateDownloadDialogProps) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const subscribe = useMutation(api.leads.subscribe);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate email
        const result = emailSchema.safeParse(email);
        if (!result.success) {
            setStatus("error");
            setErrorMsg(result.error.message);
            return;
        }

        setStatus("loading");
        try {
            await subscribe({
                email,
                name: name || undefined,
                source: templateSlug,
            });
            setStatus("success");

            // Trigger the actual download
            if (onSuccess) onSuccess();

            // Close dialog after 2 seconds so user sees the success message
            setTimeout(() => {
                setOpen(false);
                // Reset form state after closing (optional, but good for UX if they open again)
                setTimeout(() => {
                    setStatus("idle");
                    setEmail("");
                    setName("");
                    setErrorMsg("");
                }, 500);
            }, 2500);
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg("Something went wrong. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[440px] p-0 gap-0 overflow-hidden border-none shadow-2xl bg-white">

                {status === "success" ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center bg-white">
                        <div className="size-20 rounded-full bg-green-50 flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                            <CheckCircle2 className="size-10 text-green-600" />
                        </div>
                        <h3 className="font-black text-2xl text-slate-900 mb-2">Check your inbox!</h3>
                        <p className="text-slate-600 mb-8 max-w-[280px] mx-auto leading-relaxed">
                            We've sent the <strong>{templateName}</strong> and a <strong>special welcome gift</strong> directly to {email}.
                        </p>
                        <Button variant="outline" onClick={() => setOpen(false)} className="w-full h-11 border-slate-200">
                            Got it, thanks!
                        </Button>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Decorative Header Background */}
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-50/50 to-white z-0 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="relative z-10 p-6 sm:p-8">
                            <DialogHeader>
                                <div className="mx-auto size-12 rounded-xl bg-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-200 border border-blue-500">
                                    <FileText className="size-6 text-white" />
                                </div>
                                <DialogTitle className="text-2xl font-black text-center text-slate-900">
                                    Get Your Template
                                </DialogTitle>
                                <DialogDescription className="text-center text-slate-600 text-[15px] pt-2 pb-6">
                                    Get the <strong>{templateName}</strong> sent to your inbox, plus a <span className="text-blue-600 font-bold">special surprise gift</span>.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wide">First Name</Label>
                                        <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <User className="size-4" />
                                        </div>
                                        <Input
                                            id="name"
                                            placeholder="Jane"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</Label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                                            <Mail className="size-4" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="jane@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {status === "error" && (
                                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2 border border-red-100">
                                        <span className="font-bold">Error:</span> {errorMsg}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-[15px] font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
                                        disabled={status === "loading"}
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Preparing download...
                                            </>
                                        ) : (
                                            <>
                                                Get Template & Special Gift
                                                <Download className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <div className="flex flex-col items-center justify-center gap-3 pt-2">
                                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                        <Lock className="size-3" />
                                        <span>Your information is 100% secure. No spam.</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
