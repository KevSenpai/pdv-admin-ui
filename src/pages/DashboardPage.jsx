import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Alert, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// Importer toutes nos fonctions API
import { getAllPDV, createPDV, updatePDV, togglePDVStatus } from '../api/pdvApi'; 
import PDVTable from '../components/PDVTable.jsx';
import PDVForm from '../components/PDVForm.jsx'; // <-- Importer le formulaire
const DashboardPage = () => {
  // --- STATE MANAGEMENT ---
  const [pdvList, setPdvList] = useState([]); // Pour stocker la liste des PDV
  const [isLoading, setIsLoading] = useState(true); // Pour l'indicateur de chargement
  const [error, setError] = useState(''); // Pour les messages d'erreur
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdvToEdit, setPdvToEdit] = useState(null); // null pour la création
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour le spinner du formulaire

  // --- DATA FETCHING ---
  // useCallback est un hook qui mémorise la fonction pour éviter de la recréer
  // à chaque rendu, ce qui est une bonne pratique de performance.
  const fetchPdvData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getAllPDV();
      setPdvList(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch points of sale.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect est un hook qui s'exécute après le premier rendu du composant.
  // Parfait pour aller chercher des données initiales.
  useEffect(() => {
    fetchPdvData();
  }, [fetchPdvData]); // Le tableau de dépendances assure qu'il ne s'exécute qu'une fois

  // --- HANDLERS (pour plus tard) ---
  const handleEdit = (pdv) => {
    setPdvToEdit(pdv); // On stocke le PDV à éditer
    setIsModalOpen(true); // On ouvre le modal
  };

const handleToggleStatus = async (id) => {
    try {
      await togglePDVStatus(id);
      fetchPdvData(); // On rafraîchit la liste
    } catch (err) {
      setError(err.message || 'Failed to toggle status.');
    }
  };

const handleAdd = () => {
    setPdvToEdit(null); // On s'assure qu'il n'y a pas de PDV à éditer
    setIsModalOpen(true); // On ouvre le modal (qui sera vide)
  };

  // -- LA FONCTION MANQUANTE --
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPdvToEdit(null); // On réinitialise aussi le PDV à éditer
  };
  // -- FIN DE L'AJOUT --


  const handleSave = async (formData) => {
    setIsSubmitting(true);
    setError('');
    try {
      if (pdvToEdit) {
        // Mode Modification
        await updatePDV(pdvToEdit.id, formData);
      } else {
        // Mode Création
        await createPDV(formData);
      }
      handleCloseModal(); // On ferme le modal
      fetchPdvData(); // On rafraîchit la liste
    } catch (err) {
      setError(err.message || 'Failed to save point of sale.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER LOGIC ---
  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
    }
    
    return (
      <PDVTable
        pdvList={pdvList}
        onEdit={handleEdit}
        onToggleStatus={handleToggleStatus}
      />
    );
  };

 return (
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography component="h1" variant="h4">
          Gestion des Points de Vente
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Ajouter un PDV
        </Button>
      </Box>
      
      {/* On affiche une alerte d'erreur globale si besoin */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {renderContent()}

      {/* --- LE DIALOGUE MODAL --- */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{pdvToEdit ? 'Modifier le Point de Vente' : 'Ajouter un Point de Vente'}</DialogTitle>
        <DialogContent>
          <PDVForm
            pdvToEdit={pdvToEdit}
            onSubmit={handleSave}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;