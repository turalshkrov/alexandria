import axios from "axios";
import qs from "qs";
import { requestInterceptor } from "./interceptors";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { encode: false });
  },
});

http.interceptors.request.use(requestInterceptor);

export default http;