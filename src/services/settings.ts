import { DEFAULT_SITE_SETTINGS } from '../data/siteSettings';
import { isSupabaseConfigured, requireSupabase } from '../lib/supabase';
import type { SiteSetting, SiteSettingInput } from '../types';

export const fallbackSiteSettings = DEFAULT_SITE_SETTINGS;

export async function getSiteSettings() {
  if (!isSupabaseConfigured) return fallbackSiteSettings;

  const { data, error } = await requireSupabase()
    .from('site_settings')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    if (error.code === '42P01') return fallbackSiteSettings;
    throw error;
  }

  return (data && data.length > 0 ? data : fallbackSiteSettings) as SiteSetting[];
}

export async function upsertSiteSetting(input: SiteSettingInput) {
  const { data, error } = await requireSupabase()
    .from('site_settings')
    .upsert(input, { onConflict: 'setting_key' })
    .select()
    .single();

  if (error) throw error;
  return data as SiteSetting;
}
