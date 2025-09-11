"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Upload, FileText, X, Bug, Lightbulb, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

const formSchema = z.object({
  type: z.enum(["bug", "feature", "help"]).refine((val) => val !== undefined, {
    message: "Please select a request type.",
  }),
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must be less than 1000 characters.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface SupportModalProps {
  trigger?: React.ReactNode;
}

export function SupportModal({ trigger }: SupportModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMobile();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "help",
      title: "",
      description: "",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Limit to 3 files
      if (files.length + acceptedFiles.length > 3) {
        toast.error("You can only upload up to 3 files.");
        return;
      }

      // Only accept image files
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith("image/"),
      );

      if (imageFiles.length !== acceptedFiles.length) {
        toast.error("Only image files are allowed.");
        return;
      }

      // Check file size (max 5MB each)
      const oversizedFiles = imageFiles.filter(
        (file) => file.size > 5 * 1024 * 1024,
      );
      if (oversizedFiles.length > 0) {
        toast.error("Files must be less than 5MB.");
        return;
      }

      setFiles((prev) => [...prev, ...imageFiles]);
    },
    [files],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
    maxFiles: 3,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Create FormData object to send to HeySheet
      const formData = new FormData();

      // Add form fields with capitalized keys
      formData.append("Type", data.type);
      formData.append("Title", data.title);
      formData.append("Description", data.description);

      // Add files if any
      files.forEach((file, index) => {
        formData.append(`Screenshot_${index + 1}`, file);
      });

      // Send to HeySheet endpoint
      const response = await fetch("https://app.heysheet.in/api/s/Zo0HVTIDk6", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      const result = await response.json();
      console.log("Support request submitted:", result);

      toast.success("Your request has been submitted successfully!");
      setIsOpen(false);
      form.reset();
      setFiles([]);
    } catch (error) {
      toast.error("Failed to submit your request. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <Bug className="w-4 h-4 mr-2" />;
      case "feature":
        return <Lightbulb className="w-4 h-4 mr-2" />;
      default:
        return <HelpCircle className="w-4 h-4 mr-2" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "bug":
        return "Bug Report";
      case "feature":
        return "Feature Request";
      default:
        return "Help Request";
    }
  };
  const content = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a request type">
                      <div className="flex items-center">
                        {getTypeIcon(field.value)}
                        {getTypeLabel(field.value)}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bug">
                    <div className="flex items-center">
                      <Bug className="w-4 h-4 mr-2" />
                      Bug Report
                    </div>
                  </SelectItem>
                  <SelectItem value="feature">
                    <div className="flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Feature Request
                    </div>
                  </SelectItem>
                  <SelectItem value="help">
                    <div className="flex items-center">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Request
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Briefly describe your request" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide detailed information about your request"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include steps to reproduce for bugs, or detailed information
                about what you need help with.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>Screenshots (Optional)</FormLabel>
          <div
            {...getRootProps()}
            className={cn(
              "mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100",
              isDragActive && "border-blue-500 bg-blue-50",
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                {isDragActive ? (
                  "Drop the files here..."
                ) : (
                  <>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 5MB each (max 3 files)
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex items-center p-2 border rounded-md"
                >
                  <FileText className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            form.reset();
            setFiles([]);
          }
        }}
      >
        <DrawerTrigger asChild>
          {trigger || (
            <Button variant={"ghost"} size={"sm"} className="rounded-full">
              <HelpCircle className="h-4 w-4" />
            </Button>
          )}
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] flex flex-col">
          <DrawerHeader className="text-left">
            <DrawerTitle>Submit a Request</DrawerTitle>
            <DrawerDescription>
              Have a bug to report, a feature to suggest, or need help? Let us
              know!
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4">{content()}</div>
          <div className="p-4 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          setFiles([]);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="rounded-full">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] flex flex-col flex-1 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submit a Request</DialogTitle>
          <DialogDescription>
            Have a bug to report, a feature to suggest, or need help? Let us
            know!
          </DialogDescription>
        </DialogHeader>
        <div className="">{content()}</div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
