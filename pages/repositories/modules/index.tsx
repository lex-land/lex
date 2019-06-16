import { Card, H5, Tag } from '@blueprintjs/core';
import { usePageProps, useQuery } from '@helpers/hooks';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Link } from '@helpers/next-routes';
import { Module } from '@server/module/module.entity';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/repo';

const DashboardIndex: NextSFC = () => {
  const { modules } = usePageProps<{ modules: Module[] }>();
  const query = useQuery();
  return (
    <Page>
      <Page.Navbar />
      <Page.Container>
        <Repo.Nav />
        <Repo.SubPage>
          <Page.EmberedError
            visible={modules.length === 0}
            code={404}
            description="当前仓库没有任何模块，可以新建一个看看"
            action={
              <CURD.Create
                action={`/api/module`}
                params={{ repository: query.repository_id }}
                fields={['name', 'description']}
                drawerTitle="新建模块"
                button={
                  <CURD.Button
                    icon="cube"
                    minimal
                    intent="success"
                    text="新建"
                  />
                }
                successForceReload
              />
            }
          />
          {!!modules.length && (
            <Flex>
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
                </Card>
              ))}
            </Flex>
          )}
        </Repo.SubPage>
      </Page.Container>
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
