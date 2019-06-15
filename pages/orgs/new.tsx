import Error from '@components/errors';
import { H1 } from '@blueprintjs/core';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
import { SimpleForm } from '@components/forms/simple';
import { http } from '@helpers/fetch';

const OrgsCreate: NextSFC = () => {
  return (
    <Page authed>
      <div className="page lex-container">
        <H1>创建一个组织</H1>
        <SimpleForm
          defaultValue={{}}
          onSubmit={newValue => http.post('/api/organization', newValue)}
          fields={['name', 'description']}
        />
        <Error code={503} embered />
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
