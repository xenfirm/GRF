import { FormEvent, useEffect, useState } from 'react';
import { Edit, FileText, Plus, Save, Trash2 } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import LoadingState from '../components/LoadingState';
import Toast from '../components/Toast';
import { isSupabaseConfigured } from '../lib/supabase';
import { createWebsiteContentSection, deleteWebsiteContentSection, updateWebsiteContentSection } from '../services/content';
import { useWebsiteContentSections } from '../hooks/useWebsiteContentSections';
import type { WebsiteContentSection, WebsiteContentSectionInput } from '../types';

const emptySection: WebsiteContentSectionInput = {
  section_key: '',
  nav_label: '',
  title: '',
  body: '',
  highlight: '',
  display_order: 99,
  show_in_nav: true,
  is_visible: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toInput(section: WebsiteContentSection): WebsiteContentSectionInput {
  return {
    section_key: section.section_key,
    nav_label: section.nav_label,
    title: section.title,
    body: section.body,
    highlight: section.highlight,
    display_order: section.display_order,
    show_in_nav: section.show_in_nav,
    is_visible: section.is_visible,
  };
}

export default function AdminContent() {
  const { sections, loading, error, refresh } = useWebsiteContentSections(false);
  const [editing, setEditing] = useState<WebsiteContentSection | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<WebsiteContentSectionInput>(emptySection);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WebsiteContentSection | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    setForm(editing ? toInput(editing) : emptySection);
  }, [editing]);

  function update<K extends keyof WebsiteContentSectionInput>(key: K, value: WebsiteContentSectionInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function startAdd() {
    setEditing(null);
    setForm({
      ...emptySection,
      display_order: sections.length + 1,
    });
    setShowForm(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setToastType('error');
      setToast('Supabase is not configured. Add Supabase environment variables before saving website content.');
      return;
    }

    const nextInput = {
      ...form,
      section_key: slugify(form.section_key || form.nav_label || form.title),
      nav_label: form.nav_label || form.title,
    };

    if (!nextInput.section_key || !nextInput.title.trim() || !nextInput.body.trim()) {
      setToastType('error');
      setToast('Section key, title and body are required.');
      return;
    }

    setSaving(true);
    try {
      if (editing && !editing.id.startsWith('default-')) {
        await updateWebsiteContentSection(editing.id, nextInput);
        setToast('Website content updated.');
      } else {
        await createWebsiteContentSection(nextInput);
        setToast('Website content added.');
      }
      setToastType('success');
      setEditing(null);
      setShowForm(false);
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to save website content.');
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    if (deleteTarget.id.startsWith('default-')) {
      setToastType('error');
      setToast('Default fallback sections cannot be deleted until they are saved in Supabase.');
      setDeleteTarget(null);
      return;
    }

    try {
      await deleteWebsiteContentSection(deleteTarget.id);
      setToastType('success');
      setToast('Website content deleted.');
      setDeleteTarget(null);
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to delete website content.');
    }
  }

  if (loading) return <LoadingState label="Loading website content..." />;

  return (
    <div>
      <Toast message={toast} type={toastType} onClose={() => setToast(null)} />
      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete website content"
        message={`Delete ${deleteTarget?.title || 'this section'}?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-darktext">Website Content</h1>
          <p className="text-sm text-gray-500">Add, edit, reorder and publish About page subtopics and navbar dropdown items.</p>
        </div>
        <button type="button" onClick={startAdd} className="btn-primary rounded-xl">
          <Plus size={18} />
          Add Section
        </button>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured, so this page is showing fallback content. Connect Supabase and run the updated setup SQL to save edits.
        </div>
      )}
      {error && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{editing ? 'Edit section' : 'Add section'}</h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm font-semibold text-gray-500 hover:text-primary">Close</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-gray-700">
              Navbar label
              <input className="input-field mt-2" value={form.nav_label} onChange={(event) => update('nav_label', event.target.value)} placeholder="Our Story" />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              Section key / URL anchor
              <input className="input-field mt-2" value={form.section_key} onChange={(event) => update('section_key', slugify(event.target.value))} placeholder="our-story" />
            </label>
            <label className="text-sm font-semibold text-gray-700 md:col-span-2">
              Section title
              <input className="input-field mt-2" value={form.title} onChange={(event) => update('title', event.target.value)} required />
            </label>
            <label className="text-sm font-semibold text-gray-700 md:col-span-2">
              Main content
              <textarea className="input-field mt-2 min-h-40" value={form.body} onChange={(event) => update('body', event.target.value)} required />
            </label>
            <label className="text-sm font-semibold text-gray-700 md:col-span-2">
              Highlight / quote
              <textarea className="input-field mt-2 min-h-24" value={form.highlight} onChange={(event) => update('highlight', event.target.value)} />
            </label>
            <label className="text-sm font-semibold text-gray-700">
              Display order
              <input className="input-field mt-2" type="number" value={form.display_order} onChange={(event) => update('display_order', Number(event.target.value))} />
            </label>
            <div className="flex flex-wrap items-end gap-5 text-sm font-semibold text-gray-700">
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_visible} onChange={(event) => update('is_visible', event.target.checked)} /> Visible on site</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.show_in_nav} onChange={(event) => update('show_in_nav', event.target.checked)} /> Show in navbar</label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" disabled={saving} className="btn-primary rounded-xl">
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Content'}
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4">
        {sections.map((section) => (
          <article key={section.id} className="rounded-xl bg-white p-5 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary">{section.display_order}</span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">#{section.section_key}</span>
                  {section.show_in_nav && <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Navbar</span>}
                  {!section.is_visible && <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">Hidden</span>}
                  {section.id.startsWith('default-') && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Fallback</span>}
                </div>
                <h2 className="font-display text-xl font-bold text-darktext">{section.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{section.body}</p>
                {section.highlight && <p className="mt-2 text-sm font-medium text-primary">{section.highlight}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => { setEditing(section); setShowForm(true); }} className="rounded-lg border border-gray-200 p-2 text-primary hover:bg-primary-50">
                  <Edit size={16} />
                </button>
                <button type="button" onClick={() => setDeleteTarget(section)} className="rounded-lg border border-gray-200 p-2 text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
        {sections.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-card">
            <FileText className="mx-auto mb-3 text-primary" />
            <p className="text-sm text-gray-500">No website content sections yet. Add the first section to publish it.</p>
          </div>
        )}
      </div>
    </div>
  );
}
