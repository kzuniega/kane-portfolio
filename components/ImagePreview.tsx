"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const previewQuery = "(max-width: 1023px), (hover: none) and (pointer: coarse)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(previewQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(previewQuery).matches;
}

function getServerSnapshot() {
  return false;
}

type ImagePreviewProps = {
  src: string;
  alt: string;
  title: string;
  href?: string;
  aspectRatio?: number;
  children: ReactNode;
};

export function ImagePreview({ src, alt, title, href, aspectRatio = 16 / 9, children }: ImagePreviewProps) {
  const useModal = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [imageAspectRatio, setImageAspectRatio] = useState(aspectRatio);

  if (!useModal) {
    return href ? (
      <a className="project-preview-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} (opens in a new tab)`}>
        {children}
      </a>
    ) : children;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="image-preview-trigger" aria-label={`Enlarge image: ${title}`}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">Expanded image preview.</DialogDescription>
        </DialogHeader>
        <div className="image-preview-frame" style={{ aspectRatio: imageAspectRatio }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1023px) 95vw, 1100px"
            className="image-preview-full"
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } = event.currentTarget;
              if (naturalWidth && naturalHeight) setImageAspectRatio(naturalWidth / naturalHeight);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
