import './index.less';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';

const DashboardIndex: NextSFC<{ repo: Repository }> = () => (
  <Page>
    <div>Hello</div>
  </Page>
);

DashboardIndex.getInitialProps = async ctx => {
  const repoId = ctx.query.repository_id;
  return {
    repo: await http.get<Repository>(`/api/repository/${repoId}`),
  };
};

export default DashboardIndex;
