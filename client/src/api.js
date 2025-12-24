import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sharmarkitchenrestaurant-production.up.railway.app/api', // Direct Production Link
});

export default api;
