import './index.less';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
// import { Repository } from '@server/repository/repository.entity';
// import { http } from '@helpers/fetch';

const DashboardIndex: NextSFC = () => (
  <Page authed>
    <div>Hello</div>
  </Page>
);

DashboardIndex.getInitialProps = async ctx => {
  return {
    statusCode: 503,
  };
};

export default DashboardIndex;
