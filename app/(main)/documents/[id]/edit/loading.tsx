import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentEditorLoading() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Desktop Navbar Skeleton */}
      <div className="hidden md:flex justify-between items-center px-4 py-2.5 border-b bg-white">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Mobile Navbar Skeleton */}
      <div className="md:hidden flex justify-between items-center p-3 border-b bg-white shadow-sm">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar Skeleton */}
        <div className="hidden md:block w-16 border-r bg-gray-50">
          <div className="flex flex-col gap-4 p-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-12" />
            ))}
          </div>
        </div>

        {/* PDF Viewer Skeleton - Center */}
        <div className="flex-1 min-h-0 relative overflow-hidden bg-gray-100">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Skeleton className="h-8 w-8 mx-auto mb-4 rounded-full" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="hidden md:block w-80 border-l bg-gray-50">
          <div className="p-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
