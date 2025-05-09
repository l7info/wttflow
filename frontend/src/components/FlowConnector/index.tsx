import React from 'react';
import { Box, useTheme } from '@mui/material';

interface FlowConnectorProps {
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
}

export const FlowConnector: React.FC<FlowConnectorProps> = ({ from, to }) => {
  const theme = useTheme();

  const connectorStyle = {
    position: 'absolute',
    pointerEvents: 'none',
  };

  const calculatePath = (fromX: number, fromY: number, toX: number, toY: number) => {
    const x1 = fromX;
    const y1 = fromY;
    const x2 = toX;
    const y2 = toY;

    // Adicionar um ponto de controle para criar uma curva suave
    const controlX = (x1 + x2) / 2;
    const controlY = (y1 + y2) / 2;

    return `M${x1},${y1} Q${controlX},${controlY} ${x2},${y2}`;
  };

  return (
    <Box sx={connectorStyle}>
      <svg width="100%" height="100%">
        <path
          d={calculatePath(from.x, from.y, to.x, to.y)}
          stroke={theme.palette.primary.main}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};
