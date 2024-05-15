import { DEFAULT_IMAGES } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { useEffect, useState } from "react";

export const useFetchUnsplashImages = () => {
    const [images, setImages] = useState<Array<Record<string, any>>>(DEFAULT_IMAGES);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ["317099"],
                    count: 6,
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

    return { images, isLoading };
};