import { AnchorButton, Button, Divider } from '@blueprintjs/core';
import { CURD } from '@components/curd';
import { DashboardSwitcher } from '@components/navs/dashboard-switcher';
import { Flex } from '@components/layout/flex';
import { ListHeader } from '@components/_useless_headers';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Organization } from '@server/organization/organization.entity';
import { Page } from '@components/page';
import React from 'react';
import { usePageProps } from '@helpers/hooks';

const OrgsShow: NextSFC = () => {
  const { org } = usePageProps<{ org: Organization }>();
  return (
    <Page>
      <Page.Navbar />
      <Flex>
        <Page.Sider>
          <DashboardSwitcher name={org.name} />
          <Divider />
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
        </Page.Sider>
        <Flex.Auto>
          <Page.Content>
            <AnchorButton minimal intent="primary">
              编辑
            </AnchorButton>
            <CURD.Delete
              alertWhen
              successGoto="/"
              action={`/api/organization/${org.id}`}
              button={
                <Button intent="danger" minimal text="退出并删除这个组织" />
              }
            />
            <Page.EmberedError visible code={503} />
          </Page.Content>
        </Flex.Auto>
      </Flex>
    </Page>
  );
};

OrgsShow.getInitialProps = async ctx => {
  return {
    org: await ctx.http.get(`/api/organization/${ctx.query.org_id}`),
  };
};

export default OrgsShow;
