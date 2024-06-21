// an interceptor.
// will intercept any request we send.
// automatically add the correct headers using axios <-- for network requests.

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/djangoreactnoteapp/backend/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, // import anything specified in an env variable file.
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;