'use client';

import NextImage, { ImageProps } from 'next/image';

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
  width = 1200,
  height = 675,
  className = '',
  caption,
  ...props
}: CustomImageProps) {
  return (
    <figure className="my-6">
      <NextImage
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        className={className}
        {...props}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}