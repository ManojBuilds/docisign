import { FrameHighlight } from "@/components/effects/frame-highlight";
import { NoiseEffect } from "@/components/effects/noise-effect";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 text-slate-900">
      <div className="min-h-screen w-full relative">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(255, 220, 190, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 245, 238, 0.35) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 210, 180, 0.15) 0%, transparent 50%)`,
          }}
        />

        <NoiseEffect />

        <div className="relative z-10 w-full p-8">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              A new era of <FrameHighlight>document</FrameHighlight> signing
            </h1>
            <p className="text-sm text-slate-600">
              Secure, fast, and built for the modern web.
            </p>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
