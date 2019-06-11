import './index.less';
import { Card, H5, NonIdealState, Tag } from '@blueprintjs/core';
import { usePageProps, useQuery } from '@helpers/hooks';
import { CreateButton } from '@helpers/CURD-button';
import { Link } from '@helpers/next-routes';
import { Module } from '@server/module/module.entity';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import RepoNav from '@components/navs/repo-nav';
import { http } from '@helpers/fetch';

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
                buttonIcon="cube"
                buttonText="新建"
                successForceReload
              />
            }
          />
        </div>
      )}
      {!!modules.length && (
        <div className="content" style={{ padding: 40 }}>
          <div style={{ marginBottom: 24 }}>
            <CreateButton
              action="/api/module"
              fields={['name', 'description']}
              params={{ repository: query.repository_id }}
              buttonText="添加模块"
              successForceReload
              successToast="添加模块成功"
            />
          </div>
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
                <p>
                  {mod.description}{' '}
                  {/* <EditButton
                    action={`/api/module/${mod.id}`}
                    defaultValue={mod}
                    fields={['name', 'description']}
                    icon="edit"
                    successForceReload
                    successToast="已更新模块信息"
                  />
                  {mod.interfaces.length === 0 && (
                    <DeleteButton
                      successForceReload
                      action={`/api/module/${mod.id}`}
                      buttonText="删除"
                      successToast="删除成功"
                    />
                  )} */}
                </p>
                <Tag>{mod.interfaces.length}个接口</Tag>
                {/* <EditButton
              action={`/api/module/${mod.id}`}
              fields={['name', 'description']}
              buttonText="编辑"
              onChange={setValue}
              defaultValue={value}
              successToast="已更新模块信息"
            />
            <DeleteButton
              alertWhen={true}
              alertStrongText={mod.name}
              action={`/api/module/${mod.id}`}
              buttonText="删除"
              successForceReload
              successToast="已删除模块信息"
            />
            <CreateButton
              action={`/api/interface`}
              fields={['method', 'url', 'name', 'description']}
              params={{ repository: query.repository_id, module: mod.id }}
              buttonText="新增接口"
              defaultValue={{}}
              successForceReload
              successToast="已更新模块信息"
            /> */}
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
    modules: await http.get<Module[]>(`/api/module`, {
      repository: ctx.query.repository_id,
    }),
  };
};

export default DashboardIndex;
