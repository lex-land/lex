import Head from 'next/head';
import LoginedNavbar from '@components/navs/logined-navbar';
import React from 'react';

export interface PageProps {
  className?: string;
  title?: string;
  children: any;
  style?: React.CSSProperties;
  backgroundColor?: any;
  authed?: boolean;
}

export const Page = (props: Partial<PageProps>) => {
  return (
    <main className={props.className} style={props.style}>
      <Head>
        <title>{props.title || ''}</title>
        <style>{`body{ background:${props.backgroundColor ||
          '#f5f8fa'} }`}</style>
      </Head>
      <div>
        {props.authed && <LoginedNavbar />}
        {props.children}
      </div>
    </main>
  );
};
