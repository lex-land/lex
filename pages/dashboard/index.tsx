import './index.less';
import { AvatorNav } from '@components/navs/avator';
import { CreateButton } from '@components/curd';
import { Divider } from '@blueprintjs/core';
import Error from '@components/errors';
import { ListHeader } from '@components/headers';
import { NavList } from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { SiderPanel } from '@components/navs/sider-panel';
import { User } from '@server/user/user.entity';
import { usePageProps } from '@helpers/hooks';

const DashboardIndex: NextSFC = () => {
  const { user } = usePageProps<{ user: User }>();
  return (
    <Page authed>
      <div className="dashboard">
        <SiderPanel className="dashboard-sidebar">
          <AvatorNav {...user} />
          <Divider />
          <ListHeader
            title="仓库"
            rightElement={
              <CreateButton
                buttonIcon="git-repo"
                action="/api/repository"
                fields={['name', 'description']}
                params={{ creator: user, owner: user }}
                buttonText="新增"
                successForceReload
                successToast="已新增仓库"
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
        </SiderPanel>
        <div className="dashboard-content">
          <Error code={503} embered />
          {/* <div>我的团队成员动态</div>
          <div>我加入仓库的动态</div> */}
        </div>
      </div>
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
