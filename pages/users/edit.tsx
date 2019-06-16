import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';

const UsersEdit: NextSFC = () => {
  return <Page>NULL</Page>;
};

UsersEdit.getInitialProps = async () => {
  return {
    statusCode: 503,
  };
};

export default UsersEdit;
