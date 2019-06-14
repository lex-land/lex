import { NextContext } from 'next';
import { Router } from './next-routes';
import { getToken } from './secure';
import { http } from './fetch';
import { setToken } from './token';

export const createMiddware = (ctx: NextContext) => {
  // https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
  const res = ctx.res;
  const redirect = (path: string) => {
    if (res) {
      res.writeHead(302, {
        Location: path,
      });
      res.end();
    } else {
      Router.push(path);
    }
    return { statusCode: 302 };
  };
  ctx.redirect = redirect;
  ctx.getToken = () => getToken(ctx);
  setToken(ctx.getToken()); // 在Component.getInitialProps之前执行，为服务端发送http请求时提供身份
  ctx.http = http;
};
