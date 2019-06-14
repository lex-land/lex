export const envLocalConf = {
  SUNMI_DEVELOPMENT_MD5KEY: '666',
  SUNMI_PRODUCTION_MD5KEY: '666',
  SUNMI_DEVELOPMENT_DESIV: '666',
  SUNMI_DEVELOPMENT_DESKEY: '666',
  SUNMI_PRODUCTION_DESIV: '666',
  SUNMI_PRODUCTION_DESKEY: '666',
};

export const ENV = {
  CACHE_TTL: process.env.CACHE_TTL,
  SUNMI_PROD_URL: process.env.SUNMI_PROD_URL,
  SUNMI_MONGODB_URL: process.env.SUNMI_MONGODB_URL,
  PORT: process.env.PORT || 3000,
  SUNMI_ENV: process.env.SUNMI_ENV || process.env.SUNMI_DEFAULTHOST || 'test',
  BUILD_TAG: process.env.BUILD_TAG || 'test',
  KEYOF_TOKEN: 'accessToken',
};

export const SUNMI_ENV = process.env.SUNMI_ENV || process.env.SUNMI_DEFAULTHOST;
export const isServer = typeof window === 'undefined';
export const isClient = !isServer;

export interface EnvUtils {
  // 是否加密
  isEncrypted: number;
  envHost: (host: string) => string;
  md5Key: string | undefined;
  DES: { Iv: string | undefined; Key: string | undefined };
}

export function createEnvUtils(env?: string): EnvUtils {
  switch (env) {
    case 'dev':
    case 'test':
      return {
        envHost: (host: string) => `https://${env}.${host}`,
        isEncrypted: 0,
        md5Key: envLocalConf.SUNMI_DEVELOPMENT_MD5KEY,
        DES: {
          Iv: envLocalConf.SUNMI_DEVELOPMENT_DESIV,
          Key: envLocalConf.SUNMI_DEVELOPMENT_DESKEY,
        },
      };
    case 'uat':
      return {
        envHost: (host: string) => `https://${env}.${host}`,
        isEncrypted: 1,
        md5Key: envLocalConf.SUNMI_PRODUCTION_MD5KEY,
        DES: {
          Iv: envLocalConf.SUNMI_PRODUCTION_DESIV,
          Key: envLocalConf.SUNMI_PRODUCTION_DESKEY,
        },
      };
    case 'pub':
    case 'master':
    case 'release':
      return {
        envHost: (host: string) => `https://${host}`,
        isEncrypted: 1,
        md5Key: envLocalConf.SUNMI_PRODUCTION_MD5KEY,
        DES: {
          Iv: envLocalConf.SUNMI_PRODUCTION_DESIV,
          Key: envLocalConf.SUNMI_PRODUCTION_DESKEY,
        },
      };
    default:
      return {
        envHost: (host: string) => `https://${env}.${host}`,
        isEncrypted: 0,
        md5Key: envLocalConf.SUNMI_DEVELOPMENT_MD5KEY,
        DES: {
          Iv: envLocalConf.SUNMI_DEVELOPMENT_DESIV,
          Key: envLocalConf.SUNMI_DEVELOPMENT_DESKEY,
        },
      };
  }
}

const { envHost, isEncrypted, md5Key, DES } = createEnvUtils(SUNMI_ENV);

export { envHost, isEncrypted, md5Key, DES };
