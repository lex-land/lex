import './show.less';
import { H2, NonIdealState } from '@blueprintjs/core';
import { usePageProps, useQuery } from '@helpers/hooks';
import { CreateButton } from '@helpers/CURD-button';
import { ListHeader } from '@components/headers';
import ModuleContent from '@components/content/module-content';
import NavList from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import RepoNav from '@components/navs/repo-nav';
import { Repository } from '@server/repository/repository.entity';
import SiderPanel from '@components/navs/sider-panel';
import { http } from '@helpers/fetch';

const RepositoriesShow: NextSFC = () => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const query = useQuery();
  return (
    <Page authed className="repositories">
      <RepoNav repo={repo} />
      <div className="body">
        {!!repo.modules.length && (
          <SiderPanel>
            <ListHeader
              title="模块"
              rightElement={
                <CreateButton
                  action="/api/module"
                  fields={['name', 'description']}
                  params={{ repository: repo }}
                  buttonText="新增"
                  buttonIcon="cube"
                  successForceReload
                />
              }
            />
            <NavList
              itemIcon="cube"
              itemRoute="repositories/modules/show"
              rowKey="module_id"
              dataSource={repo.modules}
            />
          </SiderPanel>
        )}
        <div style={{ flex: '1 1' }}>
          <div style={{ padding: 40 }}>
            <H2>{repo.name}</H2>
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
                    buttonIcon="cube"
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
    repo: await http.get<Repository>(`/api/repository/${repoId}`),
  };
};

export default RepositoriesShow;