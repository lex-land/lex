import fetch from 'isomorphic-fetch';
import { logger } from './logger';

type createFetchResolver = (
  api: string,
  requestInit: any,
) => { fullUrl: string; opt: any };

const createFetch = (resolve: createFetchResolver) => {
  return async function<D = any>(api: string, body: any = {}): Promise<D> {
    const { fullUrl, opt } = resolve(api, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!opt.headers.Authorization) {
      delete opt.headers.Authorization;
    }

    logger.info(`[ ${opt.method} ] ${fullUrl} fetching...`);
    const result = await fetch(encodeURI(fullUrl), opt);

    const json = await result.clone().json();
    logger.info(`[ ${opt.method} ] ${fullUrl} fetched`, json);
    return json;
  };
};

const defaultHttpHelperOption = {
  url: '',
  token: '',
};

type createHttpHelperOption = Partial<typeof defaultHttpHelperOption>;

export const createHttpUtil = (createOption: createHttpHelperOption) => {
  const { url, token } = { ...defaultHttpHelperOption, ...createOption };
  return {
    get: createFetch((fullUrl, opt) => {
      delete opt.body;
      opt.method = 'GET';
      opt.headers.Authorization = token;
      fullUrl = `${url}${fullUrl}`;
      return { fullUrl, opt };
    }),
    post: createFetch((fullUrl, opt) => {
      opt.method = 'POST';
      fullUrl = `${url}${fullUrl}`;
      opt.headers.Authorization = token;
      return { fullUrl, opt };
    }),
    put: createFetch((fullUrl, opt) => {
      opt.method = 'PUT';
      opt.headers.Authorization = token;
      fullUrl = `${url}${fullUrl}`;
      return { fullUrl, opt };
    }),
    delete: createFetch((fullUrl, opt) => {
      opt.method = 'DELETE';
      fullUrl = `${url}${fullUrl}`;
      opt.headers.Authorization = token;
      return { fullUrl, opt };
    }),
  };
};
