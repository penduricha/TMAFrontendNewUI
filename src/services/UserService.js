import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


// Các hàm API khác
export default {
    getUsers() {
        return apiClient.get('/users');
    },
};