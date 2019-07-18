import { AnchorButton, Button, Divider, H5 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@/shared/PageProps';
import { CURD } from '@/components/CURD';
import { DashboardNavlist } from '@/components/DashboardNavlist';
import { DashboardSwitcher } from '@/components/DashboardSwitcher';
import { Flex } from '@/shared/Flex';
import { Organization } from '@/interfaces/Organization';
import { Page } from '@/components/Page';
import React from 'react';
import { org } from '@/helpers/_to_rm_page-props';
import { useRouter } from 'next/router';

export default composePageProps(org)(() => {
  const { org } = usePageProps<{ org: Organization }>();
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
            <AnchorButton
              icon="git-repo"
              intent="success"
              href={`/orgs/${org.name}/repositories/new`}
              text="新增"
            />
          </Flex>
          <DashboardNavlist
            icon="git-repo"
            dataSource={org.repositories}
            itemHref={record => `/repositories/${record.id}`}
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
