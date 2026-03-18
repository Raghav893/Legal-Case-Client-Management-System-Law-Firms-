import api from './axios';

export const clientService = {
  getAll: async (page = 0, size = 10, search = '') => {
    const res = await api.get(`/api/clients?page=${page}&size=${size}&search=${search}`);
    return res.data;
  },
  getById: async (id: string | number) => {
    const res = await api.get(`/api/clients/${id}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post('/api/clients', data);
    return res.data;
  },
  update: async (id: string | number, data: any) => {
    const res = await api.put(`/api/clients/${id}`, data);
    return res.data;
  }
};

