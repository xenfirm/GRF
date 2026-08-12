import { useState } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import BirdForm from './BirdForm';
import LoadingState from '../components/LoadingState';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import { useBirds } from '../hooks/useBirds';
import type { Bird, BirdInput } from '../types';
import { createBird, deleteBird, updateBird } from '../services/birds';
import { birdDisplayPrice } from '../utils/format';

export default function AdminBirds() {
  const { birds, loading, error, refresh } = useBirds(false);
  const [editing, setEditing] = useState<Bird | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Bird | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  async function saveBird(input: BirdInput) {
    if (editing) {
      await updateBird(editing.id, input);
      setToast('Bird updated successfully.');
    } else {
      await createBird(input);
      setToast('Bird added successfully.');
    }
    setToastType('success');
    setEditing(null);
    setShowForm(false);
    await refresh();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteBird(deleteTarget);
      setToastType('success');
      setToast('Bird deleted successfully.');
      setDeleteTarget(null);
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to delete bird.');
    }
  }

  if (loading) return <LoadingState label="Loading birds..." />;

  return (
    <div>
      <Toast message={toast} type={toastType} onClose={() => setToast(null)} />
      <ConfirmModal open={Boolean(deleteTarget)} title="Delete bird" message={`Delete ${deleteTarget?.name_en || 'this bird'} and its storage image?`} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-darktext">Bird Management</h1>
          <p className="text-sm text-gray-500">Add, edit, reorder and manage rooster availability.</p>
        </div>
        <button type="button" onClick={() => { setEditing(null); setShowForm(true); }} className="btn-primary rounded-xl">
          <Plus size={18} />
          Add Bird
        </button>
      </div>
      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {showForm && <div className="mb-6"><BirdForm bird={editing} onCancel={() => setShowForm(false)} onSave={saveBird} /></div>}
      <div className="overflow-hidden rounded-xl bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-primary-50 text-left text-xs uppercase tracking-wide text-primary-800">
              <tr>
                <th className="px-4 py-3">Bird</th>
                <th className="px-4 py-3">Breed</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {birds.map((bird) => (
                <tr key={bird.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={bird.image_url || ''} alt={bird.name_en} className="h-12 w-12 rounded-lg bg-primary-50 object-cover" />
                      <div>
                        <div className="font-semibold text-darktext">{bird.name_en}</div>
                        <div className="text-xs text-gray-500">{bird.name_ta || bird.breed}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{bird.breed}<div className="text-xs text-gray-500">{bird.age}</div></td>
                  <td className="px-4 py-3">{birdDisplayPrice(bird)}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-semibold ${bird.is_available ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{bird.is_available ? bird.badge : 'Sold Out'}</span>{bird.is_featured && <span className="ml-2 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">Featured</span>}</td>
                  <td className="px-4 py-3">{bird.display_order}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => { setEditing(bird); setShowForm(true); }} className="rounded-lg border border-gray-200 p-2 text-primary hover:bg-primary-50"><Edit size={16} /></button>
                      <button type="button" onClick={() => setDeleteTarget(bird)} className="rounded-lg border border-gray-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {birds.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500">No birds yet. Add the first bird to publish it.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
