// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Blueprint stylesheets --> */}
          <link
            href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            href="/static/images/Luthor_bright.png"
            type="image/x-icon"
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
