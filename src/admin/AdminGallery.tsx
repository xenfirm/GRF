import { ChangeEvent, FormEvent, useState } from 'react';
import { Edit, Eye, EyeOff, Plus, Trash2, Upload } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import LoadingState from '../components/LoadingState';
import Toast from '../components/Toast';
import { useGalleryImages } from '../hooks/useGalleryImages';
import { createGalleryImage, deleteGalleryImage, updateGalleryImage } from '../services/gallery';
import { uploadImage } from '../services/media';
import type { GalleryCategory, GalleryImage } from '../types';

const categories: GalleryCategory[] = ['Roosters', 'Farm', 'Chicks', 'Farm Life', 'Facilities'];

export default function AdminGallery() {
  const { images, loading, error, refresh } = useGalleryImages(false);
  const [categoryFilter, setCategoryFilter] = useState<'All' | GalleryCategory>('All');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<GalleryCategory>('Roosters');
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const filtered = categoryFilter === 'All' ? images : images.filter((image) => image.category === categoryFilter);

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files || []));
  }

  async function handleUpload(event: FormEvent) {
    event.preventDefault();
    if (files.length === 0) return;
    setUploading(true);
    try {
      for (const [index, file] of files.entries()) {
        const uploaded = await uploadImage(file, 'gallery');
        const title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ');
        await createGalleryImage({
          image_url: uploaded.publicUrl,
          image_path: uploaded.path,
          title,
          alt_text: title,
          category: uploadCategory,
          is_visible: true,
          display_order: images.length + index + 1,
        });
      }
      setFiles([]);
      setToastType('success');
      setToast('Gallery image upload complete.');
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to upload images.');
    } finally {
      setUploading(false);
    }
  }

  async function saveEdit(event: FormEvent) {
    event.preventDefault();
    if (!editing) return;
    try {
      await updateGalleryImage(editing.id, {
        title: editing.title,
        alt_text: editing.alt_text,
        category: editing.category,
        is_visible: editing.is_visible,
        display_order: editing.display_order,
        image_url: editing.image_url,
        image_path: editing.image_path,
      });
      setEditing(null);
      setToastType('success');
      setToast('Gallery image updated.');
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to update image.');
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteGalleryImage(deleteTarget);
      setDeleteTarget(null);
      setToastType('success');
      setToast('Gallery image deleted.');
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to delete image.');
    }
  }

  if (loading) return <LoadingState label="Loading gallery..." />;

  return (
    <div>
      <Toast message={toast} type={toastType} onClose={() => setToast(null)} />
      <ConfirmModal open={Boolean(deleteTarget)} title="Delete gallery image" message={`Delete ${deleteTarget?.title || 'this image'} and its storage file?`} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-darktext">Gallery Management</h1>
        <p className="text-sm text-gray-500">Upload, categorize, hide and reorder public gallery photos.</p>
      </div>
      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={handleUpload} className="mb-6 rounded-xl bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center gap-2 font-bold"><Plus size={18} /> Upload images</div>
        <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
          <label className="text-sm font-semibold text-gray-700">
            JPG, PNG or WebP images
            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-primary/30 bg-primary-50 px-4 py-6 text-sm font-semibold text-primary">
              <Upload size={18} />
              Choose one or more images
              <input type="file" multiple accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleFiles} className="hidden" />
            </label>
          </label>
          <label className="text-sm font-semibold text-gray-700">Category
            <select className="input-field mt-2" value={uploadCategory} onChange={(event) => setUploadCategory(event.target.value as GalleryCategory)}>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <button type="submit" disabled={uploading || files.length === 0} className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-8">
            {files.map((file) => (
              <img key={`${file.name}-${file.size}`} src={URL.createObjectURL(file)} alt={file.name} className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        )}
      </form>
      {editing && (
        <form onSubmit={saveEdit} className="mb-6 rounded-xl bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Edit gallery image</h2>
            <button type="button" onClick={() => setEditing(null)} className="text-sm font-semibold text-gray-500">Close</button>
          </div>
          <div className="grid gap-4 md:grid-cols-[160px_1fr]">
            <img src={editing.image_url} alt={editing.alt_text} className="aspect-square rounded-xl object-cover" />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-semibold text-gray-700">Title<input className="input-field mt-2" value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} /></label>
              <label className="text-sm font-semibold text-gray-700">Alt text<input className="input-field mt-2" value={editing.alt_text} onChange={(event) => setEditing({ ...editing, alt_text: event.target.value })} /></label>
              <label className="text-sm font-semibold text-gray-700">Category<select className="input-field mt-2" value={editing.category} onChange={(event) => setEditing({ ...editing, category: event.target.value as GalleryCategory })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className="text-sm font-semibold text-gray-700">Display order<input className="input-field mt-2" type="number" value={editing.display_order} onChange={(event) => setEditing({ ...editing, display_order: Number(event.target.value) })} /></label>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700"><input type="checkbox" checked={editing.is_visible} onChange={(event) => setEditing({ ...editing, is_visible: event.target.checked })} /> Visible on public gallery</label>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold">Cancel</button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Save image</button>
          </div>
        </form>
      )}
      <div className="mb-4 flex flex-wrap gap-2">
        {(['All', ...categories] as const).map((category) => (
          <button key={category} onClick={() => setCategoryFilter(category)} className={`filter-btn ${categoryFilter === category ? 'active' : ''}`}>{category}</button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-xl bg-white shadow-card">
            <img src={image.image_url} alt={image.alt_text} className="aspect-square w-full object-cover" />
            <div className="p-4">
              <div className="mb-1 font-semibold text-darktext">{image.title}</div>
              <div className="mb-3 text-xs text-gray-500">{image.category} · Order {image.display_order}</div>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${image.is_visible ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {image.is_visible ? <Eye size={13} /> : <EyeOff size={13} />}
                  {image.is_visible ? 'Visible' : 'Hidden'}
                </span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditing(image)} className="rounded-lg border border-gray-200 p-2 text-primary hover:bg-primary-50"><Edit size={16} /></button>
                  <button type="button" onClick={() => setDeleteTarget(image)} className="rounded-lg border border-gray-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
        {filtered.length === 0 && <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-card sm:col-span-2 lg:col-span-3">No gallery images in this category.</div>}
      </div>
    </div>
  );
}
