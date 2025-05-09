import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { DragHandle, Delete, Edit, PlayArrow } from '@mui/icons-material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTheme } from '@mui/material';

interface FlowBlockProps {
  block: {
    id: string;
    type: string;
    data: any;
  };
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onPlay: (id: string) => void;
  onConnect: (sourceId: string, targetId: string) => void;
  isConnected: (sourceId: string, targetId: string) => boolean;
}

export const FlowBlock: React.FC<FlowBlockProps> = ({ block, index, onDelete, onEdit, onPlay }) => {
  const blockStyles = {
    padding: '16px',
    margin: '8px 0',
    borderRadius: '8px',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const iconStyles = {
    color: 'text.secondary',
    fontSize: '1.2rem',
  };

  const theme = useTheme();

  const connectionPointStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: 'background.paper',
    cursor: 'pointer',
    position: 'absolute',
  };

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implementar lógica de conexão
  };

  return (
    <Draggable draggableId={block.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={blockStyles}
          position="relative"
        >
          <Tooltip title="Mover">
            <IconButton size="small" sx={iconStyles}>
              <DragHandle />
            </IconButton>
          </Tooltip>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {block.type.charAt(0).toUpperCase() + block.type.slice(1)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {block.data.text || block.data.url || block.data.title || 'Sem conteúdo'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="Executar">
              <IconButton size="small" onClick={() => onPlay(block.id)} sx={iconStyles}>
                <PlayArrow />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton size="small" onClick={() => onEdit(block.id)} sx={iconStyles}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Excluir">
              <IconButton size="small" onClick={() => onDelete(block.id)} sx={iconStyles}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip title="Conectar">
              <Box
                sx={{
                  ...connectionPointStyle,
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                onClick={(e) => handleConnect(e)}
              />
            </Tooltip>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};
