"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ConvexError } from "convex/values";
import { Calendar, FileText, LayoutTemplate, MoreVertical, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { UseTemplateDialog } from "./UseTemplateDialog";
import { formatDistanceToNow } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
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


export function SavedTemplatesList() {
    const { user } = useUser();
    const templates = useQuery(api.templates.getTemplates, user ? { ownerId: user.id } : "skip");

    if (templates === undefined) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="shadow-none border-slate-200">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <Skeleton className="w-10 h-10 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-[70%]" />
                                <Skeleton className="h-3 w-[40%]" />
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        );
    }

    if (templates.length === 0) {
        return (
            <Card className="text-center py-16 px-4 border-2 border-dashed bg-muted/5 shadow-none">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <LayoutTemplate className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No templates yet</h3>
                <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                    Save any document as a reusable template to save time on recurring contracts.
                </p>
                <Link href="/dashboard" className="inline-block w-full sm:w-auto">
                    <Button className="w-full sm:w-auto shadow-none">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Template
                    </Button>
                </Link>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((template) => (
                <TemplateCard key={template._id} template={template} />
            ))}
        </div>
    );
}

function TemplateCard({ template }: { template: Doc<"documents"> }) {
    const roles = template.templateRoles || [];
    const deleteTemplate = useMutation(api.templates.deleteTemplate);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteTemplate({ templateId: template._id });
            toast.success("Template deleted");
        } catch (error) {
            console.error("Error deleting template:", error);
            const errorMessage = error instanceof ConvexError
                ? error.data
                : error instanceof Error
                    ? error.message.replace("Uncaught Error: ", "").replace("ConvexError: ", "")
                    : "Failed to delete template";
            toast.error(errorMessage);
        } finally {
            setShowDeleteDialog(false);
        }
    };

    return (
        <Card className="flex flex-col h-full shadow-none border-slate-200 rounded-xl overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 flex-shrink-0 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm font-bold text-slate-900 truncate" title={template.title}>
                            {template.title}
                        </CardTitle>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDistanceToNow(template.createdAt, { addSuffix: true })}</span>
                        </div>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 shadow-none border-slate-200">
                        <DropdownMenuItem asChild>
                            <Link href={`/d/${template._id}/edit`} className="flex items-center gap-2 cursor-pointer">
                                <FileText className="w-4 h-4" />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                            onSelect={(e) => {
                                e.preventDefault();
                                setShowDeleteDialog(true);
                            }}
                        >
                            <Trash className="w-4 h-4 mr-2" />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent className="pb-4">
                {roles.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                        {roles.slice(0, 3).map((role, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-100 rounded"
                            >
                                {role}
                            </span>
                        ))}
                        {roles.length > 3 && (
                            <span className="px-2 py-0.5 text-slate-400 text-[10px]">
                                +{roles.length - 3} more
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="text-[10px] text-slate-400 italic">No roles defined</div>
                )}
            </CardContent>

            <CardFooter className="mt-auto pt-0">
                <UseTemplateDialog
                    template={template}
                    trigger={
                        <Button variant="outline" className="w-full text-xs font-semibold h-10 shadow-none">
                            Use Template
                        </Button>
                    }
                />
            </CardFooter>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="shadow-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Template?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove "{template.title}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white shadow-none"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}

