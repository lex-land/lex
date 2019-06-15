import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const UsersSettings: NextSFC = () => {
  return <Page authed>NULL</Page>;
};

UsersSettings.getInitialProps = async () => {
  return {
    statusCode: 503,
  };
};

export default UsersSettings;
