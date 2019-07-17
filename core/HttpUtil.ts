import { FetchError } from './FetchError';
import constants from '@/config/constants';
import fetch from 'isomorphic-fetch';
import { logger } from './logger';
import qs from 'qs';

const defaultOption = {
  protocol: 'http',
  host: 'localhost',
  port: '3001',
  token: '',
};

type createHttpUtilOption = Partial<typeof defaultOption>;

export const createHttpUtil = (
  createOption: createHttpUtilOption = defaultOption,
) => {
  const { protocol, host, port, token } = {
    ...defaultOption,
    ...createOption,
  };

  const createFetch = (method: string) =>
    async function<D = any>(url: string, body: any = {}): Promise<D> {
      const opt = {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        } as any,
      };

      const IS_GET = method === 'GET';

      if (!opt.headers.Authorization) {
        delete opt.headers.Authorization;
      }
      if (IS_GET) {
        delete opt.body;
      }

      const query = IS_GET && `?${qs.stringify(body)}`;
      const fullUrl = `${protocol}://${host}:${port}${url}${query}`;

      // 处理参数params
      logger.info(`[ ${opt.method} ] fetching...`);
      const result = await fetch(fullUrl, opt);
      const json = await result.clone().json();

      logger.info(`[ ${opt.method} ]`, json);
      if (constants.CATCHED_CODE.includes(json.statusCode)) {
        throw new FetchError(json.statusCode);
      }
      return json;
    };

  return {
    get: createFetch('GET'),
    post: createFetch('POST'),
    put: createFetch('PUT'),
    delete: createFetch('DELETE'),
  };
};
