import { useCallback, useEffect, useState } from 'react';
import type { WebsiteContentSection } from '../types';
import { getWebsiteContentSections } from '../services/content';

export function useWebsiteContentSections(onlyVisible = false) {
  const [sections, setSections] = useState<WebsiteContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setSections(await getWebsiteContentSections(onlyVisible));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load website content.');
    } finally {
      setLoading(false);
    }
  }, [onlyVisible]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { sections, loading, error, refresh };
}
