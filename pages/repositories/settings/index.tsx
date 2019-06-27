import { Button, Divider, H4 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';
import { repo } from '@helpers/page-props';

const formDefaultValues = { name: '', description: '' };
export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H4>转移仓库所属</H4>
            <Divider />
            <H4>基本信息</H4>
            <Divider />
            <QuickForm
              action={(newRepo: any) =>
                http.put(`/api/repository/${repo.id}`, newRepo)
              }
              defaultValue={formDefaultValues}
              successToast="更新仓库信息成功"
            />
            <Repo.CURD.Delete button={<Button>删除这个仓库</Button>} />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
