import './index.less';
import { Card, H5, NonIdealState, Tag } from '@blueprintjs/core';
import { CreateButton, DeleteButton } from '@components/curd';
import { usePageProps, useQuery } from '@helpers/hooks';
import { Link } from '@helpers/next-routes';
import { ListHeader } from '@components/headers';
import { Module } from '@server/module/module.entity';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { RepoNav } from '@components/navs/repo-nav';
import { SiderPanel } from '@components/navs/sider-panel';

const DashboardIndex: NextSFC = () => {
  const { modules } = usePageProps<{ modules: Module[] }>();
  const query = useQuery();
  return (
    <Page authed className="modules">
      <RepoNav />
      {!modules.length && (
        <div style={{ padding: 40 }}>
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
      {!!modules.length && (
        <div className="page">
          {!!modules.length && (
            <SiderPanel>
              <ListHeader
                title="全部模块"
                rightElement={
                  <CreateButton
                    action="/api/module"
                    fields={['name', 'description']}
                    params={{ repository: query.repository_id }}
                    buttonText="新增"
                    icon="cube"
                    successForceReload
                  />
                }
              />
              <NavList
                itemIcon="cube"
                itemRoute="repositories/modules/show"
                rowKey="module_id"
                dataSource={modules}
              />
            </SiderPanel>
          )}
          <div className="module-card__list">
            {modules.map(mod => (
              <Card className="module-card" key={mod.id}>
                <H5>
                  <Link
                    route="repositories/modules/show"
                    params={{
                      repository_id: query.repository_id,
                      module_id: mod.id,
                    }}
                  >
                    <a>{mod.name}</a>
                  </Link>
                </H5>
                <p>{mod.description}</p>
                <Tag>{mod.interfaces.length}个接口</Tag>
                <DeleteButton
                  action={`/api/module/${mod.id}`}
                  icon="trash"
                  successGoto={`/repositories/${query.repository_id}/modules`}
                  alertWhen={true}
                />
              </Card>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
};

DashboardIndex.getInitialProps = async ctx => {
  return {
    modules: await ctx.http.get<Module[]>(`/api/module`, {
      repository: ctx.query.repository_id,
    }),
  };
};

export default DashboardIndex;
