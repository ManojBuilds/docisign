"use client"

import { NewDocumentDialog } from '@/components/NewDocumentDialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { usePaginatedQuery, useQuery, useMutation } from 'convex/react'
import { Check, Clock, FileText, Send, XCircle, Download, MoreHorizontal, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';
import { Id } from '@/convex/_generated/dataModel'

export default function Dashboard() {
  const { user } = useUser()
  const dashboardStats = useQuery(
    api.dashboard.getDashboardStats,
    user ? { ownerId: user.id } : "skip"
  )

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "sent" | "in_progress" | "completed" | "expired" | "cancelled">("all")

  const { results: documents, status, loadMore } = usePaginatedQuery(
    api.dashboard.searchDocuments,
    user ?
      {
        ownerId: user?.id,
        searchTerm,
        status: filterStatus === "all" ? undefined : filterStatus,
      } : 'skip',
    {
      initialNumItems: 10
    }
  )

  // Mutations for quick actions
  const getFileUrl = useMutation(api.documents.getFileUrl);
  const deleteDocument = useMutation(api.documents.deleteDocument);

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Id<"documents"> | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Clock className="w-4 h-4 text-gray-500" />
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />
      case 'completed': return <Check className="w-4 h-4 text-green-500" />
      case 'expired': return <XCircle className="w-4 h-4 text-red-500" />
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />
      default: return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'sent': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDownload = async (fileStorageId: Id<"_storage">, fileName: string) => {
    try {
      const url = await getFileUrl({ storageId: fileStorageId });
      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Document download started.");
      } else {
        toast.error("Failed to get download URL.");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Error downloading document.");
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
        toast.success("Document deleted successfully.");
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Error deleting document.");
      } finally {
        setIsConfirmingDelete(false);
        setDocumentToDelete(null);
      }
    }
  };


  return (
    <div className='px-4 md:px-0'>

      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-lg md:text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.firstName || user?.emailAddresses[0].emailAddress}
            </p>
          </div>
          <NewDocumentDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.totalDocuments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.draftDocuments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.sentDocuments}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.completedDocuments}</div>
            </CardContent>
          </Card>


        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-6">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
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
            <Button variant="outline" onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}>
              <XCircle className="w-4 h-4" /> Clear Filters
            </Button>
          )}
        </div>

        {/* Document List */}
        <div>
          {documents && documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div key={doc._id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 relative h-fit md:h-44">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-gray-400 hidden sm:block" />
                    <div>
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </Badge>
                    <Link href={`/documents/${doc._id}/edit`} className='absolute inset-0'>

                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="z-10 cursor-pointer">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(doc.fileStorageId, doc.originalFileName);
                        }}>
                          <Download className="h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(doc._id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No documents found
              </h3>
              <p className="text-gray-600 mb-4">
                Adjust your search or create a new document.
              </p>
              <NewDocumentDialog />
            </div>
          )}
        </div>

        {status === "CanLoadMore" && (
          <div className="flex justify-center mt-8">
            <Button onClick={() => loadMore(10)}>Load More</Button>
          </div>
        )}

        <AlertDialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your document
                and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
