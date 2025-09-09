"use client"
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Download, Mail, Calendar, Loader2 } from 'lucide-react'

function SigningComplete() {
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('token')
  
  const signingSession = useQuery(
    api.signers.getSigningSession,
    accessToken ? { accessToken } : "skip"
  )
  
  const [isDownloading, setIsDownloading] = useState(false);
  const getFileUrl = useMutation(api.documents.getFileUrl);

  const handleDownload = async () => {
    if (!signingSession?.document?.fileStorageId) return;
    
    setIsDownloading(true);
    try {
      const url = await getFileUrl({ storageId: signingSession.document.fileStorageId });
      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.download = signingSession.document.title + "-signed.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (signingSession === undefined && accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!signingSession || signingSession.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4 p-8">
          <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Invalid Session</h1>
            <p className="text-muted-foreground">This signing session could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        
        {/* Success Icon */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Document Signed Successfully
            </h1>
            <p className="text-muted-foreground">
              Thank you for signing &ldquo;{signingSession.document?.title}&rdquo;. 
              All parties will be notified of the completion.
            </p>
          </div>
        </div>

        <div className="h-px bg-border"></div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium">Signed by</p>
              <p className="text-muted-foreground">{signingSession.signer?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="font-medium">Completed</p>
              <p className="text-muted-foreground">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-border"></div>

        {/* Actions */}
        <div className="space-y-4">
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="w-full"
            size="lg"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Download Signed Document
              </>
            )}
          </Button>
          
          <p className="text-center text-xs text-muted-foreground">
            You will also receive a copy via email shortly
          </p>
        </div>

        <div className="h-px bg-border"></div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            This window can be safely closed
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SigningCompletePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SigningComplete />
    </Suspense>
  )
}
