import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const UsersEdit: NextSFC = () => {
  return <Page authed>NULL</Page>;
};

UsersEdit.getInitialProps = async () => {
  return {
    statusCode: 503,
  };
};

export default UsersEdit;
