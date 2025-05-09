import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowBuilderService } from './services/FlowBuilderService';
import { FlowCampaignService } from './services/FlowCampaignService';
import { FlowDefaultService } from './services/FlowDefaultService';
import { Flow } from './entities/Flow.entity';
import { Campaign } from './entities/Campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'whaticket',
      synchronize: false,
      logging: false,
      entities: [Flow, Campaign],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      subscribers: [__dirname + '/subscriber/**/*{.ts,.js}'],
    }),
  ],
  providers: [FlowBuilderService, FlowCampaignService, FlowDefaultService],
  exports: [FlowBuilderService, FlowCampaignService, FlowDefaultService],
})
export class AppModule {}
