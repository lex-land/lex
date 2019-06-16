import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';

const Settings: NextSFC = () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.EmberedError visible code={503} />
    </Page>
  );
};

Settings.getInitialProps = async () => {
  return {
    // statusCode: 503,
  };
};

export default Settings;
