"use client";

import { lazy, memo, Suspense } from "react";

const SigningField = lazy(() => import("@/components/signing-field"));

interface SigningPageOverlayProps {
  pNum: number;
  signatureFields: any[];
  currentActiveFieldId?: string;
  handleFieldComplete: (fieldId: string, signatureData: string) => Promise<void>;
}

export const SigningPageOverlay = memo(({
  pNum,
  signatureFields,
  currentActiveFieldId,
  handleFieldComplete,
}: SigningPageOverlayProps) => {
  const fieldsOnPage = signatureFields.filter(f => f.page === pNum);

  if (fieldsOnPage.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="pointer-events-auto w-full h-full relative">
        <Suspense fallback={null}>
          {fieldsOnPage.map((field) => (
            <SigningField
              key={field.id}
              field={field}
              isEditMode={false}
              onComplete={handleFieldComplete}
              isFocused={currentActiveFieldId === field.id}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
});

SigningPageOverlay.displayName = "SigningPageOverlay";
