import { getRepository } from 'typeorm';
import { Flow as FlowEntity } from '../entities/Flow.entity';

export class FlowBuilderService {
  constructor() {}

  async createFlow(data: Partial<FlowEntity>): Promise<FlowEntity> {
    const flowRepository = getRepository(FlowEntity);
    const flow: FlowEntity = {
      id: Date.now().toString(),
      name: data.name || 'Novo Fluxo',
      description: data.description || '',
      blocks: data.blocks || [],
      connections: data.connections || [],
      status: 'draft',
      lastExecutedAt: null,
      executionCount: 0,
      errorCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await flowRepository.save(flow);
  }

  async updateFlow(flowId: string, data: Partial<FlowEntity>): Promise<FlowEntity | null> {
    const flowRepository = getRepository(FlowEntity);
    const flow = await flowRepository.findOne(flowId);
    
    if (!flow) return null;

    const updatedFlow = { ...flow, ...data, updatedAt: new Date() };
    return await flowRepository.save(updatedFlow);
  }

  async deleteFlow(flowId: string): Promise<boolean> {
    const flowRepository = getRepository(FlowEntity);
    const result = await flowRepository.delete(flowId);
    return result.affected > 0;
  }

  async getFlow(flowId: string): Promise<FlowEntity | null> {
    const flowRepository = getRepository(FlowEntity);
    return await flowRepository.findOne(flowId);
  }

  async listFlows(): Promise<FlowEntity[]> {
    const flowRepository = getRepository(FlowEntity);
    return await flowRepository.find();
  }

  async addBlockToFlow(flowId: string, block: any): Promise<FlowEntity | null> {
    const flow = await this.getFlow(flowId);
    if (!flow) return null;

    return await this.updateFlow(flowId, {
      blocks: [...(flow.blocks || []), block]
    });
  }
}
