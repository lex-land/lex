import { Button, H1 } from '@blueprintjs/core';
import { Page } from '@/components/Page';
import { QuickForm } from '@/shared/QuickForm';
import React from 'react';
import { createEntityFn } from '@/helpers/entityHelper';
import { useRouter } from 'next/router';

const createOrganization = createEntityFn('organization');

export default () => {
  const router = useRouter();
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <H1>创建一个组织</H1>
        <QuickForm
          defaultValue={{ name: '', description: '' }}
          render={() => (
            <>
              <QuickForm.Input name="name" />
              <QuickForm.Input name="description" />
              <Button intent="success" type="submit" text="Create" />
            </>
          )}
          action={newValue => createOrganization(newValue)}
          success={(values, json) =>
            router.replace(`/orgs/[org_id]`, `/orgs/${json.name}`)
          }
        />
        <Page.EmberedError code={503} />
      </Page.Content>
    </Page>
  );
};
