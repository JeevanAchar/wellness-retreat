import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://669f704cb132e2c136fdd9a0.mockapi.io"
});

export default axiosInstance;
