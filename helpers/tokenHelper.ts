import { NextPageContext } from 'next';
import { createCookieHelper } from './cookieHelper';

const KEYOF_TOKEN = 'KEYOF_TOKEN';

export const createTokenUtil = (ctx?: NextPageContext) => {
  return {
    set: (token: string) => createCookieHelper(ctx).set(KEYOF_TOKEN, token),
    get: () =>
      (ctx && ctx.req && ctx.req.headers.authorization) ||
      createCookieHelper(ctx).get(KEYOF_TOKEN),
    clear: () => createCookieHelper(ctx).set(KEYOF_TOKEN, ''),
  };
};
