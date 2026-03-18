'use client';

import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-title">
        <h3 style={{ margin: 0, fontSize: '18px' }}>Dashboard Overview</h3>
      </div>
      <div className="flex items-center gap-16">
        <span className="text-secondary">{user?.email || 'Guest User (Unprotected)'}</span>
        <button onClick={logout} style={{ color: 'var(--danger)' }}>Log out</button>
      </div>
    </header>
  );
}
