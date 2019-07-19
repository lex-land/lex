import { NextPageContext } from 'next';
import { createCookieHelper } from './cookieHelper';

export const KEYOF_TOKEN = process.env.KEYOF_TOKEN || 'ACCESS_TOKEN';

export const createTokenUtil = (ctx?: NextPageContext) => {
  return {
    set: (token: string) => createCookieHelper(ctx).set(KEYOF_TOKEN, token),
    get: () =>
      (ctx && ctx.req && ctx.req.headers.authorization) ||
      createCookieHelper(ctx).get(KEYOF_TOKEN),
    clear: () => createCookieHelper(ctx).set(KEYOF_TOKEN, ''),
  };
};
