import { Button, Callout, H1 } from '@blueprintjs/core';
import Link from 'next/link';
import { Page } from '@/components/Page';
import { QuickForm } from '@/shared/QuickForm';
import React from 'react';
import { createEntityFn } from '@/helpers/entityHelper';
import { useRouter } from 'next/router';

const defaultValue = { name: '', description: '' };
type Values = typeof defaultValue;

const defaultResponse = {
  id: '',
};

type Res = typeof defaultResponse;

const createRepository = createEntityFn('repository');
const createRepositoryFn = (value: Values) => createRepository(value);

export default () => {
  const router = useRouter();
  const onCreateRepositorySuccess = (values: Values, json: Res) =>
    router.replace(`/repositories/[repository_id]`, `/repositories/${json.id}`);

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
          defaultValue={defaultValue}
          action={createRepositoryFn}
          render={() => (
            <>
              <QuickForm.Input name="name" />
              <QuickForm.Input name="description" />
              <Button type="submit" intent="success" text="Create" />
            </>
          )}
          success={onCreateRepositorySuccess}
        />
      </Page.Content>
    </Page>
  );
};
