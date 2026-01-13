import type { SignatureFieldData as SigningFieldDataType } from "@/components/signing-field";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseSignatureFieldsProps {
  signingSession: any;
  pageDimensions: Record<number, { width: number; height: number }> | null;
}

/**
 * Hook to manage signature fields state and normalization
 */
export function useSignatureFields({ signingSession, pageDimensions }: UseSignatureFieldsProps) {
  const [signatureFields, setSignatureFields] = useState<SigningFieldDataType[]>([]);

  // Normalization logic
  useEffect(() => {
    if (!signingSession?.signatureFields) return;

    const serverFields: SigningFieldDataType[] = signingSession.signatureFields.map((field: any) => {
      // Get dimensions if available, otherwise use 0 (will update when page renders)
      const dims = pageDimensions?.[field.page];

      return {
        id: field._id,
        fieldType: field.fieldType,
        page: field.page,
        signerEmail: field.signerEmail,
        isRequired: field.isRequired,
        label: field.label,
        isCompleted: field.isCompleted,
        signatureData: field.signatureData,
        normalizedX: dims ? field.x / dims.width : 0,
        normalizedY: dims ? field.y / dims.height : 0,
        normalizedWidth: dims ? field.width / dims.width : 0,
        normalizedHeight: dims ? field.height / dims.height : 0,
      };
    });

    setSignatureFields((prev) => {
      // If no local state, initialize with server data
      if (prev.length === 0) return serverFields;

      // Merge server updates, preserving local unsaved completions
      return serverFields.map((serverField) => {
        const localField = prev.find((f) => f.id === serverField.id);

        // If local has a signature but server doesn't, keep local
        if (localField?.isCompleted && !serverField.isCompleted) {
          return localField;
        }

        // If we don't have dimensions for this field yet in serverFields (handled by map above)
        // but we DID have them in localField, preserve the local coordinates to avoid flicker
        if (serverField.normalizedX === 0 && localField && localField.normalizedX !== 0) {
          return {
            ...serverField,
            normalizedX: localField.normalizedX,
            normalizedY: localField.normalizedY,
            normalizedWidth: localField.normalizedWidth,
            normalizedHeight: localField.normalizedHeight,
          };
        }

        return serverField;
      });
    });
  }, [signingSession?.signatureFields, pageDimensions]);

  const requiredFields = useMemo(() => {
    return signatureFields.filter((f) => f.isRequired);
  }, [signatureFields]);

  const incompleteRequiredFields = useMemo(() => {
    return signatureFields.filter((f) => f.isRequired && !f.isCompleted);
  }, [signatureFields]);

  const completedFieldsCount = useMemo(() => {
    return signatureFields.filter((f) => f.isCompleted).length;
  }, [signatureFields]);

  const completedRequiredFieldsCount = useMemo(() => {
    return requiredFields.filter((f) => f.isCompleted).length;
  }, [requiredFields]);

  const updateLocalField = useCallback((fieldId: string, signatureData: string) => {
    setSignatureFields((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? { ...field, isCompleted: true, signatureData }
          : field,
      )
    );
  }, []);

  return {
    signatureFields,
    setSignatureFields,
    requiredFields,
    incompleteRequiredFields,
    completedFieldsCount,
    completedRequiredFieldsCount,
    updateLocalField,
  };
}
