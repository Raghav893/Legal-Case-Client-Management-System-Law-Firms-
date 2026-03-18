import api from './axios';

export const invoiceService = {
  getAll: async () => {
    const res = await api.get('/api/invoices');
    return res.data;
  },
  generate: async (data: any) => {
    const res = await api.post('/api/invoices', data);
    return res.data;
  },
  updateStatus: async (id: string | number, status: string) => {
    const res = await api.put(`/api/invoices/${id}/status`, { status });
    return res.data;
  }
};
