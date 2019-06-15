import './index.less';
import {
  Divider,
  Menu,
  MenuDivider,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';
import { Avator } from '@components/users';
import { CreateButton } from '@components/curd/CURD-button';
import Error from '@components/errors';
import { ListHeader } from '@components/headers';
import NavList from '@components/navs/nav-list';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import SiderPanel from '@components/navs/sider-panel';
import { User } from '@server/user/user.entity';
import { usePageProps } from '@core/hooks';

const DashboardIndex: NextSFC = () => {
  const { user } = usePageProps<{ user: User }>();
  return (
    <Page authed>
      <div className="dashboard">
        <SiderPanel className="dashboard-sidebar">
          <div className="avator__container">
            <Popover
              content={
                <Menu>
                  <MenuItem icon="graph" text="Graph" />
                  <MenuItem icon="map" text="Map" />
                  <MenuItem
                    icon="th"
                    text="Table"
                    shouldDismissPopover={false}
                  />
                  <MenuItem icon="zoom-to-fit" text="Nucleus" disabled={true} />
                  <MenuDivider />
                  <MenuItem icon="cog" text="Settings...">
                    <MenuItem
                      icon="add"
                      text="Add new application"
                      disabled={true}
                    />
                    <MenuItem icon="remove" text="Remove application" />
                  </MenuItem>
                </Menu>
              }
              position={Position.BOTTOM_LEFT}
            >
              <Avator thumbnail user={user} />
            </Popover>
          </div>
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
    ctx.redirect('/login');
    return {};
  }
  return {
    // TODO: fetch异常处理
    user: await ctx.http.get('/api/session/user'),
  };
};

export default DashboardIndex;
