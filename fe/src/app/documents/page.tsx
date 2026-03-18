'use client';

import React, { useEffect, useState } from 'react';
import { documentService } from '@/api/documentService';
import Table from '@/components/ui/Table';

export default function DocumentsPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await documentService.getAll('', {}); // No global endpoint in spec, falls to mock
        setData(res.content || []);
      } catch (err) {
        setData([
          { id: 1, name: 'Briefing.pdf', caseName: 'Smith vs Corp', tag: 'Pleadings', uploadedBy: 'Alice Jenkins', date: '2025-03-01' },
          { id: 2, name: 'Contract.docx', caseName: 'Acme Merger', tag: 'Contracts', uploadedBy: 'Bob Martin', date: '2025-02-15' }
        ]);
      }
    };
    fetchDocs();
  }, []);

  const columns = [
    { key: 'name', label: 'File Name', render: (row: any) => <span style={{ color: 'var(--accent)', textDecoration: 'underline', cursor: 'pointer' }}>{row.name}</span> },
    { key: 'caseName', label: 'Case' },
    { key: 'tag', label: 'Type/Tag' },
    { key: 'uploadedBy', label: 'Uploaded By' },
    { key: 'date', label: 'Date' },
    { key: 'actions', label: '', render: (row: any) => <button className="text-danger" onClick={() => confirm('Are you sure? Yes / Cancel')}>Delete</button> }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-24">
        <h2>Documents</h2>
        <div className="flex gap-16">
          <input type="text" placeholder="Filter by case..." />
          <input type="text" placeholder="Filter by tag..." />
        </div>
      </div>

      <Table columns={columns} data={data} />
    </div>
  );
}
