import { AnchorButton, Divider, H5 } from '@blueprintjs/core';
import { DashboardSwitcher } from '@components/navs/dashboard-switcher';
import { Flex } from '@components/layout/flex';
import { ListHeader } from '@components/headers';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';
import { User } from '@server/user/user.entity';
import { usePageProps } from '@helpers/hooks';

const DashboardIndex: NextSFC = () => {
  const { user } = usePageProps<{ user: User }>();
  return (
    <Page>
      <Page.Navbar />
      <Flex>
        <Page.Sider>
          <DashboardSwitcher name={user.fullname} />
          <Divider />
          <ListHeader
            title="仓库"
            rightElement={
              <AnchorButton
                icon="git-repo"
                intent="success"
                href="/repositories/new"
                text="新增"
              />
            }
          />
          <NavList
            itemIcon="git-repo"
            rowKey="repository_id"
            itemRoute="repositories/show"
            dataSource={user.joinedRepositories.concat(user.ownedRepositories)}
          />
          <Divider />
          <ListHeader title="团队" />
        </Page.Sider>
        <Page.Content>
          <H5>我的团队成员动态</H5>
          <Page.EmberedError visible code={503} />
          <H5>我加入仓库的动态</H5>
          <Page.EmberedError visible code={503} />
        </Page.Content>
      </Flex>
    </Page>
  );
};

DashboardIndex.getInitialProps = async ctx => {
  // 没有token重定向到login
  if (!ctx.getToken()) {
    return ctx.redirect('/login');
  }
  return {
    user: await ctx.http.get('/api/session/user'),
  };
};

export default DashboardIndex;
