import '@config/initializer';
import { AppProps, Container, DefaultAppIProps } from 'next/app';
import Error, { CATCHED_CODE } from '@components/errors';
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
        {CATCHED_CODE.includes(pageProps.statusCode) ? (
          <Error />
        ) : (
          <Component />
        )}
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
