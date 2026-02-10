import { NewDocumentDialog } from "@/components/NewDocumentDialog";
import { SavedTemplatesList } from "@/components/templates/SavedTemplatesList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Suspense } from "react";

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-[#fafbfc] selection:bg-primary/10">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">

                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                        My Templates
                    </h1>


                    <NewDocumentDialog >
                        <Button className="w-full sm:w-auto transition-all group">
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            Create New Template
                        </Button>
                    </NewDocumentDialog>
                </div>

                <div className="relative">
                    <Suspense fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-48 rounded-2xl bg-white border border-slate-100 animate-pulse" />
                            ))}
                        </div>
                    }>
                        <SavedTemplatesList />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
