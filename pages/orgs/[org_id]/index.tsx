import { AnchorButton, Button, Divider, H5 } from '@blueprintjs/core';
import { compose, createMany } from '@/shared/PageProps';
import { CURD } from '@/components/CURD';
import { DashboardNavlist } from '@/components/DashboardNavlist';
import { DashboardSwitcher } from '@/components/DashboardSwitcher';
import { Flex } from '@/shared/Flex';
import Link from 'next/link';
import { Organization } from '@/interfaces/Organization';
import { Page } from '@/components/Page';
import React from 'react';
import { entityContext } from '@/helpers/entityContext';
import { useRouter } from 'next/router';

const pageProps = createMany({
  org: entityContext('organization').findOne('org_id'),
});

export default compose(pageProps)(() => {
  const org = pageProps.use<Organization>('org');
  const router = useRouter();
  return (
    <Page>
      <Page.Navbar />
      <Flex>
        <Page.Sider>
          <DashboardSwitcher name={org.name} />
          <Divider />
          <Flex align="center" justify="space-between">
            <H5 style={{ marginBottom: 0 }}>仓库</H5>
            <Link
              href={`/orgs/[org_id]/repositories/new`}
              as={`/orgs/${org.name}/repositories/new`}
            >
              <Button icon="git-repo" intent="success" text="新增" />
            </Link>
          </Flex>
          <DashboardNavlist
            icon="git-repo"
            dataSource={org.repositories}
            itemHref="/repositories/[repository_id]"
            itemAs={record => `/repositories/${record.id}`}
          />
        </Page.Sider>
        <Flex.Auto>
          <Page.Content>
            <AnchorButton minimal intent="primary">
              编辑
            </AnchorButton>
            <CURD.Delete
              alertWhen
              action={`/api/organization/${org.id}`}
              success={() => router.replace('/')}
              actionRenderer={({ handleClick }) => (
                <Button
                  onClick={handleClick}
                  intent="danger"
                  minimal
                  text="退出并删除这个组织"
                />
              )}
            />
            <Page.EmberedError visible code={503} />
          </Page.Content>
        </Flex.Auto>
      </Flex>
    </Page>
  );
});
