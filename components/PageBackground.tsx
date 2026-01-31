import React from "react";

interface PageBackgroundProps {
    opacity?: string;
}

export const PageBackground = ({ opacity = "opacity-[0.035]" }: PageBackgroundProps) => {
    const imageUrl = "https://2d9wfb370a.ufs.sh/f/X2DTqAlZ9Pgupj8r27wbAQC3TH6iZ98sKJ1Uvou4eYBdxWLO";
    const optimizedUrl = `/_next/image?url=${encodeURIComponent(imageUrl)}&w=384&q=50`;

    return (
        <div
            style={{
                backgroundImage: `url('${optimizedUrl}')`,
            }}
            className={`pointer-events-none [z-index:-1] absolute inset-0 bg-[size:180px] bg-repeat ${opacity}`}
        />
    );
};
