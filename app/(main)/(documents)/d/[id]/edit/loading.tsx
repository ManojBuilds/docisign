import Logo from "@/components/Logo";

export default function DocumentEditorLoading() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Navbar Skeleton */}
      <div className="h-[65px] w-full border-b bg-white flex items-center justify-between px-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-9 w-24 bg-gray-100 rounded-lg" />
          <div className="h-6 w-48 bg-gray-100 rounded-md hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-32 bg-gray-100 rounded-lg hidden sm:block" />
          <div className="h-9 w-24 sm:w-32 bg-gray-100 rounded-lg" />
          <div className="h-8 w-8 bg-gray-100 rounded-full" />
        </div>
      </div>

      <div className="flex-1 flex min-h-0 relative">
        {/* Thumbnail Sidebar Skeleton - Desktop only */}
        <div className="w-48 border-r bg-white h-full hidden md:flex flex-col animate-pulse">
          <div className="p-4 border-b h-[53px] flex items-center justify-between">
            <div className="h-3 w-12 bg-gray-100 rounded" />
            <div className="h-4 w-6 bg-gray-100 rounded" />
          </div>
          <div className="p-4 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="aspect-[3/4] w-full bg-gray-50 rounded-sm border border-gray-100" />
                <div className="h-2 w-10 bg-gray-50 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50/50">
          <div className="w-full max-w-[600px] aspect-[1/1.41] bg-white rounded-md border border-gray-100 flex flex-col items-center justify-center animate-pulse shadow-sm">
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
              <div className="mb-6 scale-90 opacity-70">
                <Logo />
              </div>
              <div className="h-1 w-32 bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-primary/40 animate-indeterminate-progress rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Signers Sidebar Skeleton - Large Desktop only */}
        <div className="w-[300px] border-l bg-white h-full hidden lg:flex flex-col animate-pulse">
          <div className="p-6 space-y-6">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-100 rounded" />
              <div className="h-20 w-full bg-gray-50 rounded-2xl border border-gray-100" />
            </div>
            <div className="space-y-4 pt-4">
              <div className="h-10 w-full bg-gray-50 rounded-xl border border-gray-100" />
              <div className="h-10 w-full bg-gray-50 rounded-xl border border-gray-100" />
              <div className="h-10 w-full bg-gray-50 rounded-xl border border-gray-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar Skeleton */}
      <div className="h-[70px] border-t bg-white px-4 flex items-center justify-between md:hidden shrink-0 animate-pulse">
        <div className="h-9 w-24 bg-gray-100 rounded-full" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gray-100 rounded-full" />
          <div className="h-9 w-9 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  );
}
