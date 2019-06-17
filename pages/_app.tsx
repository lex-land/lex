import '@config/initializer';
import { AppProps, Container, DefaultAppIProps } from 'next/app';
import ErrorBoundary from '@config/error';
import { NProgressContainer } from '@core/nprogress/component';
import { PagePropsContext } from '@helpers/hooks';
import React from 'react';
import { enhanceNextMiddware } from '@helpers/next-middleware';

const App = (props: AppProps<any, any> & DefaultAppIProps) => {
  const { Component, pageProps } = props;
  return (
    <Container>
      <PagePropsContext.Provider value={pageProps}>
        <NProgressContainer />
        <ErrorBoundary statusCode={pageProps.statusCode}>
          <Component />
        </ErrorBoundary>
      </PagePropsContext.Provider>
    </Container>
  );
};

App.getInitialProps = enhanceNextMiddware(async ({ ctx }, pageProps) => {
  // 为pageProps新增公共数据
  // 在子组件里即可以用usePageProps进行获取
  pageProps.token = ctx.getToken();
  return pageProps;
});

export default App;
