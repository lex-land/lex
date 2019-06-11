import './new.less';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
// import { Repository } from '@server/repository/repository.entity';
// import { http } from '@helpers/fetch';

const RepositoriesEdit: NextSFC = () => (
  <Page className="repositories">
    <div className="body">
      <div className="content">新建仓库</div>
    </div>
  </Page>
);

RepositoriesEdit.getInitialProps = async ctx => {
  // const repoId = ctx.query.repository_id;
  // const repository = await http.get<Repository>(`/api/repository/${repoId}`);
  // const mod = ctx.query.module_id || repository.modules[0].id;
  return {
    // mod: await http.get<Module>(`/api/module/${mod}`),
    // repository,
  };
};

export default RepositoriesEdit;
