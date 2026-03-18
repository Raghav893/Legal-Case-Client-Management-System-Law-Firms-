'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { clientService } from '@/api/clientService';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';

export default function ClientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [cases, setCases] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await clientService.getById(id as string);
        setClient(res);
        setCases(res.cases || []);
      } catch (err) {
        setClient({ id, name: 'Acme Corp', email: 'legal@acme.com', phone: '555-0100', address: '123 Corporate Blvd' });
        setCases([
          { id: 101, title: 'Acme Merger', status: 'ACTIVE', hearingDate: '2025-05-01' }
        ]);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await clientService.update(id as string, client);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setIsEditing(false);
    }
  };

  if (!client) return <div>Loading...</div>;

  const caseColumns = [
    { key: 'title', label: 'Case Title' },
    { key: 'status', label: 'Status', render: (row: any) => <Badge status={row.status} /> },
    { key: 'hearingDate', label: 'Hearing Date' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
      <div className="card">
        <div className="flex justify-between items-center mb-16">
          <h2 style={{ fontSize: '20px' }}>Client Info</h2>
          <button 
            onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
            style={{ color: 'var(--accent)', textDecoration: 'underline' }}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="flex-col gap-16 mt-24">
          <div>
            <label className="text-secondary" style={{ fontSize: '12px' }}>Name</label>
            {isEditing ? (
              <input 
                className="w-full mt-8" 
                value={client.name} 
                onChange={e => setClient({...client, name: e.target.value})} 
              />
            ) : (
              <div style={{ fontWeight: 500, marginTop: '4px' }}>{client.name}</div>
            )}
          </div>
          <div>
            <label className="text-secondary" style={{ fontSize: '12px' }}>Email</label>
            {isEditing ? (
              <input 
                className="w-full mt-8" 
                value={client.email} 
                onChange={e => setClient({...client, email: e.target.value})} 
              />
            ) : (
              <div style={{ fontWeight: 500, marginTop: '4px' }}>{client.email}</div>
            )}
          </div>
          <div>
            <label className="text-secondary" style={{ fontSize: '12px' }}>Phone</label>
            {isEditing ? (
              <input 
                className="w-full mt-8" 
                value={client.phone} 
                onChange={e => setClient({...client, phone: e.target.value})} 
              />
            ) : (
              <div style={{ fontWeight: 500, marginTop: '4px' }}>{client.phone}</div>
            )}
          </div>
          <div>
            <label className="text-secondary" style={{ fontSize: '12px' }}>Address</label>
            {isEditing ? (
              <textarea 
                className="w-full mt-8" 
                value={client.address || ''} 
                onChange={e => setClient({...client, address: e.target.value})} 
                rows={3}
              />
            ) : (
              <div style={{ fontWeight: 500, marginTop: '4px' }}>{client.address || '-'}</div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="mb-24">Linked Cases</h3>
        <Table 
          columns={caseColumns} 
          data={cases} 
          onRowClick={(row) => router.push(`/cases/${row.id}`)}
        />
      </div>
    </div>
  );
}
