import { H1 } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms/quick';
import React from 'react';
import { http } from '@helpers/fetch';

const OrgsCreate: NextSFC = () => {
  return (
    <Page>
      <Page.Navbar />
      <div className="page lex-container">
        <H1>创建一个组织</H1>
        <QuickForm
          defaultValue={{ name: '', description: '' }}
          action={newValue => http.post('/api/organization', newValue)}
          fields={['name', 'description']}
        />
        <Page.EmberedError code={503} />
      </div>
    </Page>
  );
};

OrgsCreate.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default OrgsCreate;
