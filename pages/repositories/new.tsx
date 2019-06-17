import { H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { http } from '@helpers/fetch';
import { route } from '@helpers/route';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <H1>创建一个仓库</H1>
        <QuickForm
          action={newValue => http.post('/api/repository', newValue)}
          fields={['name', 'description']}
          success={(values, json) =>
            route('repositories/show').replace({ repository_id: json.id })
          }
          successToast="成功创建仓库"
        />
        <Page.EmberedError visible code={503} />
      </Page.Content>
    </Page>
  );
};
