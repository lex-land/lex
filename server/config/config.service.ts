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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      // https://github.com/typeorm/typeorm/issues/682
      entities: [__dirname + '/../**/**.entity{.ts,.js}'],
      // TODO: 整理出分环境的配置
      synchronize: true,
      logging: false,
    };
  }

  public getEnvConfig(key: string): string {
    return this.envConfig[key];
  }

  private validateConfig(envConfig: EnvConfig) {
    logger.info(envConfig);
  }
}
