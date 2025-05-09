import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database';

// Cria uma instância única do Sequelize
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  logging: databaseConfig.logging,
  define: {
    timestamps: true,
    underscored: true,
  },
  modelPaths: [
    __dirname + '/../models',
    __dirname + '/../entities'
  ]
});

// Exporta a instância do Sequelize
export default sequelize;

// Exporta a instância do Sequelize para uso em models e entities
export { sequelize };
