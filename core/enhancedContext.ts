import { createAppProps, createPageProps } from './PageProps';
import { AppContext } from 'next/app';
import Router from 'next/router';
import { createHttpUtil } from './HttpUtil';
import { createTokenUtil } from './TokenUtil';

export type enhancedAppProps<T = any> = (ctx: AppContext) => T;

export const createRedirect = createPageProps(ctx => {
  return (path: string) => {
    // https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    const res = ctx.res;
    if (res) {
      res.writeHead(302, { Location: path });
      res.end();
    } else {
      Router.push(path);
    }
    return { statusCode: 302 };
  };
});

export const enhancedContext = <T>(fn: enhancedAppProps<T>) =>
  createAppProps(async appCtx => {
    const { ctx } = appCtx;
    ctx.tokenUtil = createTokenUtil(ctx); // 必须放在第一个
    ctx.redirect = createRedirect(ctx);
    ctx.httpUtil = createHttpUtil({ token: ctx.tokenUtil.get() });
    return fn(appCtx);
  });
