import { Flow } from './flow.model';

export interface CampaignSchedule {
  startDate: Date;
  endDate?: Date;
  frequency?: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[]; // 0-6 (domingo-sábado)
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  flowId: string;
  flow?: Flow;
  schedule?: CampaignSchedule;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}
