import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Save, Settings } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import Toast from '../components/Toast';
import { isSupabaseConfigured } from '../lib/supabase';
import { upsertSiteSetting } from '../services/settings';
import { useSiteSettings } from '../hooks/useSiteSettings';
import type { SiteSetting } from '../types';

export default function AdminSettings() {
  const { settings, loading, error, refresh } = useSiteSettings();
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    setValues(settings.reduce<Record<string, string>>((acc, setting) => {
      acc[setting.setting_key] = setting.setting_value;
      return acc;
    }, {}));
  }, [settings]);

  const grouped = useMemo(() => {
    return settings.reduce<Record<string, SiteSetting[]>>((acc, setting) => {
      if (!acc[setting.group_name]) acc[setting.group_name] = [];
      acc[setting.group_name].push(setting);
      return acc;
    }, {});
  }, [settings]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setToastType('error');
      setToast('Supabase is not configured. Add Supabase environment variables and run the updated setup SQL before saving settings.');
      return;
    }

    setSaving(true);
    try {
      for (const setting of settings) {
        await upsertSiteSetting({
          setting_key: setting.setting_key,
          setting_value: values[setting.setting_key] ?? '',
          group_name: setting.group_name,
          label: setting.label,
          field_type: setting.field_type,
          display_order: setting.display_order,
        });
      }
      setToastType('success');
      setToast('Site settings saved.');
      await refresh();
    } catch (err) {
      setToastType('error');
      setToast(err instanceof Error ? err.message : 'Unable to save site settings.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState label="Loading site settings..." />;

  return (
    <div>
      <Toast message={toast} type={toastType} onClose={() => setToast(null)} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-darktext">Site Settings</h1>
        <p className="text-sm text-gray-500">Edit SEO, sharing, Home, Footer, CTA and Contact page content.</p>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Supabase is not configured, so this page is showing fallback settings. Connect Supabase and run the updated setup SQL to save edits.
        </div>
      )}
      {error && <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(grouped).map(([groupName, groupSettings]) => (
          <section key={groupName} className="rounded-xl bg-white p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2">
              <Settings size={18} className="text-primary" />
              <h2 className="font-display text-xl font-bold text-darktext">{groupName}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {groupSettings.map((setting) => (
                <label key={setting.setting_key} className={`text-sm font-semibold text-gray-700 ${setting.field_type === 'textarea' ? 'md:col-span-2' : ''}`}>
                  {setting.label}
                  {setting.field_type === 'textarea' ? (
                    <textarea
                      className="input-field mt-2 min-h-28"
                      value={values[setting.setting_key] ?? ''}
                      onChange={(event) => setValues((current) => ({ ...current, [setting.setting_key]: event.target.value }))}
                    />
                  ) : (
                    <input
                      className="input-field mt-2"
                      type={setting.field_type === 'url' ? 'url' : 'text'}
                      value={values[setting.setting_key] ?? ''}
                      onChange={(event) => setValues((current) => ({ ...current, [setting.setting_key]: event.target.value }))}
                    />
                  )}
                </label>
              ))}
            </div>
          </section>
        ))}

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary rounded-xl">
            <Save size={16} />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
