'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clientService } from '@/api/clientService';
import Table from '@/components/ui/Table';
import Pagination from '@/components/ui/Pagination';
import { useAuth } from '@/context/AuthContext';

export default function ClientsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const canCreate = true; // Temporary: disabled role protection

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await clientService.getAll(page, 10, search);
        setData(res.content || []);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error(err);
        // mock data on failure
        setData([
          { id: 1, name: 'Acme Corp', email: 'legal@acme.com', phone: '555-0100', caseCount: 3, createdAt: '2025-01-10' },
          { id: 2, name: 'John Smith', email: 'john@example.com', phone: '555-0101', caseCount: 1, createdAt: '2025-02-15' },
        ]);
        setTotalPages(1);
      }
    };
    fetchClients();
  }, [page, search]);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'caseCount', label: 'Linked Cases' },
    { key: 'createdAt', label: 'Created Date' }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-24">
        <h2>Clients</h2>
        <div className="flex gap-16">
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            style={{ width: '250px' }}
          />
          {canCreate && (
            <button className="primary-btn">New Client</button>
          )}
        </div>
      </div>

      <Table 
        columns={columns} 
        data={data} 
        onRowClick={(row) => router.push(`/clients/${row.id}`)} 
      />
      
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />
    </div>
  );
}
