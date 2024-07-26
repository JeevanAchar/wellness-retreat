import axiosInstance from "../utils/axiosInstance";

export const fetchAllDetails = ({ page, limit = 3 }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axiosInstance.get(`/api/v1/retreats?page=${page}&limit=${limit}`);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}
