import 'reflect-metadata';

// TypeORM types
declare module 'typeorm' {
  export interface ConnectionOptions {
    type: 'postgres';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging: boolean | string[];
    entities: string[];
    migrations: string[];
    subscribers: string[];
    ssl?: boolean | { rejectUnauthorized: boolean };
    extra?: { poolSize?: number };
  }

  export function createConnection(options: ConnectionOptions): Promise<any>;

  export interface Repository<T> {
    save(entity: T): Promise<T>;
    save(entities: T[]): Promise<T[]>;
    find(): Promise<T[]>;
    find(options: { where: any }): Promise<T[]>;
    findOne(id: string): Promise<T | null>;
    findOne(options: { where: any }): Promise<T | null>;
    update(id: string, partialEntity: Partial<T>): Promise<any>;
    update(where: any, partialEntity: Partial<T>): Promise<any>;
    delete(id: string): Promise<{ affected: number }>;
    delete(where: any): Promise<{ affected: number }>;
  }

  export interface EntityRepository<T> extends Repository<T> {}

  export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export function Entity(): ClassDecorator;
  export function Column(options?: { type?: string, nullable?: boolean, default?: any }): PropertyDecorator;
  export function PrimaryGeneratedColumn(strategy?: 'increment' | 'uuid'): PropertyDecorator;
  export function CreateDateColumn(): PropertyDecorator;
  export function UpdateDateColumn(): PropertyDecorator;
  export function ManyToOne<T>(type: new () => T): PropertyDecorator;
  export function OneToMany<T>(type: new () => T, inverseSide: string): PropertyDecorator;
}

// Extend the global namespace to include TypeORM types
declare global {
  namespace NodeJS {
    interface Global {
      __typeorm_metadata__: any;
    }
  }
}

// Sequelize types
declare module 'sequelize' {
  interface Model {
    id?: string | number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    isNewRecord?: boolean;
    where?: any;
    sequelize?: any;
    modelName?: string;
    tableName?: string;
    primaryKey?: string;
    primaryKeyField?: string;
    primaryKeyVal?: any;
  }

  interface ModelStatic extends Function {
    new (): Model;
    init(attributes: object, options: object): void;
  }
}

// Extend the global namespace to include Sequelize and TypeORM types
declare global {
  namespace NodeJS {
    interface Global {
      __sequelize_metadata__: any;
      __typeorm_metadata__: any;
    }
  }
}
