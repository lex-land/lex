import '@config/initializer';
import {
  AppProps,
  Container,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app';
import Error, { CATCHED_CODE } from '@components/errors';
import { PageProps, defaultPageProps } from '@core/hooks';
import { NProgressContainer } from '@core/nprogress/component';
import React from 'react';
import { createMiddware } from '@helpers/next-middleware';

const App = (props: AppProps<any, any> & DefaultAppIProps) => {
  const { Component, pageProps } = props;
  if (CATCHED_CODE.includes(pageProps.statusCode)) {
    return (
      <PageProps.Provider value={pageProps}>
        <Container>
          <Error />
        </Container>
      </PageProps.Provider>
    );
  }
  return (
    <PageProps.Provider value={pageProps}>
      <Container>
        <NProgressContainer />
        <Component />
      </Container>
    </PageProps.Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }: NextAppContext) => {
  createMiddware(ctx);
  let pageProps = defaultPageProps;
  if (Component.getInitialProps) {
    try {
      pageProps = Object.assign(
        pageProps,
        await Component.getInitialProps(ctx),
      );
    } catch (error) {
      pageProps = Object.assign({ error });
    }
  }
  return { pageProps };
};

export default App;
