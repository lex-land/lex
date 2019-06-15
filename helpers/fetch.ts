import { CATCHED_CODE } from '@components/errors';
import { ENV } from '@config/env';
import { FetchError } from '@config/error';
import codeMessages from '@config/code.json';
import { getToken } from '@helpers/token';
import isomorphicFetch from 'isomorphic-fetch';
import { logger } from '@core/logger';
import qs from 'qs';

export type Code = keyof typeof codeMessages;

export interface FetchResponse<D> {
  code: number;
  data: D;
  msg: string;
}

export async function fetch<D = any>(api: string, opts?: RequestInit) {
  // 处理URL
  const url = api.startsWith('/') ? `${ENV.SUNMI_PROD_URL}${api}` : api;
  const token = getToken();
  const options = {
    method: 'GET',
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      ...(opts ? opts.headers : {}),
    },
  };
  if (!options.headers.Authorization) {
    delete options.headers.Authorization;
  }
  // 处理参数params
  logger.info(`[ ${options.method} ] ${api} fetching...`);

  const result = await isomorphicFetch(`${url}`, options);
  try {
    const json = await result.clone().json();
    logger.info(`[ ${options.method} ] ${api}`, json);
    if (CATCHED_CODE.includes(json.statusCode)) {
      throw new FetchError(json.statusCode);
    }
    return json;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw new FetchError(500, error.message);
    } else {
      throw error;
    }
  }
}

const createHttpUtil = (method: string) => {
  return async function<D = any>(url: string, query: any = {}): Promise<D> {
    let fullUrl = url;
    const opt = {
      method,
      body: JSON.stringify(query),
    };
    if (method === 'GET') {
      fullUrl = `${url}?${qs.stringify(query)}`;
      delete opt.body;
    }
    const json = await fetch(fullUrl, opt);
    return json;
  };
};

export const http = {
  get: createHttpUtil('GET'),
  post: createHttpUtil('POST'),
  put: createHttpUtil('PUT'),
  delete: createHttpUtil('DELETE'),
};
