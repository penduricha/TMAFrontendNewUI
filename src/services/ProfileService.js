import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Các hàm API khác
export default {
    getProfiles() {
        return apiClient.get('/profiles');
    },
    createProfile(profile) {
        return apiClient.post('/profiles', profile, {
        });
    },
    getProfileByEmail(email) {
        return apiClient.get(`/profiles/email/${email}`);
    },
    getProfileByIdMax() {
        return apiClient.get(`/profiles/maxId`);
    },
    getProfileByPhoneNumber(phoneNumber) {
        return apiClient.get(`/profiles/phoneNumber/${phoneNumber}`);
    },
    updateProfile(email,profile){
        return apiClient.put(`/profiles/email/${email}`,profile);
    },
    getLoginsGroupByDateLogin(){
        return apiClient.get('/logins-statistic-by-day');
    }
};