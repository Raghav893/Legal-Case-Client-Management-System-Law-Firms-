import api from './axios';

export const caseService = {
  getAll: async (filters: any) => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/api/cases?${params}`);
    return res.data;
  },
  getById: async (id: string | number) => {
    const res = await api.get(`/api/cases/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post('/api/cases', data);
    return res.data;
  },
  update: async (id: string | number, data: any) => {
    const res = await api.put(`/api/cases/${id}`, data);
    return res.data;
  }
};
