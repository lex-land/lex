import '@/config/initializer';
import { AppProps, Container } from 'next/app';
import { AppPropsMap, PagePropsContext, compose } from '@/shared/PageProps';
import ErrorBoundary from '@/components/ErrorBoundary';
import { NProgress } from '@/components/NProgress';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { enhancedContext } from '@/shared/enhancedContext';
import { lexTheme } from '@/theme/lex-theme';

const appProps: AppPropsMap = [enhancedContext];

type Props = AppProps<any> & { statusCode: any };

export default compose(appProps)((props: Props) => {
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
