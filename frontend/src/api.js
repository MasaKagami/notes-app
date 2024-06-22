// an interceptor.
// will intercept any request we send.
// automatically add the correct headers using axios <-- for network requests.

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/djangoreactnoteapp/backend/v1";

const baseUrl = apiUrl;

const api = axios.create({
  baseURL: baseUrl // import anything specified in an env variable file.
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