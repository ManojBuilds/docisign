"use client";

import { DocumentTable } from "@/components/DocumentTable";
import { NewDocumentDialog } from "@/components/NewDocumentDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useMediaQuery from "@/hooks/use-media-query";
import { useResumePendingDocument } from "@/hooks/usePendingResumeDocument";
import { useUser } from "@clerk/clerk-react";
import { useMutation, usePaginatedQuery } from "convex/react";
import debounce from "debounce";
import {
  FileText,
  Filter,
  Loader2,
  Plus,
  Search
} from "lucide-react";
import { Suspense, useCallback, useState } from "react";
import { toast } from "sonner";

// Types for better TypeScript support
type DocumentStatus =
  | "all"
  | "draft"
  | "sent"
  | "in_progress"
  | "completed"
  | "expired"
  | "cancelled"
  | "declined";

// Documents Component - Loads independently
function DocumentsList() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const handleDebouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleDebouncedSearch(value);
  };

  const [filterStatus, setFilterStatus] = useState<DocumentStatus>("all");
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [documentToDelete, setDocumentToDelete] =
    useState<Id<"documents"> | null>(null);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  // Get documents using the existing paginated query
  const {
    results: documents,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.dashboard.searchDocuments,
    user
      ? {
        ownerId: user.id,
        searchTerm: debouncedSearchTerm,
        status: filterStatus === "all" ? undefined : filterStatus,
      }
      : "skip",
    {
      initialNumItems: 20, // Load fewer items initially for faster TTI
    },
  );

  const getFileUrl = useMutation(api.documents.getFileUrl);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const handleDownload = async (
    fileStorageId: Id<"_storage">,
    fileName: string,
  ) => {
    try {
      const url = await getFileUrl({ storageId: fileStorageId });
      if (url) {
        // Fetch the file content to ensure it's downloaded as a blob
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
      } else {
        toast.error("Download failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Download error");
    }
  };

  const handleDelete = async (documentId: Id<"documents">) => {
    setDocumentToDelete(documentId);
    setIsConfirmingDelete(true);
  };

  const confirmDelete = async () => {
    if (documentToDelete) {
      try {
        await deleteDocument({ documentId: documentToDelete });
      } catch (error) {
        console.error(error);
        toast.error("Delete failed");
      } finally {
        setIsConfirmingDelete(false);
        setDocumentToDelete(null);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">My Contracts</h1>
      </div>
      <div className="border border-muted rounded-2xl bg-card overflow-hidden">
        {/* Actions Toolbar - Header of the list Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/10 border-b border-muted">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 group max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-foreground" />
              <Input
                placeholder="Search contracts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-9 h-10 bg-background border-muted/50 focus-visible:ring-1 focus-visible:ring-ring transition-all rounded-lg text-sm pr-9"
              />
              {searchTerm !== debouncedSearchTerm && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={filterStatus}
              onValueChange={(value: DocumentStatus) => setFilterStatus(value)}
            >
              <SelectTrigger className="w-fit min-w-[110px] h-10 bg-background border-muted/50 focus:ring-1 focus:ring-ring rounded-lg text-sm gap-2">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Waiting for Signature</SelectItem>
                <SelectItem value="in_progress">Signing in Progress</SelectItem>
                <SelectItem value="completed">Signed</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
            <NewDocumentDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Contract
              </Button>
            </NewDocumentDialog>
          </div>
        </div>

        {/* Document List Content */}
        <div>
          {status === "LoadingFirstPage" ? (
            <DocumentTable
              data={[]}
              onDownload={handleDownload}
              onDelete={handleDelete}
              isLoading={true}
            />
          ) : documents && documents.length > 0 ? (
            <DocumentTable
              data={documents}
              onDownload={handleDownload}
              onDelete={handleDelete}
              isLoading={false}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-40 text-center bg-background relative overflow-hidden">
              {/* Subtle background flair */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
              </div>

              <div className="relative">
                <div className="relative mx-auto w-24 h-24 mb-8">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl rotate-6" />
                  <div className="absolute inset-0 bg-background border border-muted rounded-3xl shadow-sm flex items-center justify-center">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                  {searchTerm || filterStatus !== "all" ? "No matches found" : "Ready for your next client?"}
                </h3>
                <p className="text-muted-foreground max-w-[320px] mb-10 text-balance leading-relaxed">
                  {searchTerm || filterStatus !== "all"
                    ? "We couldn't find any contracts matching your current filters. Try adjusting your search."
                    : "Create and send professional contracts in seconds. Get your work signed and protected today."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <NewDocumentDialog>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Contract
                    </Button>
                  </NewDocumentDialog>
                  {(searchTerm || filterStatus !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setFilterStatus("all");
                      }}
                      className="rounded-lg h-10 px-6 font-medium"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {status === "CanLoadMore" && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => loadMore(10)}
            variant="ghost"
            className="rounded-full px-8 underline-offset-4 hover:underline h-9 text-xs text-muted-foreground hover:text-foreground"
          >
            Load more
          </Button>
        </div>
      )}

      {isDesktop ? (
        <AlertDialog
          open={isConfirmingDelete}
          onOpenChange={setIsConfirmingDelete}
        >
          <AlertDialogContent className="rounded-2xl border-none shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete contract?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The contract will be permanently
                deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl border-none bg-muted hover:bg-muted/80">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="rounded-xl bg-destructive hover:bg-destructive/90 text-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Delete contract?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone. The contract will be permanently
                deleted.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <Button variant="destructive" onClick={confirmDelete} className="rounded-xl">
                Delete
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="rounded-xl">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  useResumePendingDocument()

  return (
    <div className="min-h-screen bg-background selection:bg-primary/10">
      <main className="max-w-6xl mx-auto px-6 py-12 md:pb-20">
        <Suspense fallback={
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48 rounded-lg" />
            </div>
            <div className="border border-muted rounded-2xl bg-card overflow-hidden">
              {/* Toolbar skeleton */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/10 border-b border-muted">
                <Skeleton className="h-10 w-full max-w-md rounded-lg" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-32 rounded-lg" />
                  <Skeleton className="h-10 w-40 rounded-lg" />
                </div>
              </div>
              {/* Table skeleton */}
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/5">
                    <Skeleton className="h-4 flex-1 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }>
          <DocumentsList />
        </Suspense>
      </main>
    </div>
  );
}
