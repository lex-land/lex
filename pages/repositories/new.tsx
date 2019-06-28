import { Callout, H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';
import { route } from '@helpers/route';

export default () => {
  const formDefaultValues = { name: '', description: '' };
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <Callout intent="primary">
          <span>Migrate from Rap2. Try </span>
          <a href="/migrations/json">Migrate from JSON</a>
        </Callout>
        <br />
        <H1>Create A FreeStyle Repository</H1>
        <QuickForm
          action={newValue => http.post('/api/repository', newValue)}
          defaultValue={formDefaultValues}
          success={(values, json) =>
            route('repositories/show').replace({ repository_id: json.id })
          }
          successToast="成功创建仓库"
        />
      </Page.Content>
    </Page>
  );
};
