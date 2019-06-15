import './show.less';
import { usePageProps, useQuery } from '@core/hooks';
import { CreateButton } from '@components/curd/CURD-button';
import { Interface } from '@server/interface/interface.entity';
import InterfaceContent from '@components/content/interface-content';
import { ListHeader } from '@components/headers';
import { Module } from '@server/module/module.entity';
import ModuleContent from '@components/content/module-content';
import NavList from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import RepoNav from '@components/navs/repo-nav';
import SiderPanel from '@components/navs/sider-panel';

interface PageProps {
  mod: Module;
  inte: Interface | undefined;
}

const DashboardIndex: NextSFC<PageProps> = () => {
  const { mod, inte } = usePageProps<PageProps>();
  const query = useQuery();
  return (
    <Page authed className="interfaces">
      <RepoNav repo={mod.repository} inte={inte} mod={mod} />
      <div className="body">
        <SiderPanel>
          <ListHeader
            title="接口"
            rightElement={
              <CreateButton
                action="/api/interface"
                fields={['method', 'url', 'name', 'description']}
                params={{ repository: query.repository_id, module: mod.id }}
                buttonText="新增"
                buttonIcon="application"
                successForceReload
              />
            }
          />
          <NavList
            rowKey="interface_id"
            itemLinkReplace
            itemIcon="application"
            itemRoute="repositories/modules/show"
            dataSource={mod.interfaces}
          />
        </SiderPanel>
        {!query.interface_id && <ModuleContent mod={mod} />}
        {inte && <InterfaceContent edit={false} inte={inte} />}
      </div>
    </Page>
  );
};

DashboardIndex.getInitialProps = async ctx => {
  const modId = ctx.query.module_id;
  const mod = await ctx.http.get<Module>(`/api/module/${modId}`);
  const inteId = ctx.query.interface_id;
  const inte = inteId && (await ctx.http.get(`/api/interface/${inteId}`));
  return {
    mod,
    inte,
  };
};

export default DashboardIndex;
