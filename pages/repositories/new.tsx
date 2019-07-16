import { Button, Callout, H1 } from '@blueprintjs/core';
import Link from 'next/link';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <Callout intent="primary">
          <span>Migrate from Rap2. Try </span>
          <Link href="/migrations/repo/json">
            <a>Migrate From JSON</a>
          </Link>
        </Callout>
        <br />
        <H1>New Repository</H1>
        <QuickForm
          action={newValue => http.post('/api/repository', newValue)}
          render={() => (
            <>
              <QuickForm.Input name="name" />
              <QuickForm.Input name="description" />
              <Button type="submit" intent="success" text="Create" />
            </>
          )}
          success={(values, json) =>
            router.replace(
              `/repositories/[repository_id]`,
              `/repositories/${json.id}`,
            )
          }
        />
      </Page.Content>
    </Page>
  );
};
