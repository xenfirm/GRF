import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SITE_SETTING_MAP } from '../data/siteSettings';
import { getSiteSettings } from '../services/settings';
import type { SiteSetting } from '../types';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setSettings(await getSiteSettings());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load site settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const values = useMemo(() => {
    const next = { ...DEFAULT_SITE_SETTING_MAP };
    settings.forEach((setting) => {
      next[setting.setting_key] = setting.setting_value;
    });
    return next;
  }, [settings]);

  const get = useCallback((key: string, fallback = '') => values[key] ?? fallback, [values]);

  return { settings, values, get, loading, error, refresh };
}
