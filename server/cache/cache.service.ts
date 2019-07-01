import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common';
import constants from '@config/constants';
import { logger } from '@core/logger';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: CacheStore) {}
  async get(key: keyof typeof constants.CACHE) {
    const result: any = await this.cache.get(key);
    try {
      return JSON.parse(result);
    } catch (error) {
      logger.error(error);
      return undefined;
    }
  }

  async set(key: keyof typeof constants.CACHE, value: any) {
    return this.cache.set(key, JSON.stringify(value));
  }
}
