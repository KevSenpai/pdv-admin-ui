import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const PDVTable = ({ pdvList, onEdit, onToggleStatus }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>Statut</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pdvList.map((pdv) => (
            <TableRow key={pdv.id}>
              <TableCell>{pdv.nom}</TableCell>
              <TableCell>{pdv.location.coordinates[1]}</TableCell> {/* Latitude */}
              <TableCell>{pdv.location.coordinates[0]}</TableCell> {/* Longitude */}
              <TableCell>
                <Chip
                  label={pdv.est_actif ? 'Actif' : 'Inactif'}
                  color={pdv.est_actif ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(pdv)} aria-label="modifier">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onToggleStatus(pdv.id)} aria-label="changer statut">
                  {pdv.est_actif ? <ToggleOnIcon color="success" /> : <ToggleOffIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PDVTable;