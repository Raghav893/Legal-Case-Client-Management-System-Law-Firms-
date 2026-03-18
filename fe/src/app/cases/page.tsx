'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { caseService } from '@/api/caseService';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export default function CasesPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState({ status: '', lawyerId: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await caseService.getAll(filters);
        setData(res.content || []);
      } catch (err) {
        setData([
          { id: 1, title: 'Smith vs Corp', clientName: 'Jane Smith', assignedLawyer: 'Alice Jenkins', status: 'OPEN', hearingDate: '2025-04-12', deadline: '2025-04-01' },
          { id: 2, title: 'Acme Merger', clientName: 'Acme Corp', assignedLawyer: 'Bob Martin', status: 'ACTIVE', hearingDate: '2025-05-01', deadline: '2025-04-20' }
        ]);
      }
    };
    fetchCases();
  }, [filters]);

  const columns = [
    { key: 'title', label: 'Case Title' },
    { key: 'clientName', label: 'Client' },
    { key: 'assignedLawyer', label: 'Assigned Lawyer' },
    { key: 'status', label: 'Status', render: (row: any) => <Badge status={row.status} /> },
    { key: 'hearingDate', label: 'Hearing Date' },
    { key: 'deadline', label: 'Deadline' }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-24">
        <h2>Cases</h2>
        <div className="flex gap-16">
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Statuses</option>
            <option value="OPEN">OPEN</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          <select 
            value={filters.lawyerId} 
            onChange={(e) => setFilters({...filters, lawyerId: e.target.value})}
          >
            <option value="">All Lawyers</option>
            <option value="1">Alice Jenkins</option>
            <option value="2">Bob Martin</option>
          </select>
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>New Case</button>
        </div>
      </div>

      <Table 
        columns={columns} 
        data={data} 
        onRowClick={(row) => router.push(`/cases/${row.id}`)} 
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Case">
        <form className="flex-col gap-16" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="flex-col gap-8">
            <label>Case Title</label>
            <input type="text" className="w-full" required />
          </div>
          <div className="flex-col gap-8">
            <label>Client ID</label>
            <input type="text" className="w-full" required />
          </div>
          <button type="submit" className="primary-btn mt-16" style={{ width: '100%', padding: '12px' }}>Create Case</button>
        </form>
      </Modal>
    </div>
  );
}
