import { H1 } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';

const UsersShow: NextSFC = () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Container>
        <H1>个人中心</H1>
        <Page.EmberedError code={503} />
      </Page.Container>
    </Page>
  );
};

UsersShow.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default UsersShow;
