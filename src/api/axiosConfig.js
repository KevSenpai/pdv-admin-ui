
import axios from 'axios';

const apiClient = axios.create({
  // L'URL de base de notre API backend que nous venons de construire
  baseURL: 'https://pdv-backend-527w.onrender.com', 
});

export default apiClient;