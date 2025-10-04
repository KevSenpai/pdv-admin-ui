 import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // <-- NOUVEAU NOM CORRECT
    import LoginPage from './pages/LoginPage';
    import DashboardPage from './pages/DashboardPage';
    import ProtectedRoute from './components/ProtectedRoute';

    function App() {
      return (
        <AuthProvider>
          <Router>
            <Routes>
              {/* Route publique pour le login */}
              <Route path="/login" element={<LoginPage />} />

              {/* Route protégée pour le dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </Router>
        </AuthProvider>
      );
    }

    export default App;