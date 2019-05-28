import { engine } from '@helpers/url';
import { fetch } from '@helpers/fetch';
import { getToken } from '@helpers/secure';

export const apiProxyFetchText = async (url: string, opt: any = {}) => {
  return await fetch(engine`${url}`, opt);
};

export const apiProxyResult = async (req: any, opts = {}) => {
  const authorization = req.headers.authorization;
  const token = getToken({ req }) || authorization;
  const url = req.originalUrl.replace('/apis', '');
  return await apiProxyFetchText(url, {
    method: req.method,
    headers: { Authorization: token },
    ...opts,
  });
};
