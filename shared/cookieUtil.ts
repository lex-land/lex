import Cookies from 'universal-cookie';
import { Des } from './Des';

export const createCookieUtil = (ctx: any = {}) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  return {
    get: (key: string) => {
      return cookie.get(Des.encrypt(key));
    },
    set: (key: string, value: any) => {
      cookie.set(Des.encrypt(key), value, { path: '/' });
    },
  };
};
