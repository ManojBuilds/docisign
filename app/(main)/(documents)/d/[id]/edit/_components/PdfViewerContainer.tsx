import { SignatureFieldData } from "@/components/signature-field";
import { memo, Suspense } from "react";
import PdfViewerWrapper from "@/components/pdf-viewer-wrapper";
import { PageOverlay } from "./PageOverlay";
import { PdfLoadingState } from "./PdfLoadingState";


interface PdfViewerContainerProps {
  fileUrl: string;
  currentPage: number;
  scale: number;
  onPageChange: (page: number) => void;
  onScaleChange: (scale: number) => void;
  onNumPagesChange: (numPages: number) => void;
  onAddField: (
    fieldType: SignatureFieldData["fieldType"],
    dimensions: any,
    page: number
  ) => void;
  onUpdateField: (field: SignatureFieldData) => void;
  onDeleteField: (id: string) => void;
  onSelectField: (id: string) => void;
  onSaveField: (field: SignatureFieldData) => Promise<void>;
}

/**
 * Container for PDF viewer with overlays
 */
export const PdfViewerContainer = memo(
  ({
    fileUrl,
    currentPage,
    scale,
    onPageChange,
    onScaleChange,
    onNumPagesChange,
    onAddField,
    onUpdateField,
    onDeleteField,
    onSelectField,
    onSaveField,
  }: PdfViewerContainerProps) => {
    return (
      <Suspense fallback={<PdfLoadingState />}>
        <PdfViewerWrapper
          fileUrl={fileUrl}
          pageNumber={currentPage}
          onPageChange={onPageChange}
          onScaleChange={onScaleChange}
          onNumPagesChange={onNumPagesChange}
          showControls={false}
          className="h-full w-full"
        >
          {(pNum: number) => (
            <PageOverlay
              pageNumber={pNum}
              scale={scale}
              onAddField={onAddField}
              onUpdateField={onUpdateField}
              onDeleteField={onDeleteField}
              onSelectField={onSelectField}
              onSaveField={onSaveField}
            />
          )}
        </PdfViewerWrapper>
      </Suspense>
    );
  }
);

PdfViewerContainer.displayName = "PdfViewerContainer";
