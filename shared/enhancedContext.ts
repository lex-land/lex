import { createAppProps, createPageProps } from './PageProps';
import Router from 'next/router';
import { createHttpUtil } from './httpUtil';
import { createTokenUtil } from './tokenUtil';
import { logger } from './logger';

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

export const enhancedContext = createAppProps(async appCtx => {
  const { ctx, Component } = appCtx;
  ctx.tokenUtil = createTokenUtil(ctx); // 必须放在第一个
  ctx.redirect = createRedirect(ctx);
  ctx.httpUtil = createHttpUtil({ token: ctx.tokenUtil.get() });

  // 初始化页面参数
  let pageProps = {};
  let statusCode = (ctx.res && ctx.res.statusCode) || 200;
  if (Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (error) {
      // Component.getInitialProps 内部异常
      logger.error(error);
      statusCode = error.code || 500;
    }
  }
  return { pageProps, statusCode };
});
