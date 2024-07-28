// app/lib/axiosInstance.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
