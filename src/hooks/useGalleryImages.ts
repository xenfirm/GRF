import { useCallback, useEffect, useState } from 'react';
import type { GalleryImage } from '../types';
import { getGalleryImages } from '../services/gallery';

export function useGalleryImages(onlyVisible = false) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setImages(await getGalleryImages(onlyVisible));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load gallery images.');
    } finally {
      setLoading(false);
    }
  }, [onlyVisible]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { images, loading, error, refresh };
}
