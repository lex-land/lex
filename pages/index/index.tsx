import { AnchorButton, Divider, H5 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@/core/next-compose';
import { newComer, user } from '@/helpers/page-props';
import { Dashboard } from '@/components/domains/dashboard';
import { Flex } from '@/core/layout/flex';
import { Page } from '@/components/page';
import React from 'react';
import { User } from '@/helpers/interfaces/user';

export default composePageProps(newComer.redirect('/login'), user.session)(
  () => {
    const { session } = usePageProps<{ session: User }>();
    return (
      <Page>
        <Page.Navbar />
        <Flex>
          <Page.Sider>
            <Dashboard.Switcher name={session.fullname} />
            <Divider />
            <Flex align="center" justify="space-between">
              <H5 style={{ marginBottom: 0 }}>Repositories</H5>
              <AnchorButton
                icon="git-repo"
                intent="success"
                href="/repositories/new"
                text="New"
              />
            </Flex>
            <Dashboard.Navlist
              icon="git-repo"
              dataSource={session.ownedRepositories.concat(
                session.joinedRepositories,
              )}
              itemHref={record => `/repositories/${record.id}`}
            />
          </Page.Sider>
          <Page.Content>
            <Page.EmberedError visible code={503} />
          </Page.Content>
        </Flex>
      </Page>
    );
  },
);