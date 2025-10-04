import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  // Si on est en train de vérifier l'authentification, on affiche un spinner
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si la vérification est terminée et qu'il n'y a pas de token, on redirige
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si tout est bon, on affiche la page
  return children;
};

export default ProtectedRoute;