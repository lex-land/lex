import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';

const UsersSettings: NextSFC = () => {
  return (
    <Page>
      <Page.EmberedError code={503} />
    </Page>
  );
};

UsersSettings.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default UsersSettings;
