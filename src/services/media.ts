import { requireSupabase } from '../lib/supabase';

const MAX_IMAGE_SIZE = 12 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const OUTPUT_IMAGE_TYPE = 'image/webp';
const OUTPUT_IMAGE_QUALITY = 0.82;

export function validateImage(file: File) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error('Please upload JPG, JPEG, PNG or WebP images only.');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Image size must be 5 MB or less.');
  }
}

export function uniqueImagePath(folder: 'birds' | 'gallery', file: File) {
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);

  return `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName || 'image'}.webp`;
}

export async function resizeImage(file: File, maxWidth = 1400) {
  if (!file.type.startsWith('image/')) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const context = canvas.getContext('2d');
  if (!context) return file;

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, OUTPUT_IMAGE_TYPE, OUTPUT_IMAGE_QUALITY);
  });

  if (!blob) return file;
  const outputName = file.name.replace(/\.[^/.]+$/, '.webp');
  return new File([blob], outputName, { type: OUTPUT_IMAGE_TYPE });
}

export async function uploadImage(file: File, folder: 'birds' | 'gallery') {
  validateImage(file);
  const prepared = await resizeImage(file);
  const path = uniqueImagePath(folder, prepared);
  const supabase = requireSupabase();

  const { error } = await supabase.storage.from('grf-media').upload(path, prepared, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from('grf-media').getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export async function deleteImage(path: string | null | undefined) {
  if (!path) return;
  const supabase = requireSupabase();
  const { error } = await supabase.storage.from('grf-media').remove([path]);
  if (error) throw error;
}
