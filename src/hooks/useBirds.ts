import { useCallback, useEffect, useState } from 'react';
import type { Bird } from '../types';
import { getBirds } from '../services/birds';

export function useBirds(onlyAvailable = false) {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBirds(await getBirds(onlyAvailable));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load birds.');
    } finally {
      setLoading(false);
    }
  }, [onlyAvailable]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { birds, loading, error, refresh };
}
