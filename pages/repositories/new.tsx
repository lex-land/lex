import { Button, Callout, H1 } from '@blueprintjs/core';
import { Link, route } from '@helpers/route';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <Callout intent="primary">
          <span>Migrate from Rap2. Try </span>
          <Link route="/migrations/repo/json">
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
            route('repositories/show').replace({ repository_id: json.id })
          }
        />
      </Page.Content>
    </Page>
  );
};
