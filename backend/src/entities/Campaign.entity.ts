import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Flow } from './Flow.entity';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Flow, flow => flow.campaigns)
  flow: Flow;

  @Column('jsonb', { nullable: true })
  schedule: any;

  @Column({ type: 'enum', enum: ['pending', 'running', 'completed', 'failed'], default: 'pending' })
  status: 'pending' | 'running' | 'completed' | 'failed';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
