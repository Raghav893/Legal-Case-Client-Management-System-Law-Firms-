'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/api/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      const { accessToken, refreshToken } = res.data || res;
      login(accessToken, refreshToken);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', padding: '32px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '28px', lineHeight: 1.2 }}>
        Legal Practice<br />Management
      </h1>
      <form onSubmit={handleSubmit} className="flex-col gap-16">
        <div className="flex-col gap-8">
          <label style={{ fontSize: '12px', fontWeight: 600 }}>Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="name@firm.com"
          />
        </div>
        <div className="flex-col gap-8">
          <label style={{ fontSize: '12px', fontWeight: 600 }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••••"
          />
        </div>
        
        {error && <div className="text-danger" style={{ fontSize: '12px' }}>{error}</div>}
        
        <button 
          type="submit" 
          className="primary-btn mt-16"
          disabled={loading}
          style={{ width: '100%', fontSize: '14px', padding: '12px' }}
        >
          {loading ? 'Sign In...' : 'Sign In'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px' }}>
          Don't have an account? <a href="/register" style={{ textDecoration: 'underline' }}>Register here</a>
        </div>
      </form>
    </div>
  );
}
