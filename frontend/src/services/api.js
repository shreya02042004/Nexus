import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Make sure this matches your backend
});

// Add a request interceptor to include the auth token
API.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');
        if (user) {
            const { token } = JSON.parse(user);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
