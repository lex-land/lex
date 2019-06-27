import { AnchorButton, Divider, H5 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { newComer, user } from '@helpers/page-props';
import { Dashboard } from '@components/domains/dashboard';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import React from 'react';
import { User } from '@server/user/user.entity';

export default composePageProps(newComer.redirect('/login'), user.session)(
  () => {
    const { user } = usePageProps<{ user: User }>();
    return (
      <Page>
        <Page.Navbar />
        <Flex>
          <Page.Sider>
            <Dashboard.Switcher name={user.fullname} />
            <Divider />
            <Flex align="center" justify="space-between">
              <H5 style={{ marginBottom: 0 }}>仓库</H5>
              <AnchorButton
                icon="git-repo"
                intent="success"
                href="/repositories/new"
                text="新增"
              />
            </Flex>
            <Dashboard.Navlist
              icon="git-repo"
              dataSource={user.joinedRepositories}
              itemHref={record => `/repositories/${record.id}`}
            />
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
  },
);
