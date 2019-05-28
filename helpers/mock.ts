import { FetchResponse } from '@helpers/fetch';
import fetch from 'isomorphic-fetch';
import { logger } from '@core/logger';
import path from 'path';

export const fetchMock = async (url: string, opts?: RequestInit) => {
  const SUNMI_RAP_SERVER = `rapserver.sunmi.com/app/mock/data`;
  const { method = 'GET' } = opts || {};
  logger.info(`[ Mock GET ] ${url}`);
  const rapURL = path.join(SUNMI_RAP_SERVER, method, encodeURIComponent(url));
  const json = await fetch(`http://${rapURL}`, opts as any).then(res =>
    res.json(),
  );
  logger.info(`[ Mock GET ] ${url} }`, json);
  return json;
};

export function mock<D = any>(
  url: string,
  query: any = {},
): Promise<FetchResponse<D>> {
  return fetchMock(url.replace('/apis', ''), {});
}
