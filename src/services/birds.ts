import { isSupabaseConfigured, requireSupabase } from '../lib/supabase';
import type { Bird, BirdInput } from '../types';
import { FALLBACK_BIRD_SEED } from '../data/fallbackData';
import { deleteImage } from './media';

export const fallbackBirds: Bird[] = FALLBACK_BIRD_SEED.map((bird, index) => ({
  id: String(bird.id),
  name_en: bird.name,
  name_ta: bird.nameTa,
  breed: bird.breed,
  age: bird.age,
  price: bird.priceNum,
  price_text: bird.price,
  description: bird.description,
  is_available: bird.badge !== 'Sold Out',
  badge: bird.badge === 'Premium' || bird.badge === 'Popular' ? bird.badge : 'Available',
  image_url: bird.image,
  image_path: null,
  is_featured: index < 4,
  display_order: index + 1,
}));

export async function getBirds(onlyAvailable = false) {
  if (!isSupabaseConfigured) return fallbackBirds;

  let query = requireSupabase()
    .from('birds')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (onlyAvailable) query = query.eq('is_available', true);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Bird[];
}

export async function createBird(input: BirdInput) {
  const { data, error } = await requireSupabase()
    .from('birds')
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data as Bird;
}

export async function updateBird(id: string, input: Partial<BirdInput>) {
  const { data, error } = await requireSupabase()
    .from('birds')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Bird;
}

export async function deleteBird(bird: Bird) {
  const { error } = await requireSupabase().from('birds').delete().eq('id', bird.id);
  if (error) throw error;
  await deleteImage(bird.image_path);
}
