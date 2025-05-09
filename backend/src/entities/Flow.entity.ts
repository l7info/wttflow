import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { FlowBlock } from '../models/flow.model';
import { FlowConnection } from '../models/flow.model';

@Entity('flows')
export class Flow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('jsonb')
  blocks: FlowBlock[];

  @Column('jsonb')
  connections: FlowConnection[];

  @Column({ 
    type: 'enum', 
    enum: ['active', 'inactive', 'draft'], 
    default: 'draft' 
  })
  status: 'active' | 'inactive' | 'draft';

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastExecutedAt: Date;

  @Column({ type: 'integer', default: 0 })
  executionCount: number;

  @Column({ type: 'integer', default: 0 })
  errorCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
