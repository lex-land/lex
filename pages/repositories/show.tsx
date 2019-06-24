import { composePageProps, usePageProps } from '@core/next-compose';
import { Flex } from '@components/layout/flex';
import { H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { repo } from '@helpers/page-props';

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>{repo.description}</H1>
            <Page.EmberedError
              visible={repo.modules.length === 0}
              code={404}
              description="当前仓库没有任何模块，可以新建一个看看"
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
