import CONSTANTS from '@config/constants';
import Cookies from 'universal-cookie';
import createDes from '@core/createDes';
import md5 from 'md5';

const ENV = {
  DES: { Key: '666', Iv: '666' },
  isEncrypted: 0,
  md5Key: '666',
};

export const Des = createDes(ENV.DES);

// admin
// UDuNlDebtWg=
export const passwordEncode = (p: string) => decodeURIComponent(Des.encrypt(p));

export const signEncode = (form: any) => {
  if (!ENV.md5Key) {
    throw new Error('请检查.env环境变量配置文件！no md5Key');
  }
  const key = ENV.md5Key;
  const { params, timeStamp, randomNum } = form;
  return md5(params + ENV.isEncrypted + timeStamp + randomNum + md5(key));
};

export const paramsEncode = (params: object) => {
  const paramsString = JSON.stringify(params);
  if (ENV.isEncrypted) {
    return Des.encrypt(paramsString);
  }
  return paramsString;
};

export const getCookie = (key: string, ctx: any = {}) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  return cookie.get(Des.encrypt(key));
};

export const getToken = (ctx: any = {}) => {
  return (
    (ctx.req && ctx.req.headers.authorization) ||
    getCookie(CONSTANTS.KEYOF_TOKEN, ctx)
  );
};

export const setToken = (token: string, ctx: any = {}) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  cookie.set(Des.encrypt(CONSTANTS.KEYOF_TOKEN), token, { path: '/' });
};

export const cleanToken = (ctx: any = {}) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  cookie.set(Des.encrypt(CONSTANTS.KEYOF_TOKEN), '', { path: '/' });
};
