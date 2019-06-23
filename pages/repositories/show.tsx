import { composePageProps, usePageProps } from '@core/next-compose';
import { CURD } from '@components/curd';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { repo } from '@helpers/page-props';
import { useQuery } from '@helpers/hooks';

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const query = useQuery();
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Repo.Nav />
        <Page.EmberedError
          visible={repo.modules.length === 0}
          code={404}
          description="当前仓库没有任何模块，可以新建一个看看"
          action={
            <CURD.Create
              action={`/api/module`}
              params={{ repository: query.repository_id }}
              fields={['name', 'description']}
              button={
                <CURD.Button intent="success" minimal icon="cube" text="新建" />
              }
              drawerTitle="新建模块"
              successForceReload
            />
          }
        />
        <Page.EmberedError
          code={404}
          visible
          description="当前模块没有任何接口，可以新建一个看看"
          action={
            <CURD.Create
              action={`/api/interface`}
              params={{
                repository: query.repository_id,
                module: 1,
              }}
              fields={['method', 'url', 'name', 'description']}
              button={
                <CURD.Button
                  minimal
                  intent="success"
                  icon="application"
                  text="新建"
                />
              }
              drawerTitle="新增接口"
              successForceReload
            />
          }
        />
      </Repo.SubPage>
    </Page>
  );
});
