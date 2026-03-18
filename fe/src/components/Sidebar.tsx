'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { label: 'Dashboard', path: '/', roles: ['ADMIN', 'LAWYER', 'PARALEGAL', 'RECEPTION'] },
  { label: 'Clients', path: '/clients', roles: ['ADMIN', 'LAWYER', 'RECEPTION'] },
  { label: 'Cases', path: '/cases', roles: ['ADMIN', 'LAWYER', 'PARALEGAL'] },
  { label: 'Documents', path: '/documents', roles: ['ADMIN', 'LAWYER', 'PARALEGAL'] },
  { label: 'Tasks', path: '/tasks', roles: ['ADMIN', 'LAWYER', 'PARALEGAL'] },
  { label: 'Invoices', path: '/invoices', roles: ['ADMIN', 'LAWYER'] },
];

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '20px', lineHeight: 1.2 }}>Legal<br/>Practice</h2>
      </div>
      <nav style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems
          // .filter(item => item.roles.includes(user.role)) // Temporarily disabled role protection
          .map(item => (
            <Link
              key={item.path}
              href={item.path}
              style={{
                padding: '8px 24px',
                display: 'block',
                fontWeight: 500,
                color: pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)) 
                  ? 'var(--accent)' 
                  : 'var(--text-secondary)',
                borderRight: (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)))
                  ? '3px solid var(--accent)'
                  : '3px solid transparent',
                backgroundColor: (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)))
                  ? 'var(--accent-light)'
                  : 'transparent',
              }}
            >
              {item.label}
            </Link>
          ))}
      </nav>
    </aside>
  );
}
