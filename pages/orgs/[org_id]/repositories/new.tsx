import { compose, createMany } from '@/shared/PageProps';
import { H1 } from '@blueprintjs/core';
import { Page } from '@/components/Page';
import { QuickForm } from '@/shared/QuickForm';
import React from 'react';
import { createEntityFn } from '@/helpers/entityHelper';
import { entityContext } from '@/helpers/entityContext';
import { useRouter } from 'next/router';

const formDefaultValues = { name: '', description: '' };
const createRepository = createEntityFn('repository');

const pageProps = createMany({
  org: entityContext('organization').findOne(),
});

export default compose(pageProps)(() => {
  const { org } = pageProps.use();
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
