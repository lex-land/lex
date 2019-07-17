import { composePageProps, usePageProps } from '@/core/PageProps';
import { H1 } from '@blueprintjs/core';
import { Page } from '@/components/Page';
import { QuickForm } from '@/components/forms';
import React from 'react';
import { createEntityFn } from '@/core/EntityUtil';
import { org } from '@/helpers/page-props';
import { useRouter } from 'next/router';

const formDefaultValues = { name: '', description: '' };
const createRepository = createEntityFn('repository');

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
            createRepository({
              ...newValue,
              organization: org,
            })
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
