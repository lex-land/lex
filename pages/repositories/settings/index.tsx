import { Card, Divider, H4 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { Repo } from '@components/repo';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';
import { repo } from '@helpers/page-props';

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  return (
    <Page>
      <Page.Navbar />
      <Repo.Nav />
      <Repo.SubPage>
        <Card>
          <Divider />
          <H4>转移仓库所属</H4>
          <Divider />
          <H4>基本信息</H4>
          <Divider />
          <QuickForm
            action={(newRepo: any) =>
              http.put(`/api/repository/${repo.id}`, newRepo)
            }
            fields={['name', 'description']}
            defaultValue={repo}
            successToast="更新仓库信息成功"
          />
          {/* <DeleteButton
            alertWhen={true}
            icon="trash"
            action={`/api/repository/${repo.id}`}
            successGoto="/"
          /> */}
        </Card>
      </Repo.SubPage>
    </Page>
  );
});
