import { AnchorButton, Divider } from '@blueprintjs/core';
import { DashboardSwitcher } from '@components/navs/dashboard-switcher';
import { Flex } from '@components/layout/flex';
import { ListHeader } from '@components/headers';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Organization } from '@server/organization/organization.entity';
import { Page } from '@components/page';
import React from 'react';
import { SiderPanel } from '@components/layout/sider-panel';
import { usePageProps } from '@helpers/hooks';

const OrgsShow: NextSFC = () => {
  const { org } = usePageProps<{ org: Organization }>();
  return (
    <Page>
      <Page.Navbar />
      <Flex>
        <SiderPanel>
          <DashboardSwitcher name={org.name} />
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
        <Flex.Auto>
          <Page.EmberedError code={503} />
        </Flex.Auto>
      </Flex>
    </Page>
  );
};

OrgsShow.getInitialProps = async ctx => {
  // 没有token重定向到login
  return {
    org: await ctx.http.get(`/api/organization/${ctx.query.org_id}`),
  };
};

export default OrgsShow;
