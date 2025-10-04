import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

const PDVForm = ({ pdvToEdit, onSubmit, isLoading }) => {
  // --- STATE MANAGEMENT ---
  const [nom, setNom] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // useEffect se déclenche quand 'pdvToEdit' change.
  // Il permet de pré-remplir le formulaire pour la modification.
  useEffect(() => {
    if (pdvToEdit) {
      setNom(pdvToEdit.nom);
      setLatitude(pdvToEdit.location.coordinates[1]);
      setLongitude(pdvToEdit.location.coordinates[0]);
    } else {
      // Si on crée un nouveau PDV, on vide les champs.
      setNom('');
      setLatitude('');
      setLongitude('');
    }
  }, [pdvToEdit]);

  // --- HANDLERS ---
  const handleSubmit = (event) => {
    event.preventDefault();
    // On appelle la fonction 'onSubmit' passée en props
    // avec les données du formulaire.
    onSubmit({
      nom,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Nom du Point de Vente"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Latitude"
        type="number"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Longitude"
        type="number"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Sauvegarder'}
      </Button>
    </Box>
  );
};

export default PDVForm;