import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_SERVER,
  withCredentials: true, // Include cookies in requests
});

export default api;