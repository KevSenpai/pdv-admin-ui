import apiClient from './axiosConfig';

export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/admin/login', {
      username,
      password,
    });
    return response.data; // Retourne { message: '...', token: '...' }
  } catch (error) {
    // Gérer les erreurs et les renvoyer pour que le composant puisse les traiter
    throw error.response.data || new Error('Network error');
  }
};