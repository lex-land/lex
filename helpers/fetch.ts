import { ENV } from '@config/env';
import { FetchError } from '@config/error';
import codeMessages from '@config/code.json';
import { engine } from './url';
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
    const json: FetchResponse<D> = await result.clone().json();
    logger.info(`[ ${options.method} ] ${api}`, json);
    // 身份过期
    if (json.code === -2) {
      // expire();
    }
    if (json.code !== 1) {
      if (process.env.NODE_ENV === 'production') {
        throw new FetchError(json.code, (codeMessages as any)[json.code]);
      } else {
        throw new FetchError(
          json.code,
          `[ ${options.method} ${api} ] ${JSON.stringify(json)}`,
        );
      }
    }
    return json;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw new FetchError(error.code, (codeMessages as any)[error.code]);
    } else {
      throw error;
    }
  }
}

export async function getLocal<D = any>(url: string, query: any = {}) {
  const fullUrl = `${url}?${qs.stringify(query)}`;
  const json: FetchResponse<D> = await fetch(fullUrl);
  return json;
}

export async function get<D = any>(url: string, query: any = {}) {
  let fullUrl = `${url}?${qs.stringify(query)}`;
  if (url.startsWith('/apis')) {
    fullUrl = engine`${url.replace('/apis', '')}` + `?${qs.stringify(query)}`;
  }
  const json: FetchResponse<D> = await fetch(fullUrl);
  return json;
}

export async function post<D = any>(url: string, query: any = {}) {
  let fullUrl = `${url}`;
  if (url.startsWith('/apis')) {
    fullUrl = engine`${url.replace('/apis', '')}`;
  }
  const opt = {
    method: 'POST',
    body: JSON.stringify(query),
  };
  const json: FetchResponse<D> = await fetch(fullUrl, opt);
  return json;
}
