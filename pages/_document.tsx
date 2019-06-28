// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
// https://nextjs.org/docs#custom-document

// ./pages/_document.js

import Document, { Head, Html, Main, NextScript } from 'next/document';
import React, { Fragment } from 'react';
import { NextDocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  // https://github.com/zeit/next.js/blob/master/examples/with-styled-components/pages/_document.js
  static async getInitialProps(ctx: NextDocumentContext) {
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
          <Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </Fragment>
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
          <link href="/stylesheets/main.css" rel="stylesheet" />
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
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-142999296-1"
          ></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
