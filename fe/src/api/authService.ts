import api from './axios';

export const authService = {
  login: async (credentials: any) => {
    const res = await api.post('/api/auth/login', credentials);
    return res.data;
  },
  register: async (data: any) => {
    const res = await api.post('/api/auth/register', data);
    return res.data;
  },
  refresh: async (refreshToken: string) => {
    const res = await api.post('/api/auth/refresh', { refreshToken });
    return res.data;
  }
};
