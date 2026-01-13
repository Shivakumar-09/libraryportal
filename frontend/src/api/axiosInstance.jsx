import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
=======
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
>>>>>>> friend/main
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
