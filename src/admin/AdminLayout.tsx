import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Bird, Images, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3 },
  { to: '/admin/birds', label: 'Bird Management', icon: Bird },
  { to: '/admin/gallery', label: 'Gallery Management', icon: Images },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { signOut, user } = useAdminAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate('/admin/login', { replace: true });
  }

  const sidebar = (
    <aside className="flex h-full w-72 flex-col bg-primary-900 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div>
          <div className="text-xl font-bold">GRF Admin</div>
          <div className="text-xs text-primary-100">{user?.email}</div>
        </div>
        <button type="button" className="md:hidden" onClick={() => setOpen(false)}>
          <X size={22} />
        </button>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-white text-primary-900' : 'text-primary-50 hover:bg-white/10'}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-primary-50 hover:bg-white/10">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="md:hidden flex items-center justify-between bg-primary-900 px-4 py-3 text-white">
        <span className="font-bold">GRF Admin</span>
        <button type="button" onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>
      <div className="flex min-h-screen">
        <div className="hidden md:block md:sticky md:top-0 md:h-screen">{sidebar}</div>
        {open && <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}
        {open && <div className="fixed inset-y-0 left-0 z-[60] md:hidden">{sidebar}</div>}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
