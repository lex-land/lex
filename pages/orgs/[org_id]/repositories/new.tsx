import { composePageProps, usePageProps } from '@core/next-compose';
import { H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';
import { org } from '@helpers/page-props';
import { useRouter } from 'next/router';

const formDefaultValues = { name: '', description: '' };

export default composePageProps(org)(() => {
  const { org } = usePageProps();
  const router = useRouter();
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
            router.replace(
              '/repositories/[repository_id]',
              `/repositories/${json.id}`,
            )
          }
        />
        <Page.EmberedError visible code={503} />
      </Page.Content>
    </Page>
  );
});
