import React, { Component } from 'react';
import { NProgressContainer } from './component';

export const withNProgress = (delayMs?: any, options?: any) => (Page: any) =>
  class extends Component {
    static getInitialProps = Page.getInitialProps;
    render() {
      return (
        <>
          <Page {...this.props} />
          <NProgressContainer delayMs={delayMs} options={options} />
        </>
      );
    }
  };
