import { NextContext } from 'next';
import { Router } from './next-routes';
import { getToken } from './secure';
import { http } from './fetch';
import { setToken } from './token';

export const createNextMiddware = async (ctx: NextContext) => {
  ctx.getToken = () => getToken(ctx);
  setToken(ctx.getToken()); // 在Component.getInitialProps之前执行，为服务端发送http请求时提供身份

  ctx.redirect = (path: string) => {
    // https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
    const res = ctx.res;
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

  ctx.authorized = async () => {
    try {
      const { statusCode } = await http.get(`/api/session`);
      return statusCode !== 401;
    } catch (error) {
      return false;
    }
  };

  ctx.http = http;
};
