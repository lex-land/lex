import { Flex } from '@/core/layout/flex';
import { H1 } from '@blueprintjs/core';
import { Page } from '@/components/page';
import React from 'react';
import { Repo } from '@/components/domains/repo';
import { composePageProps } from '@/core/next-compose';
import { repo } from '@/helpers/page-props';

export default composePageProps(repo)(() => {
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>Status Codes</H1>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
