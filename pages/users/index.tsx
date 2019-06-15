import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const Users: NextSFC = () => {
  return <Page authed>NULL</Page>;
};

Users.getInitialProps = async () => {
  return {
    statusCode: 503,
  };
};

export default Users;
