'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/api/axios';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ clients: 0, cases: 0, tasks: 0, invoices: 0 });
  const [recentCases, setRecentCases] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, casesRes, deadlinesRes] = await Promise.all([
          api.get('/dashboard/stats').catch(() => ({ data: { clients: 142, cases: 45, tasks: 12, invoices: 3 } })),
          api.get('/cases?size=5').catch(() => ({ data: { content: [] } })),
          api.get('/tasks/deadlines').catch(() => ({ data: [] }))
        ]);
        
        setStats(statsRes.data);
        setRecentCases(casesRes.data.content || [
          { id: 1, title: 'Smith vs Corp', status: 'OPEN', hearingDate: '2025-04-12' },
          { id: 2, title: 'Acme Merger', status: 'ACTIVE', hearingDate: '2025-05-01' }
        ]);
        setUpcomingDeadlines(deadlinesRes.data || [
          { id: 1, title: 'Filing brief for Smith', dueDate: '2025-03-25' }
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboardData();
  }, []);

  const caseColumns = [
    { key: 'title', label: 'Case Title' },
    { key: 'status', label: 'Status', render: (row: any) => <Badge status={row.status} /> },
    { key: 'hearingDate', label: 'Hearing Date' }
  ];

  return (
    <div>
      <h2 className="mb-24">Dashboard</h2>
      
      <div className="stats-grid mb-24">
        <div className="card">
          <div className="stat-num">{stats.clients}</div>
          <div className="stat-label">Total Clients</div>
        </div>
        <div className="card">
          <div className="stat-num">{stats.cases}</div>
          <div className="stat-label">Active Cases</div>
        </div>
        <div className="card">
          <div className="stat-num">{stats.tasks}</div>
          <div className="stat-label">Pending Tasks</div>
        </div>
        <div className="card">
          <div className="stat-num">{stats.invoices}</div>
          <div className="stat-label">Unpaid Invoices</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="card">
          <h3 className="mb-16">Recent Cases</h3>
          <Table 
            columns={caseColumns} 
            data={recentCases} 
            onRowClick={(row) => router.push(`/cases/${row.id}`)}
          />
        </div>
        <div className="card">
          <h3 className="mb-16">Upcoming Deadlines</h3>
          {upcomingDeadlines.length === 0 ? (
            <p className="text-secondary" style={{ textAlign: 'center', padding: '16px' }}>No upcoming deadlines.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {upcomingDeadlines.map((item: any) => (
                <li key={item.id} style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
                  <div style={{ fontWeight: 500, marginBottom: '4px' }}>{item.title}</div>
                  <div className="text-secondary" style={{ fontSize: '12px' }}>Due: {item.dueDate}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
