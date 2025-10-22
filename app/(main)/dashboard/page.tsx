"use client";

import { NewDocumentDialog } from "@/components/NewDocumentDialog";
import { DocumentTable } from "@/components/DocumentTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { usePaginatedQuery, useQuery, useMutation } from "convex/react";
import {
  Check,
  Clock,
  FileText,
  Send,
  XCircle
} from "lucide-react";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";
import { useState } from "react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

// Types for better TypeScript support
type DocumentStatus =
  | "all"
  | "draft"
  | "sent"
  | "in_progress"
  | "completed"
  | "expired"
  | "cancelled";

interface DashboardStats {
  totalDocuments?: number;
  draftDocuments?: number;
  sentDocuments?: number;
  completedDocuments?: number;
}

// interface Document {
//   _id: Id<"documents">;
//   title: string;
//   status: string;
//   createdAt: number;
//   updatedAt?: number;
//   fileStorageId: Id<"_storage">;
//   originalFileName: string;
// }

// Simple Mobile Stats - no cards, just clean boxes
const MobileStats = ({ stats }: { stats: DashboardStats | undefined }) => (
  <div className="grid grid-cols-2 gap-4 mb-6 sm:hidden">
    <div className="bg-gray-50 p-4 border-l-4 border-blue-500">
      <div className="flex items-center gap-2 mb-1">
        <FileText className="h-4 w-4 text-blue-600" />
        <p className="text-sm font-medium text-gray-700">Total</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {stats?.totalDocuments ?? 0}
      </p>
    </div>
    <div className="bg-gray-50 p-4 border-l-4 border-green-500">
      <div className="flex items-center gap-2 mb-1">
        <Check className="h-4 w-4 text-green-600" />
        <p className="text-sm font-medium text-gray-700">Done</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {stats?.completedDocuments ?? 0}
      </p>
    </div>
    <div className="bg-gray-50 p-4 border-l-4 border-yellow-500">
      <div className="flex items-center gap-2 mb-1">
        <Send className="h-4 w-4 text-yellow-600" />
        <p className="text-sm font-medium text-gray-700">Sent</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {stats?.sentDocuments ?? 0}
      </p>
    </div>
    <div className="bg-gray-50 p-4 border-l-4 border-gray-400">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="h-4 w-4 text-gray-600" />
        <p className="text-sm font-medium text-gray-700">Draft</p>
      </div>
      <p className="text-2xl font-bold text-gray-900">
        {stats?.draftDocuments ?? 0}
      </p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useUser();
  const dashboardStats = useQuery(
    api.dashboard.getDashboardStats,
    user ? { ownerId: user.id } : "skip",
  );

  const [searchTerm, setSearchTerm] = useState("");
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
          searchTerm,
          status: filterStatus === "all" ? undefined : filterStatus,
        }
      : "skip",
    {
      initialNumItems: 100, // Load more documents for table pagination
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
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Document downloaded");
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
        toast.success("Document deleted");
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
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-muted-foreground">
            Welcome back,{" "}
            <span className="text-lg font-semibold text-foreground">
              {user?.firstName ||
                user?.emailAddresses[0]?.emailAddress?.split("@")[0] ||
                "User"}
            </span>
          </p>
        </div>
        <NewDocumentDialog />
      </div>

      {/* Mobile Stats */}
      <MobileStats stats={dashboardStats} />

      {/* Desktop Stats - Keep cards only for main stats */}
      <div className="hidden sm:grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold">
                {dashboardStats?.totalDocuments ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Draft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold">
                {dashboardStats?.draftDocuments ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold">
                {dashboardStats?.sentDocuments ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold">
                {dashboardStats?.completedDocuments ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <div className="flex gap-3">
          <Select
            value={filterStatus}
            onValueChange={(value: DocumentStatus) => setFilterStatus(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {(searchTerm !== "" || filterStatus !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
            >
              <XCircle className="w-4 h-4 mr-2" /> Clear
            </Button>
          )}
        </div>
      </div>

      {/* Document Table */}
      <div className="mb-6">
        {documents && documents.length > 0 ? (
          <DocumentTable
            data={documents}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ) : (
          <div className="border rounded-lg text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No documents found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first document to get started"}
            </p>
            <NewDocumentDialog />
          </div>
        )}
      </div>

      {/* Load More - Needed for fetching more data from Convex, but table handles its own pagination */}
      {status === "CanLoadMore" && (
        <div className="flex justify-center mb-6">
          <Button onClick={() => loadMore(10)} variant="outline">
            Load More Documents
          </Button>
        </div>
      )}

      {/* Delete Dialog */}
      {isDesktop ? (
        <AlertDialog
          open={isConfirmingDelete}
          onOpenChange={setIsConfirmingDelete}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete document?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The document will be permanently
                deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Delete document?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone. The document will be permanently
                deleted.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
