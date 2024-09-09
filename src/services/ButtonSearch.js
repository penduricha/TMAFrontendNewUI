import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Các hàm API khác
export default {
    getButtonSearches() {
        return apiClient.get('/button-searches');
    },
    createButtonSearch(buttonSearch) {
        return apiClient.post('/button-searches',buttonSearch, {

        });
    },
    countButtonSearchToday(){
        return apiClient.get('/count-button-search-today');
    },
    countButtonSearch_SevenDay() {
        return apiClient.get('/count-button-search-seven-day');
    },
    getButtonSearch_KeyWordMuch_TimeLasted(){
        return apiClient.get('/button-search-keyword-much-time-lasted');
    }
};