'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <ProtectedRoute>
      <div className={isAuthPage ? "auth-layout" : "app-container"}>
        {!isAuthPage && <Sidebar />}
        <main className={isAuthPage ? "" : "main-content"}>
          {!isAuthPage && <Header />}
          <div className={isAuthPage ? "" : "content-area"}>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
