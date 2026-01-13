import type { SignatureFieldData as SigningFieldDataType } from "@/components/signing-field";
import { ThumbnailSidebar } from "@/components/ThumbnailSidebar";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";
import { SigningBottomBar } from "./SigningBottomBar";
import { SigningNavbar } from "./SigningNavbar";
import { SigningPageOverlay } from "./SigningPageOverlay";
import { SigningZoomControls } from "./SigningZoomControls";

const PdfViewerWrapper = lazy(() => import("@/components/pdf-viewer-wrapper"));

interface MainSigningViewProps {
  signingSession: any;
  owner: any;
  handleSubmitDocument: (fields?: SigningFieldDataType[]) => Promise<any>;
  isSubmitting: boolean;
  isReady: boolean;
  setIsReady: (ready: boolean) => void;
  signatureFields: SigningFieldDataType[];
  completedRequiredFieldsCount: number;
  requiredFields: SigningFieldDataType[];
  setShowDeclineDialog: (show: boolean) => void;
  fileUrl: string;
  numPages: number;
  setNumPages: (num: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  scale: number;
  setScale: (scale: number | ((s: number) => number)) => void;
  incompleteRequiredFields: SigningFieldDataType[];
  goToNextSignatureField: () => void;
  currentActiveField?: SigningFieldDataType;
  handleFieldComplete: (fieldId: string, signatureData: string) => Promise<void>;
  hasStarted: boolean;
  handleStartSigning: () => void;
}

export function MainSigningView({
  signingSession,
  owner,
  handleSubmitDocument,
  isSubmitting,
  isReady,
  setIsReady,
  signatureFields,
  completedRequiredFieldsCount,
  requiredFields,
  setShowDeclineDialog,
  fileUrl,
  numPages,
  setNumPages,
  currentPage,
  setCurrentPage,
  scale,
  setScale,
  incompleteRequiredFields,
  goToNextSignatureField,
  currentActiveField,
  handleFieldComplete,
  hasStarted,
  handleStartSigning,
}: MainSigningViewProps) {
  return (
    <div className="h-dvh flex flex-col bg-gray-50/30 relative">
      <SigningNavbar
        signingSession={signingSession}
        owner={owner}
        handleSubmitDocument={handleSubmitDocument}
        isSubmitting={isSubmitting}
        signatureFields={signatureFields}
        completedRequiredFields={completedRequiredFieldsCount}
        requiredFields={requiredFields}
        onDecline={() => setShowDeclineDialog(true)}
        hasStarted={hasStarted}
        handleStartSigning={handleStartSigning}
        goToNextSignatureField={goToNextSignatureField}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Thumbnail Sidebar - Hidden on Mobile */}
        <div className="hidden md:flex h-full z-20">
          <ThumbnailSidebar
            fileUrl={fileUrl}
            numPages={numPages}
            currentPage={currentPage}
            onPageClick={setCurrentPage}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative flex flex-col bg-gray-100 overflow-hidden">
          <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.05) 2px, rgba(75, 85, 99, 0.05) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.04) 2px, rgba(107, 114, 128, 0.04) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.03) 2px, rgba(55, 65, 81, 0.03) 3px, transparent 3px, transparent 8px),
                repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.02) 2px, rgba(31, 41, 55, 0.02) 3px, transparent 3px, transparent 8px)
              `,
            }}
          />

          <div className={cn("flex-1 z-10 h-full transition-all duration-700 bg-transparent pb-[80px] md:pb-0", (!fileUrl || !isReady) ? "opacity-0 scale-[0.99] translate-y-1 pointer-events-none" : "opacity-100 scale-100 translate-y-0")}>
            {fileUrl && (
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              }>
                <PdfViewerWrapper
                  fileUrl={fileUrl}
                  pageNumber={currentPage}
                  onPageChange={setCurrentPage}
                  onNumPagesChange={setNumPages}
                  onScaleChange={setScale}
                  showControls={false}
                  onReady={() => setIsReady(true)}
                >
                  {(pNum: number) => (
                    <SigningPageOverlay
                      pNum={pNum}
                      signatureFields={signatureFields}
                      currentActiveFieldId={currentActiveField?.id}
                      handleFieldComplete={handleFieldComplete}
                    />
                  )}
                </PdfViewerWrapper>
              </Suspense>
            )}
          </div>

          <SigningZoomControls scale={scale} setScale={setScale} />
        </main>
      </div>

      <SigningBottomBar
        incompleteRequiredFields={incompleteRequiredFields}
        isSubmitting={isSubmitting}
        onNext={goToNextSignatureField}
        onSubmit={handleSubmitDocument}
        hasStarted={hasStarted}
        handleStartSigning={handleStartSigning}
      />
    </div>
  );
}
