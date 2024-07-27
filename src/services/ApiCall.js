import axiosInstance from "../utils/axiosInstance";

export const fetchAllDetails = ({ page, limit = 3, filter, location, search, date }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = `/api/v1/retreats?page=${page}&limit=${limit}`;
            if (filter) query += `&filter=${filter}`;
            if (location) query += `&location=${location}`;
            if (search) query += `&search=${search}`;
            if (date) query += `&date=${date}`;
            const { data } = await axiosInstance.get(query);
            resolve(data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                resolve([]); // Resolve with an empty array if no data is found
            } else {
                reject(err); // Reject for other errors
            }
        }
    });
};
