import { Button, H4 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { repo, user } from '@helpers/page-props';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';

export default composePageProps(repo, user.all)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H4>基本信息</H4>
            <QuickForm
              action={(newRepo: any) =>
                http.put(`/api/repository/${repo.id}`, newRepo)
              }
              fields={['name', 'description']}
              defaultValue={repo}
              successToast="更新仓库信息成功"
            />
            <br />
            <br />
            <Button>转移仓库所属</Button>
            <Repo.CURD.Delete
              id={repo.id}
              button={<Button>删除这个仓库</Button>}
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
