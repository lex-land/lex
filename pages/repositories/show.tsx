import './show.less';
import { Button, H2, NonIdealState } from '@blueprintjs/core';
import { usePageProps, useQuery } from '@helpers/hooks';
import { CreateButton } from '@components/curd';
import { ModuleContent } from '@components/contents/module-content';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';
import { RepoNav } from '@components/navs/repo-nav';
import { Repository } from '@server/repository/repository.entity';

const RepositoriesShow: NextSFC = () => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const query = useQuery();
  return (
    <Page className="repositories">
      <Page.Navbar />
      <RepoNav repo={repo} />
      <div className="body lex-container">
        <div style={{ flex: '1 1' }}>
          <div style={{ margin: 40 }}>
            <H2 className="page-title">
              <span>{repo.name}</span>
              <div className="page-actions">
                <Button icon="edit" minimal text="编辑本页面" />
              </div>
            </H2>
            <p>{repo.description}</p>
          </div>
          {!repo.modules.length && (
            <div>
              <NonIdealState
                icon="search"
                title="暂无模块"
                description="当前仓库没有任何模块，可以新建一个看看"
                action={
                  <CreateButton
                    action={`/api/module`}
                    params={{ repository: query.repository_id }}
                    fields={['name', 'description']}
                    icon="cube"
                    buttonText="新建"
                    successForceReload
                  />
                }
              />
            </div>
          )}
          {repo.modules.map(mod => (
            <ModuleContent key={mod.id} mod={mod} />
          ))}
        </div>
      </div>
    </Page>
  );
};

RepositoriesShow.getInitialProps = async ctx => {
  const repoId = ctx.query.repository_id;
  return {
    repo: await ctx.http.get<Repository>(`/api/repository/${repoId}`),
  };
};

export default RepositoriesShow;
