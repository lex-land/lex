import { Card, H3 } from '@blueprintjs/core';
import { LexContainer, LexContent, PageSider } from './Layout';
import { EmberedError } from './EmberedError';
import { GlobalStyle } from '@/theme/lex-theme';
import Head from 'next/head';
import { PageError } from './PageError';
import { PageNavbar } from './PageNavbar';
import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

export interface PageProps {
  className?: string;
  title?: string;
  children: any;
  style?: React.CSSProperties;
  backgroundColor?: string;
}

export const Page = _.merge(
  (props: PageProps) => {
    const title = props.title || 'Collaboration Tool for API documentation';
    return (
      <>
        <Head>
          <title>{`Lex - ${title}`}</title>
        </Head>
        <main className={props.className} style={props.style}>
          {props.children}
        </main>
        <GlobalStyle backgroundColor={props.backgroundColor} />
      </>
    );
  },
  {
    // https://stackoverflow.com/questions/41272375/object-assign-does-not-copy-functions
    // composePageProps: composePageProps,
    // createPageProps: createPageProps,
    Container: LexContainer,
    Sider: PageSider,
    EmberedError: styled(EmberedError)`
      padding: 40px;
      text-align: center;
    `,
    Error: styled(PageError)`
      text-align: center;
    `,
    UnlogedNavbar: styled(PageNavbar)`
      height: 100px;
      .bp3-navbar-group {
        height: 100px;
        align-items: flex-end;
        padding-bottom: 24px;
        float: none;
      }
    `,
    Navbar: styled(PageNavbar)`
      padding: 0 24px;
      height: 64px;
      .bp3-navbar-group {
        height: 64px;
      }
    `,
    // 内容块
    Content: LexContent,
    Card: Object.assign(
      styled(Card)`
        width: 400px;
        padding: 40px 24px 24px;
        margin: 80px auto;
        .bp3-button[type='submit'] {
          width: 100%;
          margin-top: 16px;
        }
        .bp3-label {
          font-weight: bold;
        }
      `,
      {
        Title: styled(H3)`
          margin-bottom: 24px;
          text-align: center;
        `,
        Footer: styled.div`
          margin-top: 16px;
          text-align: center;
        `,
      },
    ),
  },
);
