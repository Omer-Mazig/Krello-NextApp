"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { DEFAULT_IMAGES } from "@/constants/images";
import Link from "next/link";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] =
    useState<Array<Record<string, any>>>(DEFAULT_IMAGES);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error("No response from Unsplash API");
        }
      } catch (error) {
        console.error(error);
        setImages(DEFAULT_IMAGES);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map(image => (
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
            <Image
              src={image.urls.thumb}
              fill
              alt="Unsplash image"
              className="object-cover rounded-sm"
            />
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
