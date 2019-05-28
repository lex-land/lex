import { EnvUtils } from '@config/env';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { logger } from '@core/logger';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  public readonly envUtils: EnvUtils;
  private readonly envConfig: EnvConfig;

  constructor() {
    // this.envConfig = this.validateConfig(envConf);
    // this.envUtils = createEnvUtils(this.envConfig.SUNMI_ENV);
  }

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
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
    };
  }

  public getEnvConfig(key: string): string {
    return this.envConfig[key];
  }

  private validateConfig(envConfig: EnvConfig) {
    logger.info(envConfig);
    // const envSchema = Joi.object({
    // CACHE_TTL: Joi.number().default(50),
    // SUNMI_ENV: Joi.string().default('test'),
    // //  # 加密相关
    // //  # MD5Key
    // SUNMI_DEVELOPMENT_MD5KEY: Joi.string().default('xxx'),
    // SUNMI_PRODUCTION_MD5KEY: Joi.string().default('xxx'),
    // //  # DES的key、iv
    // SUNMI_DEVELOPMENT_DESIV: Joi.string().default('xxx'),
    // SUNMI_DEVELOPMENT_DESKEY: Joi.string().default('xxx'),
    // SUNMI_PRODUCTION_DESIV: Joi.string().default('xxx'),
    // SUNMI_PRODUCTION_DESKEY: Joi.string().default('xxx'),
    // // TYPEORM
    // TYPEORM_CONNECTION: Joi.string().default('xxx'),
    // TYPEORM_HOST: Joi.string().default('xxx'),
    // TYPEORM_USERNAME: Joi.string().default('xxx'),
    // TYPEORM_PASSWORD: Joi.string().default('xxx'),
    // TYPEORM_DATABASE: Joi.string().default('xxx'),
    // TYPEORM_PORT: Joi.string().default('xxx'),
    // TYPEORM_SYNCHRONIZE: Joi.string().default('xxx'),
    // TYPEORM_LOGGING: Joi.string().default('xxx'),
    // TYPEORM_ENTITIES: Joi.string().default('xxx'),
    // });
    // const { error, value } = Joi.validate(envConfig, envSchema);
    // if (error) {
    //   throw new Error(`Config validation error: ${error.message}`);
    // }
    // return value;
  }
}
