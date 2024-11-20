import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    // Modify request config here, e.g., add headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add global response interceptor
instance.interceptors.response.use(
  (response) => {
    // Modify response data here, if needed
    if (response.data && response.data.data) return response.data;
    return response;
  },
  (error) => {
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
  }
);

export default instance;
