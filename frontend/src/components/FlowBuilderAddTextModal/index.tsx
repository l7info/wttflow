import React from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';

interface FlowBuilderAddTextModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
}

export const FlowBuilderAddTextModal: React.FC<FlowBuilderAddTextModalProps> = ({ open, onClose, onSave }) => {
  const [text, setText] = React.useState('');

  const handleSave = () => {
    onSave(text);
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
        <h2>Adicionar Texto</h2>
        <TextField
          fullWidth
          label="Texto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />
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
