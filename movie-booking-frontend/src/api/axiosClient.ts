import axios from 'axios';

// Create axios instance with base configuration
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: false,
});

// Request interceptor - attach auth token if present
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 && !response.data) {
      console.warn('Empty response data received from:', response.config.url);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });
    
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      window.location.href = '/user/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
