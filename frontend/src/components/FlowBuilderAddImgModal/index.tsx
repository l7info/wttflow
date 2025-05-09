import React from 'react';
import { Modal, Box, Button, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import { FileUpload, Image } from '@mui/icons-material';

interface FlowBuilderAddImgModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
}

export const FlowBuilderAddImgModal: React.FC<FlowBuilderAddImgModalProps> = ({ open, onClose, onSave }) => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleSave = () => {
    onSave(imageUrl);
    onClose();
  };

  const handleImagePreview = () => {
    if (imageUrl) {
      setPreview(imageUrl);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Adicionar Imagem
        </Typography>

        <TextField
          fullWidth
          label="URL da Imagem"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <IconButton onClick={handleImagePreview}>
            <FileUpload />
          </IconButton>
        </Box>

        {preview && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 300 }} />
          </Box>
        )}

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
