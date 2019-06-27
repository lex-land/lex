import { Flex } from '@components/layout/flex';
import { H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { composePageProps } from '@core/next-compose';
import { http } from '@helpers/fetch';
import { repo } from '@helpers/page-props';
import { route } from '@helpers/route';

export default composePageProps(repo)(() => {
  const formDefaultValues = { name: '', description: '' };
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>创建一个模块</H1>
            <QuickForm
              action={newValue => http.post('/api/repository', newValue)}
              defaultValue={formDefaultValues}
              success={(values, json) =>
                route('repositories/show').replace({ repository_id: json.id })
              }
              successToast="成功创建仓库"
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
