import axios from 'axios';

const api = axios.create({
  baseURL: "", // Vite proxy in vite.config.js handles the target http://localhost:8080
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// REQUEST INTERCEPTOR: Attaches the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Handles invalid/expired tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend returns 401 (Unauthorized) or 403 (Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear storage to remove invalid data
      localStorage.clear();
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;