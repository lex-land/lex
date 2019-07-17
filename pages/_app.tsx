import '@/config/initializer';
import { AppProps, Container } from 'next/app';
import { PagePropsContext, composePageProps } from '@/core/PageProps';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NProgress } from '@/components/NProgress';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { enhancedContext } from '@/core/enhancedContext';
import { lexTheme } from '@/config/theme/lex-theme';
import { logger } from '@/core/logger';

type Props = AppProps<any> & { statusCode: any };

const initialAppProps = enhancedContext(async ({ Component, ctx }) => {
  // 初始化页面参数
  let pageProps = {};
  let statusCode = (ctx.res && ctx.res.statusCode) || 200;
  if (Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (error) {
      // FetchError
      logger.error(error);
      statusCode = error.code || 500;
    }
  }
  return { pageProps, statusCode };
});

export default composePageProps(initialAppProps)((props: Props) => {
  const { Component, pageProps, statusCode } = props;
  return (
    <ThemeProvider theme={lexTheme}>
      <PagePropsContext.Provider value={pageProps}>
        <ErrorBoundary statusCode={statusCode}>
          <Container>
            <NProgress />
            <Component />
          </Container>
        </ErrorBoundary>
      </PagePropsContext.Provider>
    </ThemeProvider>
  );
});
