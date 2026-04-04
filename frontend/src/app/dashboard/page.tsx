"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  FileText, 
  Search,
  Plus
} from "lucide-react";
import api from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to fetch stats", err));
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
            Firm Overview
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Monitor firm performance and manage upcoming legal proceedings.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="font-semibold text-sm">Search</span>
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus className="w-4 h-4" />
            <span className="font-semibold text-sm">New Case</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard 
          title="Total Clients" 
          value={stats?.totalClients || 0} 
          icon={Users} 
          trend="+12%"
          color="bg-blue-500/10 text-blue-500 ring-blue-500/20" 
        />
        <StatsCard 
          title="Active Cases" 
          value={stats?.activeCases || 0} 
          icon={Briefcase} 
          trend="+5%"
          color="bg-indigo-500/10 text-indigo-500 ring-indigo-500/20" 
        />
        <StatsCard 
          title="Upcoming Hearings" 
          value={stats?.upcomingHearings || 0} 
          icon={Calendar} 
          trend="-2"
          color="bg-orange-500/10 text-orange-500 ring-orange-500/20" 
        />
        <StatsCard 
          title="Documents" 
          value="1.2k" 
          icon={FileText} 
          trend="+23"
          color="bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 overflow-hidden relative">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Recent Postings</h2>
              <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">View All</button>
           </div>
           <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-700/50 flex items-center justify-center text-slate-400">
                       <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Smith vs. Matrix Corp</p>
                      <p className="text-sm text-slate-500">Case No: #NY-2024-00{i}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      In Progress
                    </span>
                    <p className="text-xs text-slate-500 mt-1">Updated 2h ago</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8">
           <h2 className="text-xl font-bold text-white mb-8">Today's Schedule</h2>
           <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-indigo-500 before:rounded-full">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">09:00 AM</p>
                  <p className="font-bold text-white">Bail Hearing - John Doe</p>
                  <p className="text-sm text-slate-500">Courtroom 4B, District Court</p>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all">
              Go to Calendar
           </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
