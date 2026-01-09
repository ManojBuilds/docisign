"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, FileText, MousePointer2, Send, Upload } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroAnimation = () => {
    // Flow:
    // 0: SENDER - Upload
    // 1: SENDER - Enter Email & Send
    // 2: TRANSITION - Sending...
    // 3: CLIENT - Email Received
    // 4: CLIENT - Viewing (Unsigned)
    // 5: CLIENT - Signing (Signature appearing)
    // 6: COMPLETE - Success Overlay
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play Logic
    useEffect(() => {
        if (isHovered) return; // Pause on hover

        let timer: NodeJS.Timeout;

        switch (step) {
            case 0: // Upload
                timer = setTimeout(() => setStep(1), 2000);
                break;
            case 1: // Type & Send
                if (email === "client@company.com") {
                    timer = setTimeout(() => setStep(2), 800);
                }
                break;
            case 2: // Sending transition
                timer = setTimeout(() => setStep(3), 2000);
                break;
            case 3: // Email received -> Click Open
                timer = setTimeout(() => setStep(4), 2500);
                break;
            case 4: // Viewing Doc -> Click Sign
                timer = setTimeout(() => setStep(5), 1500);
                break;
            case 5: // Signature Drawing -> Show Success
                timer = setTimeout(() => setStep(6), 2000); // Wait for drag animation
                break;
            case 6: // Success Overlay -> Reset
                timer = setTimeout(() => {
                    setStep(0);
                    setEmail("");
                }, 4000);
                break;
        }

        return () => clearTimeout(timer);
    }, [step, email, isHovered]);

    // Auto-type effect for email
    useEffect(() => {
        if (step === 1) {
            const text = "client@company.com";
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    setEmail(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 50);
            return () => clearInterval(timer);
        } else if (step === 0) {
            setEmail("");
        }
    }, [step]);

    return (
        <div
            className="relative w-full mx-auto lg:aspect-video select-none perspective-1000 font-sans"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Stage - Glassmorphic Container to anchor the content */}
            <div className="relative w-full h-full bg-linear-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 group ring-1 ring-black/5 dark:ring-white/10">

                {/* --- CONTEXT BADGE (Floating) --- */}
                <div className="absolute top-6 right-6 z-20 pointer-events-none transition-opacity duration-300">
                    <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-500 shadow-lg backdrop-blur-xl border",
                        step < 3
                            ? "bg-white/90 text-primary border-primary/20"
                            : "bg-purple-500/10 text-purple-600 bg-white/90 border-purple-200"
                    )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", step < 3 ? "bg-primary" : "bg-purple-600")} />
                        {step < 3 ? "Freelancer Dashboard" : "Client Mobile View"}
                    </div>
                </div>

                {/* --- SIMULATED CURSOR (The "Ghost" User) --- */}
                <div
                    className={cn(
                        "absolute z-50 pointer-events-none transition-all duration-1000 ease-in-out flex items-center gap-2",
                        step === 0 && "top-[60%] left-[55%]", // Hovering upload
                        step === 1 && "top-[75%] left-[70%]", // Hovering send
                        step === 2 && "opacity-0", // Hide during transition
                        step === 3 && "top-[70%] left-[50%]", // Hovering review
                        step === 4 && "top-[75%] left-[60%]", // Hovering sign
                        step >= 5 && "top-[85%] left-[80%] opacity-0" // Hide after signing
                    )}
                >
                    <MousePointer2 className="w-6 h-6 fill-black text-white drop-shadow-xl" />
                    <div className={cn(
                        "px-3 py-1.5 bg-zinc-900 text-white text-xs rounded-full font-bold opacity-0 transition-all transform translate-y-2",
                        (step === 0 || step === 3 || step === 4) && "opacity-100 translate-y-0"
                    )}>
                        {step === 0 && "Upload PDF"}
                        {step === 3 && "Open Email"}
                        {step === 4 && "Sign Here"}
                    </div>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center p-8">

                    {/* PHASE 1: SENDER (Freelancer) */}
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-700 ease-in-out",
                        step < 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
                    )}>
                        {step === 0 && (
                            <div className="w-full max-w-md animate-in zoom-in-95 fade-in duration-500">
                                <div className={cn(
                                    "border-2 border-dashed border-border/60 bg-white/60 dark:bg-zinc-900/60 rounded-2xl h-64 flex flex-col items-center justify-center gap-4 transition-all hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:border-primary/30 hover:scale-[1.02]",
                                    "shadow-sm ring-1 ring-black/5"
                                )}>
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                                        <Upload className="w-8 h-8 text-primary" />
                                    </div>
                                    <div className="text-center space-y-1">
                                        <p className="font-bold text-lg text-foreground">Upload Contract</p>
                                        <p className="text-sm text-muted-foreground font-medium">Drag & drop or click to browse</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="w-full max-w-md flex flex-col gap-6 animate-in slide-in-from-right-8 fade-in duration-500">
                                <div className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 rounded-xl border shadow-lg shadow-black/5 ring-1 ring-black/5">
                                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <FileText className="w-8 h-8 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground">Freelance_Agreement.pdf</p>
                                        <p className="text-xs text-muted-foreground font-medium">1.2 MB • Ready to send</p>
                                    </div>
                                    <Check className="ml-auto w-5 h-5 text-green-500" />
                                </div>

                                <div className="space-y-4 p-6 bg-white/40 dark:bg-black/20 rounded-xl border border-white/20 backdrop-blur-sm">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Client Email</Label>
                                        <div className="relative">
                                            <Input value={email} readOnly className="font-mono bg-white/70 border-0 shadow-inner h-11" placeholder="" />
                                            {email.length > 0 && email.length < 18 && (
                                                <span className="absolute right-3 top-3 w-1.5 h-5 bg-primary animate-pulse rounded-full" />
                                            )}
                                        </div>
                                    </div>
                                    <Button className="w-full font-bold h-11 text-md shadow-lg shadow-primary/20" size="lg">
                                        Send Contract <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PHASE 2: TRANSITION (Sending) */}
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center bg-primary text-primary-foreground transition-all duration-500 rounded-3xl",
                        step === 2 ? "opacity-100 z-10 clip-circle-100" : "opacity-0 z-0 clip-circle-0 pointer-events-none"
                    )}>
                        <div className="bg-white/20 p-8 rounded-full mb-6 backdrop-blur-md">
                             <Send className={cn("w-16 h-16", step === 2 ? "animate-fly" : "")} />
                        </div>
                        <h3 className="text-4xl font-extrabold tracking-tight">Sending...</h3>
                    </div>


                    {/* PHASE 3: CLIENT VIEW */}
                    <div className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-700 ease-in-out",
                        step >= 3 && step <= 6 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
                    )}>

                        {/* EMAIL NOTIFICATION (Step 3) */}
                        <div className={cn(
                            "absolute w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ring-1 ring-black/5 dark:ring-white/10",
                            step === 3 ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
                        )}>
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 w-full" />
                            <div className="p-8 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center font-bold text-lg text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                        M
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-foreground">Manoj (Freelancer)</p>
                                        <p className="text-sm text-muted-foreground">via BoopSign</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl text-foreground">Please sign: Freelance Agreement</h4>
                                    <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-100/50 dark:bg-green-900/20 w-fit rounded-lg border border-green-200 dark:border-green-800/50">
                                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-sm shadow-green-500" />
                                        <span className="text-green-700 dark:text-green-300 text-xs font-extra-bold tracking-wide uppercase">No Account Required</span>
                                    </div>
                                </div>
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 transition-all hover:scale-[1.02] h-12 text-md font-bold rounded-xl">
                                    Review & Sign
                                </Button>
                            </div>
                        </div>

                        {/* DOCUMENT SIGNING (Step 4, 5, 6) */}
                         <div className={cn(
                             "relative max-h-[90%] w-[90%] md:w-auto md:aspect-[3/4] bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-black/5 dark:border-white/10 flex flex-col transition-all duration-500 ring-1 ring-black/5",
                             step >= 4 ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                         )}>
                             <div className="flex-1 p-8 flex flex-col relative overflow-hidden bg-white dark:bg-zinc-900 rounded-2xl">
                                 {/* Doc Content Mockup (Realistic) */}
                                 <div className="space-y-6 select-none pointer-events-none opacity-80">
                                     {/* Header */}
                                     <div className="w-full flex justify-between items-start border-b pb-6 mb-6 border-border/50">
                                        <div className="space-y-3">
                                            <div className="w-32 h-5 bg-gray-800 dark:bg-gray-200 rounded-md" />
                                            <div className="w-24 h-3 bg-gray-400 dark:bg-gray-600 rounded-md" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-primary/10" />
                                     </div>

                                     {/* Paragraphs */}
                                     <div className="space-y-3">
                                        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                        <div className="w-2/3 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                     </div>

                                      <div className="space-y-3 pt-4">
                                        <div className="w-11/12 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                        <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                        <div className="w-4/5 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full" />
                                     </div>
                                 </div>

                                 <div className="flex-1" />

                                 {/* Signature Field */}
                                 <div className="mt-auto pt-6">
                                     <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2 tracking-widest flex items-center justify-between">
                                        <span>Signature</span>
                                        {step === 4 && <span className="text-blue-500 animate-pulse font-bold bg-blue-50 px-2 py-0.5 rounded-full">Waiting for you...</span>}
                                     </div>
                                     <div
                                        className={cn(
                                            "h-24 border-2 border-dashed rounded-xl flex items-center justify-center relative overflow-hidden transition-colors duration-300",
                                            step === 4
                                                ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 transition-colors"
                                                : "border-green-500 bg-green-50/50 dark:bg-green-900/10"
                                        )}
                                     >
                                         {step === 4 && (
                                             <div className="flex flex-col items-center gap-2 animate-pulse">
                                                <div className="p-2 bg-blue-100 rounded-full">
                                                    <MousePointer2 className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Click to Sign</span>
                                             </div>
                                         )}

                                         {step >= 5 && (
                                            <svg viewBox="0 0 240 80" className="w-full h-full text-green-600 dark:text-green-400 p-2 transform scale-110">
                                                <path
                                                    d="M40 50 Q 70 20 100 50 T 170 50 T 210 40"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="5"
                                                    strokeLinecap="round"
                                                    strokeDasharray="300"
                                                    strokeDashoffset="0"
                                                    className="animate-[dash_1.5s_ease-out_forwards]"
                                                />
                                            </svg>
                                         )}
                                     </div>
                                 </div>
                             </div>

                             {/* Success State Overlay - Appears only at the END */}
                            {step === 6 && (
                                <div className="absolute inset-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-500 rounded-2xl">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 scale-in-center">
                                        <Check className="w-10 h-10 text-green-600 dark:text-green-400 stroke-[3]" />
                                    </div>
                                    <h3 className="text-3xl font-extrabold mb-2 text-foreground tracking-tight">All set!</h3>
                                    <p className="text-base text-muted-foreground mb-8 max-w-[240px] mx-auto leading-relaxed">
                                        Contract signed and copies emailed to everyone.
                                    </p>

                                    {/* Progress Bar for Restart */}
                                    <div className="w-full max-w-[180px] h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary animate-[progress_4s_linear_forward]" style={{ width: '100%' }} />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-wider">Restarting demo...</p>
                                </div>
                            )}
                         </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
