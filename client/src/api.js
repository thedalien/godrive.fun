import axios from 'axios';



// if .env exists, use it, otherwise use the hardcoded value
// const baseURL = import.meta.env.VITE_SERVER_ADDRESS || 'http://89.221.220.112:8000';
const baseURL = 'http://89.221.220.112:8000';

const api = axios.create({
    baseURL: baseURL
});

export default api;

const token = localStorage.getItem('token');

if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    delete api.defaults.headers.common['Authorization'];
}