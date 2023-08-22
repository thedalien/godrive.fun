import axios from 'axios';

// if .env exists, use it, otherwise use the hardcoded value
let baseURL = import.meta.env.VITE_SERVER_ADDRESS || 'https://dalien.online';
// baseURL = 'http://89.221.220.112:8000';

const api = axios.create({
    baseURL: baseURL
});

export default api;

const token = localStorage.getItem('token');

if (token) {
    // console.log('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    // console.log('no token');
    delete api.defaults.headers.common['Authorization'];
}