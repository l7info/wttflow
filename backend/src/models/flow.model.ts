export interface FlowBlock {
  id: string;
  type: 'text' | 'image' | 'audio' | 'ticket' | 'condition' | 'randomizer';
  data: {
    [key: string]: any;
  };
  position?: {
    x: number;
    y: number;
  };
}

export interface FlowConnection {
  source: string;
  target: string;
  conditions?: {
    type: 'equals' | 'contains' | 'regex';
    value: string;
  };
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  blocks: FlowBlock[];
  connections: FlowConnection[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'draft';
  lastExecutedAt?: Date;
  executionCount: number;
  errorCount: number;
}
