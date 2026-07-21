import { FormEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import LoadingState from '../components/LoadingState';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { session, isAdmin, loading, signIn, error } = useAdminAuth();
  const location = useLocation();
  const unauthorized = new URLSearchParams(location.search).has('unauthorized');

  if (loading) return <LoadingState label="Loading login..." />;
  if (session && isAdmin) return <Navigate to="/admin" replace />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      await signIn(email, password);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-10 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-card">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary">
            <Lock size={24} />
          </div>
          <h1 className="text-2xl font-bold text-darktext">GRF Admin Login</h1>
          <p className="mt-2 text-sm text-gray-500">Use your approved Supabase admin account.</p>
        </div>
        {(formError || error || unauthorized) && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError || error || 'This account is not listed in admin_users.'}
          </div>
        )}
        <label className="mb-4 block text-sm font-semibold text-gray-700">
          Email
          <input className="input-field mt-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="mb-6 block text-sm font-semibold text-gray-700">
          Password
          <input className="input-field mt-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center rounded-xl disabled:opacity-60">
          {submitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
