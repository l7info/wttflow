import React from 'react';
import { Modal, Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

interface FlowBuilderAddAudioModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (audioUrl: string) => void;
}

export const FlowBuilderAddAudioModal: React.FC<FlowBuilderAddAudioModalProps> = ({ open, onClose, onSave }) => {
  const [audioUrl, setAudioUrl] = React.useState('');

  const handleSave = () => {
    onSave(audioUrl);
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
          Adicionar Áudio
        </Typography>
        
        <TextField
          fullWidth
          label="URL do Áudio"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FileUpload />
              </InputAdornment>
            ),
          }}
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
