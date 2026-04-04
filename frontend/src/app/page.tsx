"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
}
