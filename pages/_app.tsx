import '@config/initializer';
import {
  AppProps,
  Container,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app';
import Error, { CATCHED_CODE } from '@components/errors';
import { NProgressContainer } from '@core/nprogress/component';
import { PageProps } from '@core/hooks';
import React from 'react';
import { createNextMiddware } from '@helpers/next-middleware';

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
  await createNextMiddware(ctx);
  let pageProps = {
    token: ctx.getToken(),
    statusCode: (ctx.res && ctx.res.statusCode) || 200,
  };
  if (Component.getInitialProps) {
    try {
      pageProps = Object.assign(
        pageProps,
        await Component.getInitialProps(ctx),
      );
    } catch (error) {
      pageProps.statusCode = error.code;
      pageProps = Object.assign(pageProps, error);
    }
  }
  return { pageProps };
};

export default App;
