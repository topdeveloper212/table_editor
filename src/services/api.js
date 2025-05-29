import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchTreeData = async () => {
    try {
        const response = await api.get('/tree');
        return response.data;
    } catch (error) {
        console.error('Error fetching tree data:', error);
        throw error;
    }
};

export const fetchTableData = async (tableId, filters = {}) => {
    try {
        const response = await api.get(`/tables/${tableId}`, { params: filters });
        return response.data;
    } catch (error) {
        console.error(`Error fetching table ${tableId} data:`, error);
        throw error;
    }
};

export const fetchVideoData = async (videoId) => {
    try {
        const response = await api.get(`/videos/${videoId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching video data:', error);
        throw error;
    }
};

export default api; 