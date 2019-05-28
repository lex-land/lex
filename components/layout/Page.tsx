import { WithRouterProps, withRouter } from 'next/router';
import Head from 'next/head';
import React from 'react';

export interface PageProps extends WithRouterProps {
  className?: string;
  title?: string;
  children: any;
  style?: React.CSSProperties;
  backgroundColor?: any;
}

export const Page = withRouter((props: Partial<PageProps>) => {
  return (
    <main className={props.className} style={props.style}>
      <Head>
        <title>{props.title || '商米引擎'}</title>
        <style>{`body{ background:${props.backgroundColor ||
          '#f0f2f5'} }`}</style>
      </Head>
      <div className="Page" style={{ minWidth: 1024 }}>
        {props.children}
      </div>
    </main>
  );
});
