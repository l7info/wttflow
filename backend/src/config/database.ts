import "../bootstrap";

export const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'whaticket',
  synchronize: false,
  logging: process.env.DB_DEBUG === 'true',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '/subscriber/**/*{.ts,.js}'],
};

// Exporta a configuração do TypeORM
export const typeormConfig = {
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  synchronize: databaseConfig.synchronize,
  logging: databaseConfig.logging,
  entities: databaseConfig.entities,
  migrations: databaseConfig.migrations,
  subscribers: databaseConfig.subscribers,
  extra: {
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : false
  }
};
