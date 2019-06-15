import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { RepoNav } from '@components/navs/repo-nav';
import { Repository } from '@server/repository/repository.entity';
import { SimpleForm } from '@components/forms/simple';
import { http } from '@helpers/fetch';

const RepoModuleCreate: NextSFC<any> = ({ repo }) => {
  return (
    <Page>
      <RepoNav repo={repo} />
      <a href="https://zhuanlan.zhihu.com/p/67797136">DDD</a>
      <SimpleForm
        onSubmit={newMod =>
          http.post(`/api/module`, { ...newMod, repository: repo.id })
        }
        fields={['name', 'description']}
        defaultValue={{}}
      />
    </Page>
  );
};

RepoModuleCreate.getInitialProps = async ctx => {
  const repoId = ctx.query.repository_id;
  const repo = await http.get<Repository>(`/api/repository/${repoId}`);
  return { repo };
};
export default RepoModuleCreate;
