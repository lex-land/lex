import { Button, H1 } from '@blueprintjs/core';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { http } from '@helpers/fetch';
import { route } from '@helpers/route';

export default () => {
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
          action={newValue => http.post('/api/organization', newValue)}
          success={(values, json) =>
            route('orgs/show').replace({ org_id: json.name })
          }
        />
        <Page.EmberedError code={503} />
      </Page.Content>
    </Page>
  );
};
