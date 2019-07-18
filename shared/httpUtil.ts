import { createTokenUtil } from './tokenUtil';
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

      const reqUrl = `${protocol}://${host}:${port}${url}`;
      const fullUrl = IS_GET ? `${reqUrl}?${qs.stringify(body)}` : reqUrl;

      // 处理参数params
      logger.info(`[ ${opt.method} ] ${fullUrl} fetching...`);
      const result = await fetch(fullUrl, opt);
      const json = await result.clone().json();

      logger.info(`[ ${opt.method} ] ${fullUrl} fetched`, json);
      return json;
    };

  return {
    get: createFetch('GET'),
    post: createFetch('POST'),
    put: createFetch('PUT'),
    delete: createFetch('DELETE'),
  };
};
const httpUtil = createHttpUtil({ token: createTokenUtil().get() });
export default httpUtil;
