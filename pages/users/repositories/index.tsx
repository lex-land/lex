import Error from '@components/errors';
import { H1 } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const UsersRepos: NextSFC = () => {
  return (
    <Page authed>
      <div className="page lex-container">
        <H1>仓库列表</H1>
        <Error code={503} embered />
      </div>
    </Page>
  );
};

UsersRepos.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default UsersRepos;
