import { FormEvent, useEffect, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import type { Bird, BirdBadge, BirdInput } from '../types';
import { uploadImage, deleteImage } from '../services/media';

const emptyBird: BirdInput = {
  name_en: '',
  name_ta: '',
  breed: '',
  age: '',
  price: null,
  price_text: 'Affordable Prices',
  description: '',
  is_available: true,
  badge: 'Available',
  image_url: null,
  image_path: null,
  is_featured: false,
  display_order: 0,
};

interface BirdFormProps {
  bird: Bird | null;
  onCancel: () => void;
  onSave: (input: BirdInput) => Promise<void>;
}

export default function BirdForm({ bird, onCancel, onSave }: BirdFormProps) {
  const [form, setForm] = useState<BirdInput>(emptyBird);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(bird ? {
      name_en: bird.name_en,
      name_ta: bird.name_ta,
      breed: bird.breed,
      age: bird.age,
      price: bird.price,
      price_text: bird.price_text,
      description: bird.description,
      is_available: bird.is_available,
      badge: bird.badge,
      image_url: bird.image_url,
      image_path: bird.image_path,
      is_featured: bird.is_featured,
      display_order: bird.display_order,
    } : emptyBird);
    setPreview(null);
    setFile(null);
  }, [bird]);

  function update<K extends keyof BirdInput>(key: K, value: BirdInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      let next = { ...form };
      if (!next.image_url && next.image_path) {
        await deleteImage(next.image_path);
        next = { ...next, image_path: null };
      }
      if (file) {
        const uploaded = await uploadImage(file, 'birds');
        if (next.image_path) await deleteImage(next.image_path);
        next = { ...next, image_url: uploaded.publicUrl, image_path: uploaded.path };
      }
      if (!next.is_available) next.badge = 'Sold Out';
      await onSave(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save bird.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{bird ? 'Edit bird' : 'Add bird'}</h2>
        <button type="button" onClick={onCancel} className="text-sm font-semibold text-gray-500 hover:text-primary">Close</button>
      </div>
      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-gray-700">English name<input className="input-field mt-2" value={form.name_en} onChange={(event) => update('name_en', event.target.value)} required /></label>
        <label className="text-sm font-semibold text-gray-700">Tamil name<input className="input-field mt-2" value={form.name_ta} onChange={(event) => update('name_ta', event.target.value)} required /></label>
        <label className="text-sm font-semibold text-gray-700">Breed<input className="input-field mt-2" value={form.breed} onChange={(event) => update('breed', event.target.value)} required /></label>
        <label className="text-sm font-semibold text-gray-700">Age<input className="input-field mt-2" value={form.age} onChange={(event) => update('age', event.target.value)} required /></label>
        <label className="text-sm font-semibold text-gray-700">Price<input className="input-field mt-2" type="number" value={form.price ?? ''} onChange={(event) => update('price', event.target.value ? Number(event.target.value) : null)} /></label>
        <label className="text-sm font-semibold text-gray-700">Price display text<input className="input-field mt-2" value={form.price_text} onChange={(event) => update('price_text', event.target.value)} /></label>
        <label className="text-sm font-semibold text-gray-700">Badge
          <select className="input-field mt-2" value={form.badge} onChange={(event) => update('badge', event.target.value as BirdBadge)}>
            {['Available', 'Popular', 'Premium', 'Sold Out'].map((badge) => <option key={badge}>{badge}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-gray-700">Display order<input className="input-field mt-2" type="number" value={form.display_order} onChange={(event) => update('display_order', Number(event.target.value))} /></label>
        <label className="md:col-span-2 text-sm font-semibold text-gray-700">Description<textarea className="input-field mt-2 min-h-24" value={form.description} onChange={(event) => update('description', event.target.value)} required /></label>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
        <div className="aspect-square overflow-hidden rounded-xl bg-primary-50">
          {(preview || form.image_url) && <img src={preview || form.image_url || ''} alt="Bird preview" className="h-full w-full object-cover" />}
        </div>
        <div className="space-y-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold hover:border-primary">
            <Upload size={16} />
            Upload or replace image
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={(event) => {
                const selected = event.target.files?.[0] || null;
                setFile(selected);
                setPreview(selected ? URL.createObjectURL(selected) : null);
              }}
            />
          </label>
          {form.image_url && (
            <button type="button" onClick={() => setForm((current) => ({ ...current, image_url: null }))} className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
              <Trash2 size={16} />
              Delete image from bird
            </button>
          )}
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-gray-700">
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_available} onChange={(event) => update('is_available', event.target.checked)} /> Available</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_featured} onChange={(event) => update('is_featured', event.target.checked)} /> Featured</label>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold">Cancel</button>
        <button type="submit" disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          {saving ? 'Saving...' : 'Save bird'}
        </button>
      </div>
    </form>
  );
}
