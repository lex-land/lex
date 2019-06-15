import './index.less';
import Error from '@components/errors';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
// import { Repository } from '@server/repository/repository.entity';
// import { http } from '@helpers/fetch';

const Repositories: NextSFC = () => (
  <Page authed>
    <Error code={503} embered />
  </Page>
);

Repositories.getInitialProps = async ctx => {
  return {
    // statusCode: 503,
  };
};

export default Repositories;
