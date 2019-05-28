import '../static/stylesheets/index.less';
import 'moment/locale/zh-cn';
import App, { Container } from 'next/app';
import { NProgressContainer } from '@core/nprogress/component';
import React from 'react';
import { Router } from '@helpers/next-routes';
import { catchError } from '@config/error';
import dynamic from 'next/dynamic';
import { exportGlobalProps } from '@helpers/global-props';
import { getToken } from '@helpers/secure';
import moment from 'moment';
import { setToken } from '@helpers/token';

moment.locale('zh-cn');
catchError();

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

const Provider = (props: { children: any }) => {
  return (
    <Container>
      <NProgressContainer />
      {props.children}
    </Container>
  );
};

const Error = dynamic<any>(import('@components/errors'));

class SunmiEngine extends App<any> {
  static getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps: any = {
      statusCode: 200,
    };
    if (Component.getInitialProps) {
      // 在组件的getInitialProps之前，全局存储token
      setToken(getToken(ctx));
      try {
        pageProps = {
          ...pageProps,
          ...(await exportGlobalProps(ctx)),
          ...(await Component.getInitialProps(ctx)),
        };
      } catch (error) {
        pageProps.error = error;
        pageProps.statusCode = error.code || error.statusCode || 500;
      }
    }
    return { pageProps };
  };

  render() {
    const { Component, pageProps } = this.props;
    if (pageProps.statusCode !== 200) {
      return (
        <Provider>
          <Error {...pageProps} />
        </Provider>
      );
    }
    return (
      <Provider>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default SunmiEngine;
