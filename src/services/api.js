import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const analyzeConstruction = async (formData) => {
  const response = await api.post('/analyze', formData);
  return response.data;
};

export default api;
