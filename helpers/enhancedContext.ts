import { createAppProps, createPageProps } from '@/shared/PageProps';
import { API_URL } from '@/config/apiUrl';
import Router from 'next/router';
import { createHttpUtil } from '@/shared/httpUtil';
import { createTokenUtil } from '@/helpers/tokenHelper';
import { logger } from '@/shared/logger';

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
  ctx.httpHelper = createHttpUtil({
    url: API_URL,
    token: ctx.tokenUtil.get(),
  });

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
