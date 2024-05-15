"use client";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { useFetchUnsplashImages } from "@/hooks/use-fetch-unsplash-images";

interface FormPickerProps {
  id: string;
}

export const FormPicker = ({ id }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const { images, isLoading } = useFetchUnsplashImages();
  const [selectedImageId, setSelectedImageId] = useState(null);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {images.map((image) => (
        <div
          key={image.id}
          className={cn(
            "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
            pending && "opacity-50 hover:opacity-50 cursor-auto"
          )}
          onClick={() => {
            if (pending) return;
            setSelectedImageId(image.id);
          }}
        >
          <input
            type="radio"
            id={id}
            name={id}
            className="hidden"
            checked={selectedImageId === image.id}
            disabled={pending}
            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
          />
          <Image
            src={image.urls.thumb}
            fill
            alt="Unsplash image"
            className="object-cover rounded-sm"
          />
          {selectedImageId === image.id && (
            <div className="absolute inset-y-0 w-full h-full bg-black/50 flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
          <Link
            href={image.links.html}
            target="_blank"
            className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
          >
            {image.user.name}
          </Link>
        </div>
      ))}
    </>
  );
};
