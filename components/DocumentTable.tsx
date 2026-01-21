"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Id } from "@/convex/_generated/dataModel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  FileText,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useMemo, useState } from "react";

interface Document {
  _id: Id<"documents">;
  title: string;
  status: string;
  createdAt: number;
  updatedAt?: number;
  fileStorageId: Id<"_storage">;
  originalFileName: string;
  signers?: string[];
}

// Table component for documents
export const DocumentTable = ({
  data,
  onDownload,
  onDelete,
  isLoading = false,
}: {
  data: Document[];
  onDownload: (fileStorageId: Id<"_storage">, fileName: string) => void;
  onDelete: (documentId: Id<"documents">) => void;
  isLoading?: boolean;
}) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  // Since we're using Convex for data, we'll implement client-side pagination
  // but keep it simple by using the data we have
  const columns: ColumnDef<Document>[] = useMemo(() => [
    {
      accessorKey: "title",
      header: "Contract Name",
      cell: ({ row }) => (
        <Link
          href={`/d/${row.original._id}/edit`}
          className="font-medium text-gray-900 hover:text-blue-600 block max-w-[200px] truncate"
          title={row.getValue("title")}
        >
          {row.getValue("title")}
        </Link>
      ),
    },
    {
      accessorKey: "signers",
      header: "Recipients",
      cell: ({ row }) => {
        const signers = row.original.signers || [];
        if (signers.length === 0) return <span className="text-muted-foreground text-[12px] italic">Draft - No recipients</span>;

        const MAX_VISIBLE = 3;
        const visibleSigners = signers.slice(0, MAX_VISIBLE);
        const remaining = signers.length - MAX_VISIBLE;

        return (
          <div className="flex items-center pl-2">
            {visibleSigners.map((email, index) => (
              <Tooltip key={`${email}-${index}`}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold ring-2 ring-white cursor-default transition-transform hover:scale-110 hover:z-10 bg-gradient-to-br shadow-sm",
                      index > 0 && "-ml-2.5",
                      (index % 5 === 0) ? 'from-blue-500 to-indigo-600' :
                        (index % 5 === 1) ? 'from-violet-500 to-purple-600' :
                          (index % 5 === 2) ? 'from-fuchsia-500 to-pink-600' :
                            (index % 5 === 3) ? 'from-rose-500 to-red-600' :
                              'from-orange-500 to-amber-600'
                    )}
                  >
                    {email.charAt(0).toUpperCase()}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{email}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {remaining > 0 && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 text-[10px] font-semibold ring-2 ring-white -ml-2.5 shadow-sm">
                +{remaining}
              </div>
            )}
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const getStatusStyles = () => {
          switch (status) {
            case "draft":
              return { dot: "bg-gray-400", text: "text-gray-600" };
            case "sent":
              return { dot: "bg-blue-500", text: "text-blue-600" };
            case "in_progress":
              return { dot: "bg-yellow-500", text: "text-yellow-600" };
            case "completed":
              return { dot: "bg-green-500", text: "text-green-600" };
            case "expired":
              return { dot: "bg-red-500", text: "text-red-600" };
            case "cancelled":
              return { dot: "bg-red-500", text: "text-red-600" };
            case "declined":
              return { dot: "bg-orange-500", text: "text-orange-600" };
            default:
              return { dot: "bg-gray-400", text: "text-gray-600" };
          }
        };

        const getStatusText = () => {
          switch (status) {
            case "draft":
              return "Draft";
            case "sent":
              return "Waiting for Signature";
            case "in_progress":
              return "Signing in Progress";
            case "completed":
              return "Signed";
            case "expired":
              return "Expired";
            case "cancelled":
              return "Cancelled";
            case "declined":
              return "Declined";
            default:
              return status;
          }
        };

        const styles = getStatusStyles();

        return (
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full bg-muted/30 w-fit ${styles.text} text-[12px] font-medium`}>
            <div className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
            {getStatusText()}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Issued",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date);
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                onDownload(
                  row.original.fileStorageId,
                  row.original.originalFileName
                )
              }
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700"
              onClick={() => onDelete(row.original._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ], [onDownload, onDelete]);

  const isDesktop = useMediaQuery("(min-width: 640px)");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="md:p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-muted/5 border border-muted/20">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const DocumentCard = ({ doc }: { doc: Document }) => {
    const status = doc.status;
    const getStatusStyles = () => {
      switch (status) {
        case "draft": return "bg-zinc-100 text-zinc-600 border-zinc-200";
        case "sent": return "bg-blue-50 text-blue-600 border-blue-100";
        case "in_progress": return "bg-amber-50 text-amber-600 border-amber-100";
        case "completed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
        case "expired": return "bg-rose-50 text-rose-600 border-rose-100";
        case "cancelled": return "bg-zinc-50 text-zinc-500 border-zinc-100";
        case "declined": return "bg-orange-50 text-orange-600 border-orange-100";
        default: return "bg-zinc-100 text-zinc-600 border-zinc-200";
      }
    };

    const getStatusText = () => {
      switch (status) {
        case "draft": return "Draft";
        case "sent": return "Waiting";
        case "in_progress": return "Signing";
        case "completed": return "Signed";
        case "expired": return "Expired";
        case "cancelled": return "Cancelled";
        case "declined": return "Declined";
        default: return status;
      }
    };

    return (
      <div className="space-y-4 md:p-4 flex items-center justify-between gap-4 group transition-all hover:bg-muted/30 border-b border-muted/50 last:border-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
            status === "completed" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
          )}>
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <Link
              href={`/d/${doc._id}/edit`}
              className="font-semibold text-sm text-foreground hover:text-primary block truncate mb-1"
            >
              {doc.title}
            </Link>
            <div className="flex items-center gap-2">
              <span className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border shrink-0",
                getStatusStyles()
              )}>
                {getStatusText()}
              </span>
              <span className="text-[11px] text-muted-foreground truncate">
                {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(doc.createdAt))}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => onDownload(doc.fileStorageId, doc.originalFileName)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
            onClick={() => onDelete(doc._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden bg-background">
      {/* Desktop Table View */}
      {isDesktop ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="px-6 py-32 text-center text-muted-foreground"
                  >
                    <FileText className="w-12 h-12 text-muted/20 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No documents found
                    </h3>
                    <p>
                      No documents match your search criteria
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* Mobile Card View */
        <div className="flex flex-col divide-y divide-muted/50 border-t border-muted/50">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <DocumentCard key={row.id} doc={row.original} />
            ))
          ) : (
            <div className="px-6 py-20 text-center text-muted-foreground">
              <FileText className="w-12 h-12 text-muted/20 mx-auto mb-4" />
              <p className="text-sm">No documents found</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-muted bg-background px-4 py-4 sm:py-3">
        <div className="hidden sm:block text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {table.getFilteredRowModel().rows.length > 0
              ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
              : 0}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-foreground">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          contracts
        </div>

        <div className="sm:hidden text-xs text-muted-foreground font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="hidden sm:flex items-center px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-muted"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};