import { Button, Divider, H5 } from '@blueprintjs/core';
import { compose, createMany, redirect } from '@/shared/PageProps';
import { DashboardNavlist } from '@/components/DashboardNavlist';
import { DashboardSwitcher } from '@/components/DashboardSwitcher';
import { Flex } from '@/shared/Flex';
import Link from 'next/link';
import { Page } from '@/components/Page';
import React from 'react';
import { entityContext } from '@/helpers/entityContext';

const defaultUser = {
  fullname: '-',
  joinedOrganizations: [],
  ownedOrganizations: [],
  ownedRepositories: [],
  joinedRepositories: [],
};

const guard = [redirect('/login').whenNot(ctx => ctx.tokenUtil.get())];
const pageProps = createMany({
  session: entityContext('session').find('user'),
});

export default compose(
  guard,
  pageProps,
)(() => {
  const session = pageProps.use('session') || defaultUser;
  const name = session.fullname;
  const repos = [...session.ownedRepositories, ...session.joinedRepositories];

  return (
    <Page>
      <Page.Navbar />
      <Flex>
        <Page.Sider>
          <DashboardSwitcher name={name} />
          <Divider />
          <Flex align="center" justify="space-between">
            <H5 style={{ marginBottom: 0 }}>Repositories</H5>
            <Link href="/repositories/new">
              <Button icon="git-repo" intent="success" text="New" />
            </Link>
          </Flex>
          <DashboardNavlist
            icon="git-repo"
            dataSource={repos}
            itemHref="/repositories/[repository_id]"
            itemAs={record => `/repositories/${record.id}`}
          />
        </Page.Sider>
        <Page.Content>
          <Page.EmberedError visible code={503} description="正在开发中..." />
        </Page.Content>
      </Flex>
    </Page>
  );
});
