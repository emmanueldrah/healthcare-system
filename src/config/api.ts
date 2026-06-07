import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8767';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

export default api;
