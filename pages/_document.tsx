// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
// https://nextjs.org/docs#custom-document

// ./pages/_document.js

import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { CSP } from '@/config/csp';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  // https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link href="/static/stylesheets/main.css" rel="stylesheet" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          <meta httpEquiv="Content-Security-Policy" content={CSP} />
          <meta
            name="description"
            content="A Collaboration Tool for API documentation"
          />
          <meta
            name="keywords"
            content="react,nestjs,nextjs,typeorm,typescript,api-documentation,collaboration"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
