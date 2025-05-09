import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { FlowBuilderModal } from '../../components/FlowBuilderModal';

interface FlowBuilderProps {
  // Adicionar props necessárias aqui
}

export const FlowBuilder: React.FC<FlowBuilderProps> = () => {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Construtor de Fluxo
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">
              Crie fluxos automatizados para suas mensagens
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
              sx={{ ml: 'auto' }}
            >
              Novo Fluxo
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <FlowBuilderModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};
