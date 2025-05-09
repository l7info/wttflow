import React from 'react';
import { Modal, Box, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
import { Add, TextFields, Image, Audiotrack, Receipt, PlayArrow, ReceiptLong } from '@mui/icons-material';
import { FlowBuilderAddTextModal } from '../FlowBuilderAddTextModal';
import { FlowBuilderAddImgModal } from '../FlowBuilderAddImgModal';
import { FlowBuilderAddAudioModal } from '../FlowBuilderAddAudioModal';
import { FlowBuilderAddTicketModal } from '../FlowBuilderAddTicketModal';
import { FlowBlock } from '../FlowBlock';
import { FlowConnector } from '../FlowConnector';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';

interface FlowBuilderModalProps {
  open: boolean;
  onClose: () => void;
}

export const FlowBuilderModal: React.FC<FlowBuilderModalProps> = ({ open, onClose }) => {
  const [openAddTextModal, setOpenAddTextModal] = React.useState(false);
  const [openAddImgModal, setOpenAddImgModal] = React.useState(false);
  const [openAddAudioModal, setOpenAddAudioModal] = React.useState(false);
  const [openAddTicketModal, setOpenAddTicketModal] = React.useState(false);

  const [flow, setFlow] = React.useState<any[]>([]);
  const [connections, setConnections] = React.useState<{
    [key: string]: string[];
  }>({});

  const handleConnect = (sourceId: string, targetId: string) => {
    setConnections(prev => {
      const newConnections = { ...prev };
      if (!newConnections[sourceId]) {
        newConnections[sourceId] = [];
      }
      if (!newConnections[sourceId].includes(targetId)) {
        newConnections[sourceId].push(targetId);
      }
      return newConnections;
    });
  };

  const isConnected = (sourceId: string, targetId: string) => {
    return connections[sourceId]?.includes(targetId) || false;
  };

  const handleAddBlock = (type: string, data: any) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      data,
    };
    setFlow([...flow, newBlock]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(flow);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFlow(items);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1200,
          height: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Construtor de Fluxo
        </Typography>

        <Grid container spacing={2}>
          {/* Barra de ferramentas */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenAddTextModal(true)}
              >
                Adicionar Texto
              </Button>
              <Button
                variant="outlined"
                startIcon={<Image />}
                onClick={() => setOpenAddImgModal(true)}
              >
                Adicionar Imagem
              </Button>
              <Button
                variant="outlined"
                startIcon={<Audiotrack />}
                onClick={() => setOpenAddAudioModal(true)}
              >
                Adicionar Áudio
              </Button>
              <Button
                variant="outlined"
                startIcon={<ReceiptLong />}
                onClick={() => setOpenAddTicketModal(true)}
              >
                Adicionar Ticket
              </Button>
            </Paper>
          </Grid>

          {/* Área do fluxo */}
          <Grid item xs={12}>
            <Box sx={{ p: 2 }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="flow">
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        minHeight: '200px',
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: '8px',
                        p: 2,
                        bgcolor: 'background.neutral',
                      }}
                    >
                      {flow.map((block, index) => (
                        <FlowBlock
                          key={block.id}
                          block={block}
                          index={index}
                          onDelete={(id) => {
                            setFlow(flow.filter((b) => b.id !== id));
                            setConnections(prev => {
                              const newConnections = { ...prev };
                              delete newConnections[id];
                              return Object.entries(newConnections)
                                .reduce((acc, [key, value]) => {
                                  acc[key] = value.filter(conn => conn !== id);
                                  return acc;
                                }, {});
                            });
                          }}
                          onEdit={(id) => {
                            const block = flow.find((b) => b.id === id);
                            if (block) {
                              switch (block.type) {
                                case 'text':
                                  setOpenAddTextModal(true);
                                  break;
                                case 'image':
                                  setOpenAddImgModal(true);
                                  break;
                                case 'audio':
                                  setOpenAddAudioModal(true);
                                  break;
                                case 'ticket':
                                  setOpenAddTicketModal(true);
                                  break;
                              }
                            }
                          }}
                          onPlay={(id) => {
                            // Implementar lógica de execução do bloco
                            console.log('Executando bloco:', id);
                          }}
                          onConnect={handleConnect}
                          isConnected={isConnected}
                        />
                      ))}
                      
                      {/* Renderizar conexões */}
                      {Object.entries(connections).map(([sourceId, targets]) => (
                        targets.map(targetId => {
                          const sourceBlock = flow.find(b => b.id === sourceId);
                          const targetBlock = flow.find(b => b.id === targetId);
                          
                          if (sourceBlock && targetBlock) {
                            return (
                              <FlowConnector
                                key={`${sourceId}-${targetId}`}
                                from={{
                                  x: sourceBlock.position.x + 200,
                                  y: sourceBlock.position.y + 50,
                                }}
                                to={{
                                  x: targetBlock.position.x,
                                  y: targetBlock.position.y + 50,
                                }}
                              />
                            );
                          }
                          return null;
                        })
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
          </Grid>
        </Grid>

        {/* Modais */}
        <FlowBuilderAddTextModal
          open={openAddTextModal}
          onClose={() => setOpenAddTextModal(false)}
          onSave={(text) => handleAddBlock('text', { text })}
        />
        <FlowBuilderAddImgModal
          open={openAddImgModal}
          onClose={() => setOpenAddImgModal(false)}
          onSave={(url) => handleAddBlock('image', { url })}
        />
        <FlowBuilderAddAudioModal
          open={openAddAudioModal}
          onClose={() => setOpenAddAudioModal(false)}
          onSave={(url) => handleAddBlock('audio', { url })}
        />
        <FlowBuilderAddTicketModal
          open={openAddTicketModal}
          onClose={() => setOpenAddTicketModal(false)}
          onSave={(data) => handleAddBlock('ticket', data)}
        />
      </Box>
    </Modal>
  );
};
