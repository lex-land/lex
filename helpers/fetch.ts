import { CATCHED_CODE } from '@components/errors';
import { ENV } from '@config/env';
import { FetchError } from '@config/error';
import { NextContext } from 'next';
import codeMessages from '@config/code.json';
import { getCookie } from './secure';
import isomorphicFetch from 'isomorphic-fetch';
import { logger } from '@core/logger';
import qs from 'qs';

export type Code = keyof typeof codeMessages;

export interface FetchResponse<D> {
  code: number;
  data: D;
  msg: string;
}

let token: string;

export const getToken = () => token || getCookie(ENV.KEYOF_TOKEN);
export const setToken = (t: string) => {
  token = t;
};

export async function fetch<D = any>(api: string, opts?: RequestInit) {
  // 处理URL
  const url = api.startsWith('/') ? `${ENV.SUNMI_PROD_URL}${api}` : api;
  const options = {
    method: 'GET',
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
      ...(opts ? opts.headers : {}),
    },
  };
  if (!options.headers.Authorization) {
    delete options.headers.Authorization;
  }
  // 处理参数params
  logger.info(`[ ${options.method} ] ${api} fetching...`);

  const result = await isomorphicFetch(`${url}`, options);
  const json = await result.clone().json();
  logger.info(`[ ${options.method} ] ${api}`, json);
  if (CATCHED_CODE.includes(json.statusCode)) {
    throw new FetchError(json.statusCode);
  }
  return json;
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

export const createHttp = (ctx: NextContext) => {
  const token = ctx.getToken();
  setToken(token); // 在Component.getInitialProps之前执行，为服务端发送http请求时提供身份
  return http;
};
