'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { caseService } from '@/api/caseService';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';

export default function CaseDetailPage() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await caseService.getById(id as string);
        setCaseData(res);
      } catch (err) {
        setCaseData({
          id, title: 'Smith vs Corp', status: 'ACTIVE', assignedLawyer: 'Alice Jenkins', clientName: 'Jane Smith',
          description: 'A complicated corporate merger case.',
          hearingDate: '2025-04-12', deadline: '2025-04-01',
          documents: [{ id: 1, name: 'Briefing.pdf', uploadedBy: 'Alice Jenkins', date: '2025-03-01' }],
          tasks: [{ id: 1, title: 'Review documents', status: 'PENDING', dueDate: '2025-03-15' }]
        });
      }
    };
    if (id) fetchCase();
  }, [id]);

  if (!caseData) return <div>Loading...</div>;

  return (
    <div>
      <div className="card mb-24 flex justify-between items-center" style={{ padding: '32px' }}>
        <div>
          <h1 className="mb-8" style={{ fontSize: '32px' }}>{caseData.title}</h1>
          <div className="text-secondary" style={{ fontSize: '14px' }}>
            Assigned to <strong>{caseData.assignedLawyer}</strong>
          </div>
        </div>
        <div>
          <Badge status={caseData.status} />
        </div>
      </div>

      <div className="mb-24" style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {['OVERVIEW', 'DOCUMENTS', 'TASKS', 'TIMELINE'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab ? 600 : 500,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card">
        {activeTab === 'OVERVIEW' && (
          <div className="flex-col gap-16">
            <h3 className="mb-16">Case Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label className="text-secondary" style={{ fontSize: '12px' }}>Client</label>
                <div style={{ fontWeight: 500 }}>{caseData.clientName}</div>
              </div>
              <div>
                <label className="text-secondary" style={{ fontSize: '12px' }}>Hearing Date</label>
                <div style={{ fontWeight: 500 }}>{caseData.hearingDate}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="text-secondary" style={{ fontSize: '12px' }}>Description</label>
                <p className="mt-8">{caseData.description || 'No description provided.'}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'DOCUMENTS' && (
          <div>
            <div className="flex justify-between items-center mb-24">
              <h3 className="mb-0">Documents</h3>
              <button className="primary-btn">Upload Document</button>
            </div>
            <Table 
              columns={[
                { key: 'name', label: 'File Name' },
                { key: 'uploadedBy', label: 'Uploaded By' },
                { key: 'date', label: 'Date' }
              ]} 
              data={caseData.documents || []} 
            />
          </div>
        )}

        {activeTab === 'TASKS' && (
          <div>
            <h3 className="mb-24">Tasks</h3>
            <Table 
              columns={[
                { key: 'title', label: 'Title' },
                { key: 'dueDate', label: 'Due Date' },
                { key: 'status', label: 'Status', render: (row: any) => <Badge status={row.status} /> }
              ]} 
              data={caseData.tasks || []} 
            />
          </div>
        )}

        {activeTab === 'TIMELINE' && (
          <div>
            <h3 className="mb-24">Timeline</h3>
            <p className="text-secondary">No recent activity.</p>
          </div>
        )}
      </div>
    </div>
  );
}
