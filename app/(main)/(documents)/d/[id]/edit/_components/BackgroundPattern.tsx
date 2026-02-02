import { memo } from "react";

/**
 * Background pattern for the PDF viewer area
 */
export const BackgroundPattern = memo(() => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none bg-gray-50/50">
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  );
});

BackgroundPattern.displayName = "BackgroundPattern";
