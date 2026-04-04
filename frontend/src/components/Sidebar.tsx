"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Cases", href: "/cases", icon: Briefcase },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <div className="flex flex-col h-screen w-64 bg-slate-900 text-white border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
          L
        </div>
        <span className="font-bold text-xl tracking-tight">LexManage</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                isActive 
                  ? "bg-indigo-600/10 text-indigo-400" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-indigo-400" : "group-hover:text-white")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{user?.username}</p>
            <p className="text-xs text-slate-500 truncate">{user?.role?.replace('ROLE_', '')}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
