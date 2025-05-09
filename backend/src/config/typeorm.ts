import { createConnection } from 'typeorm';
import { typeormConfig } from './database';

export const initializeTypeORM = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: typeormConfig.host,
      port: typeormConfig.port,
      username: typeormConfig.username,
      password: typeormConfig.password,
      database: typeormConfig.database,
      synchronize: typeormConfig.synchronize,
      logging: typeormConfig.logging,
      entities: [__dirname + '/../entities/**/*{.ts,.js}'],
      migrations: typeormConfig.migrations,
      subscribers: typeormConfig.subscribers,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : false,
      extra: {
        poolSize: 10
      }
    });
    console.log('TypeORM has been initialized successfully!');
    return connection;
  } catch (error) {
    console.error('Error during TypeORM initialization:', error);
    throw error;
  }
};
