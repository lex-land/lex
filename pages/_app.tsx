import '@/config/initializer';
import { AppPropsMap, PagePropsContext, compose } from '@/shared/PageProps';
import { AppProps } from 'next/app';
import ErrorBoundary from '@/config/ErrorBoundary';
import { NProgress } from '@/components/NProgress';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { enhancedContext } from '@/helpers/enhancedContext';
import { lexTheme } from '@/theme/lex-theme';

const appProps: AppPropsMap = [enhancedContext];

type Props = AppProps<any> & { statusCode: any };

export default compose(appProps)((props: Props) => {
  const { Component, pageProps, statusCode } = props;
  return (
    <ThemeProvider theme={lexTheme}>
      <PagePropsContext.Provider value={pageProps}>
        <ErrorBoundary statusCode={statusCode}>
          <NProgress />
          <Component />
        </ErrorBoundary>
      </PagePropsContext.Provider>
    </ThemeProvider>
  );
});
