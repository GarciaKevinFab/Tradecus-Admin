import axios from 'axios';

export const BASE_URL = "http://localhost:4000/api/v1";

// Configura axios globalmente
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;