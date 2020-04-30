import Cookies from 'universal-cookie';
import { NextPageContext } from 'next';
import md5 from 'md5';

export const createCookieHelper = (ctx?: NextPageContext) => {
  const cookie =
    ctx && ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  return {
    get: (key: string) => {
      return cookie.get(md5(key));
    },
    set: (key: string, value: any) => {
      cookie.set(md5(key), value, { path: '/' });
    },
  };
};
