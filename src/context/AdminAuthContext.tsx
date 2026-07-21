import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AdminAuthContextValue {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAdmin: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function checkAdmin(nextSession: Session | null) {
    setError(null);
    setIsAdmin(false);

    if (!nextSession?.user || !supabase) return;

    const { data, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('user_id', nextSession.user.id)
      .maybeSingle();

    if (adminError) throw adminError;
    setIsAdmin(Boolean(data));
  }

  async function refreshAdmin() {
    try {
      await checkAdmin(session);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify admin access.');
    }
  }

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!isSupabaseConfigured || !supabase) {
        if (mounted) {
          setLoading(false);
          setError('Supabase environment variables are not configured.');
        }
        return;
      }

      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!mounted) return;
        setSession(data.session);
        await checkAdmin(data.session);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Unable to load admin session.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    const subscription = supabase?.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setLoading(true);
      try {
        await checkAdmin(nextSession);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to verify admin access.');
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.data.subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string) {
    if (!supabase) throw new Error('Supabase is not configured.');
    setError(null);
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) throw signInError;
    setSession(data.session);
    await checkAdmin(data.session);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }

  const value = useMemo(
    () => ({
      session,
      user: session?.user || null,
      isAdmin,
      loading,
      error,
      signIn,
      signOut,
      refreshAdmin,
    }),
    [session, isAdmin, loading, error],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return context;
}
