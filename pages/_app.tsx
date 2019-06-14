import '@config/initializer';
import {
  AppProps,
  Container,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app';
import { PageProps, defaultPageProps } from '@core/hooks';
import { NProgressContainer } from '@core/nprogress/component';
import React from 'react';
import { createMiddware } from '@helpers/next-middleware';

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
    try {
      pageProps = Object.assign(
        pageProps,
        await Component.getInitialProps(ctx),
      );
    } catch (error) {
      pageProps = Object.assign(pageProps, { error });
    }
  }
  return { pageProps };
};

export default App;
