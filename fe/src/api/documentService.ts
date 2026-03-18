import api from './axios';

export const documentService = {
  getAll: async (caseId: string | number, filters: any = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/api/cases/${caseId}/documents?${params}`);
    return res.data;
  },
  upload: async (caseId: string | number, formData: FormData) => {
    const res = await api.post(`/api/cases/${caseId}/documents/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  delete: async (caseId: string | number, docId: string | number) => {
    const res = await api.delete(`/api/cases/${caseId}/documents/${docId}`);
    return res.data;
  }
};
