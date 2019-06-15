import { EnvUtils } from '@config/env';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { logger } from '@core/logger';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  public readonly envUtils: EnvUtils;
  private readonly envConfig: EnvConfig;

  constructor() {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.MYSQL_URL || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWD || '123456',
      database: process.env.MYSQL_DATABASE || 'Lex',
      // https://github.com/typeorm/typeorm/issues/682
      entities: [__dirname + '/../**/**.entity{.ts,.js}'],
      // debug: true,
      // dropSchema: true,
      synchronize: false,
      logging: true,
    };
  }

  public getEnvConfig(key: string): string {
    return this.envConfig[key];
  }

  private validateConfig(envConfig: EnvConfig) {
    logger.info(envConfig);
  }
}
