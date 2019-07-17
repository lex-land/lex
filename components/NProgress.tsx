import React, { useEffect } from 'react';
import NProgressStatic from 'nprogress';
import Router from 'next/router';
import { createGlobalStyle } from 'styled-components';

const routeChangeStart = () => {
  NProgressStatic.start();
};

const routeChangeEnd = () => {
  NProgressStatic.done();
};

const color = '#106ba3';

export const GlobalStyle = createGlobalStyle`
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: ${color};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
`;

export const NProgress = () => {
  useEffect(() => {
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  });

  return (
    <>
      <GlobalStyle />
    </>
  );
};
