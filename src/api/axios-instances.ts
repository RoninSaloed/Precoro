import axios from "axios";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const API_URL = `${BACKEND_URL}`;
export const axiosInstance = axios.create({ baseURL: API_URL });
