import { usePageProps, useQuery } from '@helpers/hooks';
import IntePage from './interface';
import { Interface } from '@server/interface/interface.entity';
import { Module } from '@server/module/module.entity';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/repo';

interface PageProps {
  mod: Module;
  inte: Interface | undefined;
}

const ModulesShow: NextSFC<PageProps> = () => {
  const { mod } = usePageProps<PageProps>();
  const query = useQuery();
  return query.interface_id ? (
    <IntePage />
  ) : (
    <Page>
      <Page.Navbar />
      <Page.Container>
        <Repo.Nav />
        <Repo.SubPage>{mod.name}</Repo.SubPage>
      </Page.Container>
    </Page>
  );
};

ModulesShow.getInitialProps = async ctx => {
  const modId = ctx.query.module_id;
  const mod = await ctx.http.get<Module>(`/api/module/${modId}`);
  const inte =
    IntePage.getInitialProps &&
    ((await IntePage.getInitialProps(ctx)) as Interface);
  return {
    inte,
    mod,
  };
};

export default ModulesShow;
