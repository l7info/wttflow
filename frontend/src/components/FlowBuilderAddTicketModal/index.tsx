import React from 'react';
import { Modal, Box, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FlowBuilderAddTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    priority: string;
    queue: string;
  }) => void;
}

export const FlowBuilderAddTicketModal: React.FC<FlowBuilderAddTicketModalProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priority, setPriority] = React.useState('normal');
  const [queue, setQueue] = React.useState('');

  const handleSave = () => {
    onSave({
      title,
      description,
      priority,
      queue,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Adicionar Ticket
        </Typography>

        <TextField
          fullWidth
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Prioridade</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as string)}
            label="Prioridade"
          >
            <MenuItem value="low">Baixa</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="high">Alta</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Fila</InputLabel>
          <Select
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
            label="Fila"
          >
            {/* Adicionar opções de filas dinamicamente */}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
