import type { SignatureFieldData as SigningFieldDataType } from "@/components/signing-field";
import { useCallback, useState } from "react";

interface UseFieldNavigationProps {
  incompleteRequiredFields: SigningFieldDataType[];
}

/**
 * Hook to manage navigation between signature fields and pages
 */
export function useFieldNavigation({
  incompleteRequiredFields,
}: UseFieldNavigationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentSignatureFieldIndex, setCurrentSignatureFieldIndex] = useState<number>(0);

  const goToNextSignatureField = useCallback(() => {
    if (incompleteRequiredFields.length === 0) return;

    const newIndex = (currentSignatureFieldIndex + 1) % incompleteRequiredFields.length;
    setCurrentSignatureFieldIndex(newIndex);
    setCurrentPage(incompleteRequiredFields[newIndex].page);
  }, [currentSignatureFieldIndex, incompleteRequiredFields]);

  const goToField = useCallback((field: SigningFieldDataType, index: number) => {
    setCurrentPage(field.page);
    setCurrentSignatureFieldIndex(index);
  }, []);

  const currentActiveField = incompleteRequiredFields[currentSignatureFieldIndex];

  return {
    currentPage,
    setCurrentPage,
    numPages,
    setNumPages,
    currentSignatureFieldIndex,
    setCurrentSignatureFieldIndex,
    goToNextSignatureField,
    goToField,
    currentActiveField,
  };
}
