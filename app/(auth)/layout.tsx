import { NoiseEffect } from "@/components/effects/noise-effect";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return <div className="min-h-svh flex flex-col items-center justify-center p-2 sm:p-6">
        {children}
        <NoiseEffect />
    </div>
}