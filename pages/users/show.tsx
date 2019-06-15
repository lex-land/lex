import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';

const UsersShow: NextSFC = () => {
  return <Page authed>NULL</Page>;
};

UsersShow.getInitialProps = async () => {
  return {
    statusCode: 503,
  };
};

export default UsersShow;
