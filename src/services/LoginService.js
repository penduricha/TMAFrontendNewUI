import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Các hàm API khác
export default {
    getLogins() {
        return apiClient.get('/logins');
    },
    createLogin(login) {
        return apiClient.post('/logins',login, {
        });
    },
    getLoginsGroupByDateLogin(){
        return apiClient.get('/logins-statistic-by-day');
    },
    countLoginToday(){
        return apiClient.get('/count-login-today');
    },
    countLoginYesterday(){
        return apiClient.get('/count-login-yesterday');
    },
};