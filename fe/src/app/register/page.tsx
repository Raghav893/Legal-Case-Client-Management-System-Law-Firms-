'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/api/authService';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('LAWYER'); // Setting LAWYER as default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.register({ name, email, password, role });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', padding: '32px', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '28px', lineHeight: 1.2 }}>
        Legal Practice<br />Management
      </h1>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '18px', color: 'var(--text-secondary)' }}>
        Create an Account
      </h2>
      <form onSubmit={handleSubmit} className="flex-col gap-16">
        <div className="flex-col gap-8">
          <label style={{ fontSize: '12px', fontWeight: 600 }}>Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Alice Jenkins"
          />
        </div>
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
        <div className="flex-col gap-8">
          <label style={{ fontSize: '12px', fontWeight: 600 }}>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="ADMIN">ADMIN</option>
            <option value="LAWYER">LAWYER</option>
            <option value="PARALEGAL">PARALEGAL</option>
            <option value="RECEPTION">RECEPTION</option>
          </select>
        </div>
        
        {error && <div className="text-danger" style={{ fontSize: '12px' }}>{error}</div>}
        
        <button 
          type="submit" 
          className="primary-btn mt-16"
          disabled={loading}
          style={{ width: '100%', fontSize: '14px', padding: '12px' }}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px' }}>
          Already have an account? <Link href="/login" style={{ textDecoration: 'underline' }}>Sign In here</Link>
        </div>
      </form>
    </div>
  );
}
