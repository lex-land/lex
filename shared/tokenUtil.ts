import { createCookieUtil } from './cookieUtil';

const KEYOF_TOKEN = 'KEYOF_TOKEN';

export const createTokenUtil = (ctx: any = {}) => {
  return {
    set: (token: string) => createCookieUtil(ctx).set(KEYOF_TOKEN, token),
    get: () =>
      (ctx.req && ctx.req.headers.authorization) ||
      createCookieUtil(ctx).get(KEYOF_TOKEN),
    clear: () => createCookieUtil(ctx).set(KEYOF_TOKEN, ''),
  };
};
