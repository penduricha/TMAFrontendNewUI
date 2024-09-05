import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Các hàm API khác
export default {
    getRegisters() {
        return apiClient.get('/registers');
    },
    getRegisters_SevenDayToNow() {
        return apiClient.get('/registers/registers-seven-day-last');
    },
    createRegister(register) {
        return apiClient.post('/registers',register, {
        });
    },
    getRegistersGroupByDateRegister(){
        return apiClient.get('/registers-statistic-by-day');
    },
    countRegistersToday(){
        return apiClient.get('/registers/get-number-of-registers-today');
    },
    countRegistersInLast3Days(){
        return apiClient.get('/registers/get-number-of-registers-last-3-days');
    }
};