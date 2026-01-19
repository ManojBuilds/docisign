'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Maximize2 } from 'lucide-react';
import NextImage, { ImageProps } from 'next/image';
import { useState } from 'react';

interface CustomImageProps extends Omit<ImageProps, 'placeholder'> {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
  caption?: string;
}

export default function CustomImage({
  src,
  alt,
  width = 2400,
  height = 1350,
  className = '',
  caption,
  ...props
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <figure className="my-6 group/img-container">
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={cn(
              "relative overflow-hidden rounded-3xl cursor-zoom-in transition-all duration-300",
              className
            )}
          >
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 z-10">
                <Skeleton className="h-full w-full rounded-3xl" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900/0 opacity-0 transition-all duration-500 group-hover/img-container:bg-zinc-900/10 group-hover/img-container:opacity-100">
              <div className="transform translate-y-4 scale-90 transition-all duration-300 group-hover/img-container:translate-y-0 group-hover/img-container:scale-100">
                <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 shadow-xl backdrop-blur-sm">
                  <Maximize2 className="h-4 w-4" />
                  Click to expand
                </div>
              </div>
            </div>

            <NextImage
              src={src}
              alt={alt}
              width={Number(width)}
              height={Number(height)}
              className={cn(
                "w-full h-auto transition-all duration-700 ease-out group-hover/img-container:scale-[1.03]",
                isLoading ? "scale-105 blur-sm grayscale" : "scale-100 blur-0 grayscale-0"
              )}
              onLoad={() => setIsLoading(false)}
              {...props}
            />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[85vw]">
          <DialogTitle className="sr-only">{caption}</DialogTitle>
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/5 p-1 backdrop-blur-3xl">
            <NextImage
              src={src}
              alt={alt}
              width={Number(width)}
              height={Number(height)}
              className="h-auto w-full max-h-[85vh] object-cover shadow-2xl"
              priority
            />
            {caption && (
              <div className="mt-4 px-4 py-2 text-center text-sm text-white/70 backdrop-blur-sm">
                {caption}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {caption && (
        <figcaption className="mt-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1 text-[13px] font-medium text-zinc-500 ring-1 ring-zinc-900/5">
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            {caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}