import api from './axios';

export const taskService = {
  getAll: async (filters: any) => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/api/tasks?${params}`);
    return res.data;
  },
  create: async (data: any) => {
    const res = await api.post('/api/tasks', data);
    return res.data;
  },
  updateStatus: async (id: string | number, status: string) => {
    const res = await api.put(`/api/tasks/${id}`, { status });
    return res.data;
  }
};
