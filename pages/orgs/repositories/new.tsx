import { composePageProps, usePageProps } from '@core/next-compose';
import { H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';
import { org } from '@helpers/page-props';
import { route } from '@helpers/route';

const formDefaultValues = { name: '', description: '' };

export default composePageProps(org)(() => {
  const { org } = usePageProps();
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <H1>创建一个仓库</H1>
        <QuickForm
          defaultValue={formDefaultValues}
          action={newValue =>
            http.post('/api/repository', { ...newValue, organization: org })
          }
          success={(values, json) =>
            route('repositories/show').replace({ repository_id: json.id })
          }
        />
        <Page.EmberedError visible code={503} />
      </Page.Content>
    </Page>
  );
});
