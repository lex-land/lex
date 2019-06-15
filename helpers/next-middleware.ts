import { NextAppContext } from 'next/app';
import { NextContext } from 'next';
import { createHttp } from './fetch';
import { createRedirect } from './next-routes';
import { getToken } from './secure';

export interface PageProps {
  // 🙅‍♂️不可修改
  readonly statusCode: number;
  token: string;
  [key: string]: any;
}

const createAuthorized = (ctx: NextContext) => {
  return async () => {
    try {
      const { statusCode } = await ctx.http.get(`/api/session`);
      return statusCode !== 401;
    } catch (error) {
      return false;
    }
  };
};

export const enhanceNextMiddware = (
  callback: (
    ctx: NextAppContext,
    pageProps: PageProps,
  ) => Promise<any> = async v => v,
) => async (appCtx: NextAppContext) => {
  const { Component, ctx } = appCtx;
  ctx.getToken = () => getToken(ctx);
  ctx.http = createHttp(ctx);
  ctx.redirect = createRedirect(ctx);
  ctx.authorized = createAuthorized(ctx);

  // 初始化页面参数
  let pageProps = {
    token: '',
    statusCode: (ctx.res && ctx.res.statusCode) || 200,
  };
  if (Component.getInitialProps) {
    try {
      pageProps = Object.assign(
        pageProps,
        await Component.getInitialProps(ctx),
      );
    } catch (error) {
      pageProps.statusCode = error.code || 500;
      pageProps = Object.assign(pageProps, error);
    }
  }
  callback(appCtx, pageProps);
  return { pageProps };
};
