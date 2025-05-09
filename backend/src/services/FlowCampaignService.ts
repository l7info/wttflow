import { Injectable } from '@nestjs/common';
import { Flow } from '../models/flow.model';
import { Campaign } from '../models/campaign.model';

@Injectable()
export class FlowCampaignService {
  private campaigns: Campaign[] = [];

  constructor() {}

  createCampaign(data: Partial<Campaign>): Campaign {
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: data.name || 'Nova Campanha',
      description: data.description || '',
      flowId: data.flowId,
      schedule: data.schedule || null,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.campaigns.push(campaign);
    return campaign;
  }

  updateCampaign(campaignId: string, data: Partial<Campaign>): Campaign | null {
    const campaignIndex = this.campaigns.findIndex(c => c.id === campaignId);
    if (campaignIndex === -1) return null;

    const updatedCampaign = { ...this.campaigns[campaignIndex], ...data, updatedAt: new Date() };
    this.campaigns[campaignIndex] = updatedCampaign;
    return updatedCampaign;
  }

  deleteCampaign(campaignId: string): boolean {
    const campaignIndex = this.campaigns.findIndex(c => c.id === campaignId);
    if (campaignIndex === -1) return false;

    this.campaigns.splice(campaignIndex, 1);
    return true;
  }

  getCampaign(campaignId: string): Campaign | null {
    return this.campaigns.find(c => c.id === campaignId) || null;
  }

  listCampaigns(): Campaign[] {
    return [...this.campaigns];
  }

  async executeCampaign(campaignId: string): Promise<boolean> {
    const campaign = this.getCampaign(campaignId);
    if (!campaign || campaign.status !== 'pending') return false;

    // Aqui implementar a lógica de execução da campanha
    // usando o fluxo associado
    
    return true;
  }
}
