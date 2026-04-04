"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signin", { username, password });
      login(res.data.token, res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(63,66,243,0.1),_transparent_50%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-8 bg-slate-900 shadow-2xl rounded-3xl border border-slate-800 backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 font-medium">Log in to your legal workspace</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-600"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-sm font-semibold pl-1 underline decoration-red-400/30">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600/20"
          >
            Log In
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 font-medium">
          Need help? <span className="text-indigo-400 cursor-pointer hover:underline">Contact firm administrator</span>
        </p>
      </motion.div>
    </div>
  );
}
