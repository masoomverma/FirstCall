import axios from 'axios';

const API_BASE_URL = 'http://192.168.116.71:8000/api/';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
};
