import apiClient from './axiosConfig';

// Récupérer tous les PDV
export const getAllPDV = async () => {
  try {
    const response = await apiClient.get('/admin/points-de-vente');
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Network error');
  }
};

// Créer un nouveau PDV
export const createPDV = async (pdvData) => {
  try {
    const response = await apiClient.post('/admin/points-de-vente', pdvData);
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Network error');
  }
};

// Mettre à jour un PDV
export const updatePDV = async (id, pdvData) => {
  try {
    const response = await apiClient.put(`/admin/points-de-vente/${id}`, pdvData);
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Network error');
  }
};

// Changer le statut d'un PDV
export const togglePDVStatus = async (id) => {
  try {
    const response = await apiClient.patch(`/admin/points-de-vente/${id}/status`);
    return response.data;
  } catch (error) {
    throw error.response.data || new Error('Network error');
  }
};