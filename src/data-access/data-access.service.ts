import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { parse } from 'pg-connection-string';
import { Connection } from 'typeorm';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.getConnectionOptions();
  }

  getConnectionOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.config.get('DATABASE_URL');
    const sslConfig = this.envString(
      { ssl: { rejectUnauthorized: false } },
      {},
    );
    const commonConnectionConfig: Partial<TypeOrmModuleOptions> = {
      type: 'postgres',
      synchronize: this.envString(false, true),
      logging: false,
      entities: [join(global.appRoot, '**', '*.entity.{ts,js}')],
      migrations: [join(global.appRoot, '**', 'migrations', '**', '*.{ts,js}')],
      cli: {
        entitiesDir: join(global.appRoot, '**', 'entities'),
        migrationsDir: join(global.appRoot, '**', 'migrations'),
        subscribersDir: join(global.appRoot, '**', 'subscribers'),
      },
      ...sslConfig,
    };

    if (!databaseUrl) {
      return {
        host: '',
        port: 5432,
        username: '',
        password: '',
        database: '',
        ...commonConnectionConfig,
      } as TypeOrmModuleOptions;
    }

    const connectionOptions = parse(databaseUrl);
    const typeOrmOptions = {
      host: connectionOptions.host,
      port: parseInt(connectionOptions.port),
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      ...commonConnectionConfig,
    } as TypeOrmModuleOptions;

    return typeOrmOptions;
  }

  envString = (prodString: any, devString: any) => {
    return process.env.NODE_ENV === 'production' ? prodString : devString;
  };
}

@Injectable()
export class DataAccessService {
  constructor(private connection: Connection) {}

  async findAll(Entity: any) {
    const repository = this.connection.getRepository(Entity);
    const result = await repository.find();
    return result;
  }
}
