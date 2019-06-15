import { AnchorButton, Divider } from '@blueprintjs/core';
import { AvatorNav } from '@components/navs/avator';
import Error from '@components/errors';
import { ListHeader } from '@components/headers';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Organization } from '@server/organization/organization.entity';
import { Page } from '@components/layout';
import React from 'react';
import { SiderPanel } from '@components/navs/sider-panel';
import { usePageProps } from '@helpers/hooks';

const DashboardIndex: NextSFC = () => {
  const { org } = usePageProps<{ org: Organization }>();
  return (
    <Page authed>
      <div className="dashboard">
        <SiderPanel className="dashboard-sidebar">
          <AvatorNav name={org.name} />
          <Divider />
          <AnchorButton style={{ width: '100%' }} minimal intent="primary">
            查看组织详情
          </AnchorButton>
          <ListHeader
            title="仓库"
            rightElement={
              <AnchorButton
                icon="git-repo"
                intent="success"
                href={`/orgs/${org.name}/repositories/new`}
                text="新增"
              />
            }
          />
          <NavList
            itemIcon="git-repo"
            rowKey="repository_id"
            itemRoute="repositories/show"
            dataSource={org.repositories}
          />
        </SiderPanel>
        <div className="dashboard-content">
          <Error code={503} embered />
        </div>
      </div>
    </Page>
  );
};

DashboardIndex.getInitialProps = async ctx => {
  // 没有token重定向到login
  return {
    org: await ctx.http.get(`/api/organization/${ctx.query.org_id}`),
  };
};

export default DashboardIndex;
