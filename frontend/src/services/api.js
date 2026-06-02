import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post(`/auth/login?email=${email}&password=${password}`),
  getMe: () => api.get('/users/me'),
};

export const contentAPI = {
  createBusinessProfile: (data) => api.post('/content/business-profile', data),
  getBusinessProfile: () => api.get('/content/business-profile'),
  generateContent: (data) => api.post('/content/generate', data),
  getPosts: (businessId, month) => api.get(`/content/posts/${businessId}?month=${month}`),
  updatePost: (postId, data) => api.patch(`/content/posts/${postId}`, data),
  deletePost: (postId) => api.delete(`/content/posts/${postId}`),
};