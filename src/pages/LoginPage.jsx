import React, { useState } from 'react'; // <-- MODIFIER CETTE LIGNE
import { login } from '../api/authApi';
    import { useNavigate } from 'react-router-dom'; // <-- Importer useNavigate
    import { useAuth } from '../context/AuthContext.jsx';
// Imports des composants MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
 // ... imports MUI ...

    const LoginPage = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState('');

      const { login } = useAuth(); // <-- Utiliser la fonction login du contexte
      const navigate = useNavigate(); // <-- Hook pour la redirection

      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
          await login(username, password); // <-- Appeler la fonction du contexte
          navigate('/dashboard'); // <-- Rediriger vers le dashboard en cas de succès
        } catch (err) {
          setError(err.message || 'Invalid credentials.');
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;