import { DES, ENV, isEncrypted, md5Key } from '@config/env';
import Cookies from 'universal-cookie';
import CryptoJS from 'crypto-js';
import md5 from 'md5';

const tripledes = CryptoJS.TripleDES;
const IV = CryptoJS.enc.Utf8.parse(DES.Iv || 'xxx');
const KEY = CryptoJS.enc.Utf8.parse(DES.Key || 'xxx');

export const Des = {
  encrypt(message: string | null) {
    const result = tripledes.encrypt(message || '', KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encodeURIComponent(result as any);
  },
  decrypt(message: string | null) {
    const encryptedMessage: any = {
      ciphertext: CryptoJS.enc.Base64.parse(decodeURIComponent(message || '')),
    };
    const result = tripledes.decrypt(encryptedMessage, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return result.toString(CryptoJS.enc.Utf8);
  },
};

// admin
// UDuNlDebtWg=
export const passwordEncode = (p: string) => decodeURIComponent(Des.encrypt(p));

export const signEncode = (form: any) => {
  if (!md5Key) {
    throw new Error('请检查.env环境变量配置文件！no md5Key');
  }
  const key = md5Key;
  const { params, timeStamp, randomNum } = form;
  return md5(params + isEncrypted + timeStamp + randomNum + md5(key));
};

export const paramsEncode = (params: object) => {
  const paramsString = JSON.stringify(params);
  if (isEncrypted) {
    return Des.encrypt(paramsString);
  }
  return paramsString;
};

export const getCookie = (key: string, ctx?: any) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  return cookie.get(Des.encrypt(key));
};

export const getToken = (ctx: any = {}) => {
  return (
    (ctx.req && ctx.req.headers.authorization) ||
    getCookie(ENV.KEYOF_TOKEN, ctx)
  );
};

export const setToken = (token: string, ctx: any = {}) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  cookie.set(Des.encrypt(ENV.KEYOF_TOKEN), token, { path: '/' });
};

export const cleanToken = (ctx: any = {}) => {
  const cookie = ctx.req ? new Cookies(ctx.req.headers.cookie) : new Cookies();
  cookie.set(Des.encrypt(ENV.KEYOF_TOKEN), '', { path: '/' });
};
