import {
  Card,
  Divider,
  H4,
  Intent,
  Position,
  Toaster,
} from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import RepoNav from '@components/navs/repo-nav';
import { Repository } from '@server/repository/repository.entity';
import SimpleForm from '@components/forms/simple-form';
import { http } from '@helpers/fetch';
import { usePageProps } from '@helpers/hooks';

const RepositoriesSettings: NextSFC<any> = () => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const handleSubmit = (newRepo: any) => {
    http.put(`/api/repository/${repo.id}`, newRepo);
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: '已成功修改仓库信息',
    });
  };
  return (
    <Page authed>
      <RepoNav repo={repo} />
      <Card className="lex-container" style={{ marginTop: 40 }}>
        <Divider />
        <H4>转移仓库所属</H4>
        <Divider />
        <H4>基本信息</H4>
        <Divider />
        <SimpleForm
          onSubmit={handleSubmit}
          fields={['name', 'description']}
          defaultValue={repo}
        />
      </Card>
    </Page>
  );
};

RepositoriesSettings.getInitialProps = async ctx => {
  const repoId = ctx.query.repository_id;
  const repo = await http.get<Repository>(`/api/repository/${repoId}`);
  return { repo };
};
export default RepositoriesSettings;
