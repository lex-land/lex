import { composePageProps, usePageProps } from '@core/next-compose';
import { inte, mod, repo } from '@helpers/page-props';
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
        <Repo.Nav />
        {mod.name}
      </Repo.SubPage>
    </Page>
  );
});
