import { Callout, H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';
import { route } from '@helpers/route';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <Callout intent="primary">
          <span>之前用 Rap2 ？可以试试 </span>
          <a href="/migrations/rap2">从 Rap2 新建</a>
        </Callout>
        <br />
        <H1>创建一个仓库</H1>
        <QuickForm
          action={newValue => http.post('/api/repository', newValue)}
          fields={['name', 'description']}
          success={(values, json) =>
            route('repositories/show').replace({ repository_id: json.id })
          }
          successToast="成功创建仓库"
        />
      </Page.Content>
    </Page>
  );
};
