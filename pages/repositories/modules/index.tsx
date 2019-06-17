import { Card, H5, Tag } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Link } from '@helpers/route';
import { Module } from '@server/module/module.entity';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/repo';
import { mods } from '@helpers/page-props';
import { useQuery } from '@helpers/hooks';

export default composePageProps(mods)(() => {
  const { mods } = usePageProps<{ mods: Module[] }>();
  const query = useQuery();
  return (
    <Page>
      <Page.Navbar />
      <Repo.Nav />
      <Repo.SubPage>
        <Page.EmberedError
          visible={mods.length === 0}
          code={404}
          description="当前仓库没有任何模块，可以新建一个看看"
          action={
            <CURD.Create
              action={`/api/module`}
              params={{ repository: query.repository_id }}
              fields={['name', 'description']}
              drawerTitle="新建模块"
              button={
                <CURD.Button icon="cube" minimal intent="success" text="新建" />
              }
              successForceReload
            />
          }
        />
        {!!mods.length && (
          <Flex>
            {mods.map(mod => (
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
    </Page>
  );
});
