// ./pages/_document.js
import Document, { DocumentProps, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

interface Props extends DocumentProps {
  styleTags: any;
}

class SunmiDocument extends Document<Props> {
  public static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  public render() {
    return (
      <html lang="zh">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <meta name="renderer" content="webkit" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default SunmiDocument;
