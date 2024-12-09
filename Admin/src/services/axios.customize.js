import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (
      typeof window != "undefined" &&
      window &&
      window.localStorage &&
      window.localStorage &&
      window.localStorage.getItem("access_token")
    ) {
      config.headers.Authorization =
        "Bearer " + window.localStorage.getItem("access_token");
    }
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
    if (response.data) return response.data;
    return response;
  },
  (error) => {
    if (error.response) return error.response.data;
    return Promise.reject(error);
  }
);

export default instance;
