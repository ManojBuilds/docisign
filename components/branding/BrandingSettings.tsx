"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { Image as ImageIcon, Loader2, Palette, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function BrandingSettings({ triggerClassName }: { triggerClassName?: string }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [brandName, setBrandName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const branding = useQuery(
    api.branding.getBranding,
    user ? { clerkId: user.id } : "skip"
  );

  const updateBranding = useMutation(api.branding.updateBranding);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  // Sync brand name from query when it loads
  useEffect(() => {
    if (branding?.brandName) {
      setBrandName(branding.brandName);
    }
  }, [branding?.brandName]);

  const handleUpdateBrandName = async () => {
    if (!user) return;
    try {
      await updateBranding({
        clerkId: user.id,
        brandName,
        brandLogoStorageId: branding?.brandLogoStorageId,
      });
      toast.success("Brand name updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update brand name");
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be less than 2MB");
      return;
    }

    setIsUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();

      await updateBranding({
        clerkId: user.id,
        brandName: brandName || branding?.brandName,
        brandLogoStorageId: storageId,
      });

      toast.success("Logo updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  const removeLogo = async () => {
    if (!user) return;
    try {
      await updateBranding({
        clerkId: user.id,
        brandName: brandName || branding?.brandName,
        brandLogoStorageId: undefined,
      });
      toast.success("Logo removed");
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove logo");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("h-10 border-muted/50 gap-2", triggerClassName)}>
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Branding</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personal Branding</DialogTitle>
          <DialogDescription>
            Customize how your clients see your documents. This appearance will
            be used on the signing page and in emails.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="brandName">Business Name</Label>
            <div className="flex gap-2">
              <Input
                id="brandName"
                placeholder="e.g. Acme Design Studio"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
              <Button onClick={handleUpdateBrandName} variant="secondary">
                Save
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              This name will replace "BoopSign" in emails sent to your clients.
            </p>
          </div>

          <div className="grid gap-2">
            <Label>Business Logo</Label>
            <div className="flex items-center gap-4">
              <div
                className="relative flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-muted bg-muted/30 overflow-hidden group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {branding?.logoUrl ? (
                  <>
                    <img
                      src={branding.logoUrl}
                      alt="Brand Logo"
                      className="object-contain p-2"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                  </>
                ) : isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {branding?.logoUrl ? "Change Logo" : "Upload Logo"}
                </Button>
                {branding?.logoUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={removeLogo}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Recommended: PNG or SVG with transparent background. Max 2MB.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
          <h4 className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
            Preview
          </h4>
          <div className="flex items-center gap-2 mt-3">
            <div className="size-6 bg-white rounded flex items-center justify-center border border-muted shadow-sm overflow-hidden">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt="logo" className="size-4 object-contain" />
              ) : (
                <div className="size-3 bg-primary rounded-full" />
              )}
            </div>
            <span className="text-sm font-bold truncate">
              {brandName || branding?.brandName || "BoopSign"}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 italic">
            "Your signature is requested by {brandName || branding?.brandName || "BoopSign"}"
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
