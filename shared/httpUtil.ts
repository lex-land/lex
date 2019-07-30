import { FetchError } from './FetchError';
import fetch from 'isomorphic-fetch';
import { logger } from './logger';

type createFetchResolver = (
  api: string,
  requestInit: any,
) => { fullUrl: string; opt: any };

const defaultHttpHelperOption = {
  url: '',
  token: '',
  catchedCode: [404],
  csrfTokenFrom: async () => '',
};

type createHttpHelperOption = Partial<typeof defaultHttpHelperOption>;

export const createHttpUtil = (createOption: createHttpHelperOption) => {
  const { url, token, catchedCode, csrfTokenFrom } = {
    ...defaultHttpHelperOption,
    ...createOption,
  };

  const createFetch = (resolve: createFetchResolver) => {
    return async function<D = any>(api: string, body: any = {}): Promise<D> {
      const { fullUrl, opt } = resolve(api, {
        headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': await csrfTokenFrom(),
          Authorization: token,
        },
        body: JSON.stringify(body),
      });

      if (!opt.headers.Authorization) {
        delete opt.headers.Authorization;
      }

      logger.info(`[ ${opt.method} ] ${fullUrl} fetching...`);
      const result = await fetch(encodeURI(`${url}${fullUrl}`), opt);

      const json = await result.clone().json();
      logger.info(`[ ${opt.method} ] ${fullUrl} fetched`, json);
      if (catchedCode.includes(result.status)) {
        throw new FetchError(result.status);
      }
      return json;
    };
  };

  return {
    get: createFetch((fullUrl, opt) => {
      delete opt.body;
      opt.method = 'GET';
      return { fullUrl, opt };
    }),
    post: createFetch((fullUrl, opt) => {
      opt.method = 'POST';
      return { fullUrl, opt };
    }),
    put: createFetch((fullUrl, opt) => {
      opt.method = 'PUT';
      return { fullUrl, opt };
    }),
    patch: createFetch((fullUrl, opt) => {
      opt.method = 'PATCH';
      return { fullUrl, opt };
    }),
    delete: createFetch((fullUrl, opt) => {
      opt.method = 'DELETE';
      return { fullUrl, opt };
    }),
  };
};
