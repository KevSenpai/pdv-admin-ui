
import axios from 'axios';

const apiClient = axios.create({
  // L'URL de base de notre API backend que nous venons de construire
  baseURL: 'https://pdv-backend-qvz8.onrender.com/api/v1', 
});

export default apiClient;