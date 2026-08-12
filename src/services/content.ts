import { DEFAULT_WEBSITE_CONTENT_SECTIONS } from '../data/contentSections';
import { isSupabaseConfigured, requireSupabase } from '../lib/supabase';
import type { WebsiteContentSection, WebsiteContentSectionInput } from '../types';

export const fallbackWebsiteContentSections = DEFAULT_WEBSITE_CONTENT_SECTIONS;

export async function getWebsiteContentSections(onlyVisible = false) {
  if (!isSupabaseConfigured) return fallbackWebsiteContentSections;

  let query = requireSupabase()
    .from('website_content_sections')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (onlyVisible) query = query.eq('is_visible', true);

  const { data, error } = await query;
  if (error) {
    if (error.code === '42P01') return fallbackWebsiteContentSections;
    throw error;
  }

  return (data && data.length > 0 ? data : fallbackWebsiteContentSections) as WebsiteContentSection[];
}

export async function createWebsiteContentSection(input: WebsiteContentSectionInput) {
  const { data, error } = await requireSupabase()
    .from('website_content_sections')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as WebsiteContentSection;
}

export async function updateWebsiteContentSection(id: string, input: Partial<WebsiteContentSectionInput>) {
  const { data, error } = await requireSupabase()
    .from('website_content_sections')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as WebsiteContentSection;
}

export async function deleteWebsiteContentSection(id: string) {
  const { error } = await requireSupabase().from('website_content_sections').delete().eq('id', id);
  if (error) throw error;
}
