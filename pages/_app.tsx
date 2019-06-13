import '../static/stylesheets/index.less';
import 'moment/locale/zh-cn';
import {
  AppProps,
  Container,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app';
import { PageProps, defaultPageProps } from '@core/hooks';
import { NProgressContainer } from '@core/nprogress/component';
import { NextContext } from 'next';
import React from 'react';
import { Router } from '@helpers/next-routes';
import { getToken } from '@helpers/secure';
// import { http } from '@helpers/fetch';
import moment from 'moment';
import { setToken } from '@helpers/token';

moment.locale('zh-cn');

Router.events.on('routeChangeComplete', () => {
  // TODO: 目前官方修复了在canary分支，但canary分支存在问题，待合并到主分支后配合修改
  // https://github.com/zeit/next-plugins/issues/282
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]',
    );
    const timestamp = new Date().valueOf();
    const link: any = els[0];
    link.href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
  }
});

const mergedPageProps = async (ctx: NextContext) => {
  return {
    // session: await http.get('/api/auth/session'),
  };
};

const createMiddware = (ctx: NextContext) => {
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
  };
  ctx.redirect = redirect;
  ctx.getToken = () => getToken(ctx);
};

const App = (props: AppProps<any, any> & DefaultAppIProps) => {
  const { Component, pageProps } = props;
  return (
    <Container>
      <NProgressContainer />
      <PageProps.Provider value={pageProps}>
        <Component />
      </PageProps.Provider>
    </Container>
  );
};

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  createMiddware(ctx);
  let pageProps = defaultPageProps;
  if (Component.getInitialProps) {
    setToken(ctx.getToken()); // 在Component.getInitialProps之前执行，为服务端发送http请求时提供身份
    try {
      pageProps = Object.assign(
        pageProps,
        await mergedPageProps(ctx),
        await Component.getInitialProps(ctx),
      );
    } catch (error) {
      pageProps = Object.assign(pageProps, { error });
    }
  }
  return { pageProps };
};

export default App;
