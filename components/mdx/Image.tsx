'use client';

import { cn } from '@/lib/utils';
import { Loader2, Maximize2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import NextImage, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={cn("my-10 group/img-container aspect-video", className)}>
      {/* Minimal Product Container */}
      <motion.div
        layoutId={`container-${src}`}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 ring-1 ring-white/80 shadow-sm cursor-zoom-in p-4 md:p-10"
        onClick={() => setIsOpen(true)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        )}

        <NextImage
          src={src}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          className={cn(
            "w-full h-auto rounded-2xl transition-transform duration-1000 group-hover/img-container:scale-[1.01]",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setIsLoading(false)}
          {...props}
        />

        {/* Hover Action Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-slate-900/5 flex items-center justify-center pointer-events-none"
        >
          <div className="p-3 rounded-full bg-white/95 shadow-xl text-slate-900 border border-white backdrop-blur-sm transform transition-transform duration-300 group-hover/img-container:scale-110">
            <Maximize2 className="w-5 h-5" />
          </div>
        </motion.div>
      </motion.div>

      {/* Minimal Caption */}
      {(caption || alt) && (
        <p className="mt-3 text-sm text-slate-500 text-center italic">
          {caption || alt}
        </p>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl cursor-zoom-out"
              onClick={() => setIsOpen(false)}
            />

            {/* Content Container with Shared Layout Transition */}
            <motion.div
              layoutId={`container-${src}`}
              className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              {/* Close Button UI */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute top-0 right-0 md:-top-12 md:-right-12 p-3 text-white/50 hover:text-white transition-colors pointer-events-auto"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-8 h-8" />
              </motion.button>

              {/* Image with Shadow */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative overflow-hidden rounded-xl shadow-2xl pointer-events-auto bg-slate-900"
              >
                <NextImage
                  src={src}
                  alt={alt}
                  width={2560}
                  height={1440}
                  className="max-h-[85vh] w-auto h-auto object-contain"
                  priority
                />
              </motion.div>

              {/* Lightbox Caption Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 }}
                className="mt-6 md:absolute md:-bottom-12 py-2 px-4 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
              >
                <p className="text-white text-sm font-medium tracking-wide">
                  {caption || alt}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}