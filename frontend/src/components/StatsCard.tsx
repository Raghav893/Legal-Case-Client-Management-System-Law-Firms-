"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color: string;
}

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
          {trend && (
            <p className="text-xs text-emerald-500 mt-2 font-medium">
              {trend} <span className="text-slate-500 ml-1">since last month</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl ring-1 ring-inset group-hover:scale-110 transition-transform", color)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
}
