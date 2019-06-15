import Error from '@components/errors';
import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const UsersSettings: NextSFC = () => {
  return (
    <Page authed>
      <Error code={503} embered />
    </Page>
  );
};

UsersSettings.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default UsersSettings;
