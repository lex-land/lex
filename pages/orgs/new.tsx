import { H1 } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { http } from '@helpers/fetch';
import { route } from '@helpers/next-routes';

const OrgsCreate: NextSFC = () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <H1>创建一个组织</H1>
        <QuickForm
          defaultValue={{ name: '', description: '' }}
          action={newValue => http.post('/api/organization', newValue)}
          fields={['name', 'description']}
          success={(values, json) =>
            route('orgs/show').replace({ org_id: json.name })
          }
        />
        <Page.EmberedError code={503} />
      </Page.Content>
    </Page>
  );
};

OrgsCreate.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default OrgsCreate;
