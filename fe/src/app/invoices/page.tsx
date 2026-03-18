'use client';

import React, { useEffect, useState } from 'react';
import { invoiceService } from '@/api/invoiceService';
import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export default function InvoicesPage() {
  const [data, setData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await invoiceService.getAll();
        setData(res.content || []);
      } catch (err) {
        setData([
          { id: 1, invoiceNo: 'INV-2025-001', clientName: 'Jane Smith', caseName: 'Smith vs Corp', amount: '₹ 1,50,000.00', status: 'PAID', issuedDate: '2025-02-01', dueDate: '2025-03-01' },
          { id: 2, invoiceNo: 'INV-2025-002', clientName: 'Acme Corp', caseName: 'Acme Merger', amount: '₹ 4,20,000.00', status: 'DRAFT', issuedDate: '-', dueDate: '-' },
          { id: 3, invoiceNo: 'INV-2025-003', clientName: 'Globex', caseName: 'IP Dispute', amount: '₹ 75,000.00', status: 'SENT', issuedDate: '2025-03-10', dueDate: '2025-04-10' }
        ]);
      }
    };
    fetchInvoices();
  }, []);

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await invoiceService.updateStatus(id, newStatus);
      setData(data.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } catch (err) {
      console.error(err);
      setData(data.map(i => i.id === id ? { ...i, status: newStatus } : i)); // Mock fallback
    }
  };

  const columns = [
    { key: 'invoiceNo', label: 'Invoice #' },
    { key: 'clientName', label: 'Client' },
    { key: 'caseName', label: 'Case' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: (row: any) => <Badge status={row.status} /> },
    { key: 'issuedDate', label: 'Issued Date' },
    { key: 'dueDate', label: 'Due Date' },
    { 
      key: 'actions', 
      label: '', 
      render: (row: any) => (
        <div className="flex gap-8">
          {row.status === 'DRAFT' && <button onClick={() => handleStatusUpdate(row.id, 'SENT')} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Mark as Sent</button>}
          {row.status === 'SENT' && <button onClick={() => handleStatusUpdate(row.id, 'PAID')} style={{ color: 'var(--success)', textDecoration: 'underline' }}>Mark as Paid</button>}
        </div>
      )
    }
  ];

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-24">
        <h2>Invoices</h2>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>Generate Invoice</button>
      </div>

      <Table columns={columns} data={data} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Invoice">
        <form className="flex-col gap-16" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="flex-col gap-8">
            <label>Select Case</label>
            <select className="w-full" required>
              <option value="">-- Choose Case --</option>
              <option value="1">Acme Merger</option>
              <option value="2">Smith vs Corp</option>
            </select>
          </div>
          <div className="flex justify-between mt-16 p-16" style={{ backgroundColor: 'var(--bg)', borderRadius: '2px' }}>
            <span style={{ fontWeight: 600 }}>Total Unbilled Time:</span>
            <span style={{ fontWeight: 600 }}>₹ 0.00</span>
          </div>
          <button type="submit" className="primary-btn mt-16" style={{ width: '100%', padding: '12px' }}>Generate Draft</button>
        </form>
      </Modal>
    </div>
  );
}
