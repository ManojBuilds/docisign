import { NoiseEffect } from "@/components/effects/noise-effect";
import { ArrowLeft, ShieldCheck, Zap, Star } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Left Side: Hero Information (Hidden on Mobile) */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-16 bg-slate-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(37,99,235,0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(147,51,234,0.1)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <NoiseEffect />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <Logo showText={true} className="text-white hover:opacity-90 transition-opacity" />
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-all text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Exit to website</span>
            </Link>
          </div>

          <div className="mt-24 space-y-6">
            <h1 className="text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-700">
              A new era of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">document</span> signing
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000 delay-150">
              Join 2,847+ businesses who switched from legacy tools for a faster, simpler signing experience.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-12 mt-auto">
          <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">3x Faster Closures</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">Clients sign in 60 seconds from any phone without an account.</p>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                <ShieldCheck className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Legally Binding</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">ESIGN & UETA compliant with automated audit trails for every signature.</p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800/50 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1 text-orange-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500">
                  <span className="text-slate-200 font-semibold tracking-tight">Highly rated.</span> Join 10k+ users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="relative flex flex-1 flex-col items-center justify-center p-4 sm:p-8 lg:p-12 xl:p-24 overflow-y-auto">
        <div className="w-full max-w-[420px] py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="lg:hidden mb-8 flex flex-col items-center gap-4 text-center">
            <Logo showText={true} />
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">Get started</h1>
              <p className="text-sm text-slate-500">
                The world's fastest way to sign documents.
              </p>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {children}
          </div>

          <div className="mt-8 text-center border-t border-slate-50 pt-8">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-2 group cursor-default uppercase tracking-widest font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500/50 group-hover:text-blue-500 transition-colors" strokeWidth={3} />
              Enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
