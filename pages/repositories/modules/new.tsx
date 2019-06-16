import { NextSFC } from 'next';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { RepoNav } from '@components/navs/repo-nav';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';

const RepoModuleCreate: NextSFC<any> = ({ repo }) => {
  return (
    <Page>
      <RepoNav repo={repo} />
      <a href="https://zhuanlan.zhihu.com/p/67797136">DDD</a>
      <QuickForm
        action={newMod =>
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
