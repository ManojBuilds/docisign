import { SignatureFieldData } from "@/components/signature-field";
import { ThumbnailSidebar } from "@/components/ThumbnailSidebar";
import { PdfDocumentProvider } from "@/components/PdfDocumentContext";
import { memo } from "react";
import { BackgroundPattern } from "./BackgroundPattern";
import { PdfLoadingState } from "./PdfLoadingState";
import { PdfViewerContainer } from "./PdfViewerContainer";
import { ZoomControls } from "./ZoomControls";
import { ModeIndicator } from "./ModeIndicator";

interface MainContentAreaProps {
  fileUrl: string;
  numPages: number;
  currentPage: number;
  scale: number;
  onPageClick: (page: number) => void;
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
 * Main content area containing PDF viewer, thumbnails, and controls
 */
export const MainContentArea = memo(
  ({
    fileUrl,
    numPages,
    currentPage,
    scale,
    onPageClick,
    onPageChange,
    onScaleChange,
    onNumPagesChange,
    onAddField,
    onUpdateField,
    onDeleteField,
    onSelectField,
    onSaveField,
  }: MainContentAreaProps) => {
    return (
      <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
        <BackgroundPattern />
        <div className="flex-1 h-full w-full relative">
          {!fileUrl ? (
            <PdfLoadingState />
          ) : (
            <PdfDocumentProvider fileUrl={fileUrl}>
              <div className="flex-1 h-full w-full flex">
                <ThumbnailSidebar
                  fileUrl={fileUrl}
                  numPages={numPages}
                  currentPage={currentPage}
                  onPageClick={onPageClick}
                />
                <div className="flex-1 relative h-full">
                  <ModeIndicator />
                  <PdfViewerContainer
                    fileUrl={fileUrl}
                    currentPage={currentPage}
                    scale={scale}
                    onPageChange={onPageChange}
                    onScaleChange={onScaleChange}
                    onNumPagesChange={onNumPagesChange}
                    onAddField={onAddField}
                    onUpdateField={onUpdateField}
                    onDeleteField={onDeleteField}
                    onSelectField={onSelectField}
                    onSaveField={onSaveField}
                  />
                  <ZoomControls scale={scale} setScale={onScaleChange} />
                </div>
              </div>
            </PdfDocumentProvider>
          )}
        </div>
      </div>
    );
  }
);

MainContentArea.displayName = "MainContentArea";
