import { FALLBACK_GALLERY_SEED } from '../data/fallbackData';
import { isSupabaseConfigured, requireSupabase } from '../lib/supabase';
import type { GalleryImage, GalleryImageInput } from '../types';
import { deleteImage } from './media';

export const fallbackGalleryImages: GalleryImage[] = FALLBACK_GALLERY_SEED.map((image, index) => ({
  id: String(image.id),
  image_url: image.src,
  image_path: '',
  title: image.alt,
  alt_text: image.alt,
  category: image.category as GalleryImage['category'],
  is_visible: true,
  display_order: index + 1,
}));

export async function getGalleryImages(onlyVisible = false) {
  if (!isSupabaseConfigured) return fallbackGalleryImages;

  let query = requireSupabase()
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (onlyVisible) query = query.eq('is_visible', true);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as GalleryImage[];
}

export async function createGalleryImage(input: GalleryImageInput) {
  const { data, error } = await requireSupabase()
    .from('gallery_images')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as GalleryImage;
}

export async function updateGalleryImage(id: string, input: Partial<GalleryImageInput>) {
  const { data, error } = await requireSupabase()
    .from('gallery_images')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as GalleryImage;
}

export async function deleteGalleryImage(image: GalleryImage) {
  const { error } = await requireSupabase().from('gallery_images').delete().eq('id', image.id);
  if (error) throw error;
  await deleteImage(image.image_path);
}
