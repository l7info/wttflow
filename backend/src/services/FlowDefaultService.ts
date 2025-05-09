import { Injectable } from '@nestjs/common';
import { Flow } from '../models/flow.model';

@Injectable()
export class FlowDefaultService {
  private defaultFlow: Flow | null = null;

  constructor() {}

  getDefaultFlow(): Flow | null {
    return this.defaultFlow;
  }

  updateDefaultFlow(flow: Flow): Flow {
    this.defaultFlow = flow;
    return flow;
  }

  resetDefaultFlow(): void {
    this.defaultFlow = null;
  }

  isDefaultFlowSet(): boolean {
    return this.defaultFlow !== null;
  }

  getDefaultFlowBlocks(): Flow['blocks'] {
    return this.defaultFlow?.blocks || [];
  }
}
