import { composePageProps, usePageProps } from '@core/next-compose';
import { inte, mod, repo } from '@helpers/page-props';
import { Flex } from '@components/layout/flex';
import { H1 } from '@blueprintjs/core';
import IntePage from './interface';
import { Interface } from '@server/interface/interface.entity';
import { Module } from '@server/module/module.entity';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { useQuery } from '@helpers/hooks';

interface PageProps {
  mod: Module;
  inte: Interface | undefined;
}

export default composePageProps(repo, mod, inte)(() => {
  const { mod } = usePageProps<PageProps>();
  const query = useQuery();
  return query.interface_id ? (
    <IntePage />
  ) : (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>{mod.name}</H1>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
