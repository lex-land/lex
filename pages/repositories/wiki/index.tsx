import { NextSFC } from 'next';
import { Page } from '@components/layout';
import React from 'react';
// import { Repository } from '@server/repository/repository.entity';
// import { http } from '@helpers/fetch';

const RepoWiki: NextSFC = () => <Page authed>NULL</Page>;

RepoWiki.getInitialProps = async ctx => {
  return {
    statusCode: 503,
  };
};

export default RepoWiki;
