import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../api/authApi';
import apiClient from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true); // <-- Nouvel état de chargement

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        // Le token existe, configurons Axios immédiatement
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        try {
          // Essayons de récupérer le profil de l'utilisateur pour valider le token
          const response = await apiClient.get('/admin/profile');
          setUser(response.data.admin); // On stocke les vraies infos utilisateur
        } catch (error) {
          // Si le token est invalide (expiré, etc.), on nettoie tout
          console.error("Token validation failed", error);
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          delete apiClient.defaults.headers.common['Authorization'];
        }
      }
      setIsLoading(false); // On a fini de vérifier, l'application est prête
    };

    initializeAuth();
  }, [token]); // Cet effet dépend maintenant uniquement du token

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    setToken(data.token); // Ceci va déclencher le useEffect ci-dessus
    localStorage.setItem('token', data.token); // On sauvegarde aussi manuellement
    // L'utilisateur sera mis à jour par le useEffect
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  // On passe isLoading dans la valeur du contexte
  const value = { user, token, login, logout, isLoading };

  // On n'affiche les enfants que lorsque le chargement initial est terminé
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};