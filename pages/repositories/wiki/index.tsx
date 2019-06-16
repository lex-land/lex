import { NextSFC } from 'next';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/repo';

const RepositoriesWiki: NextSFC<any> = () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Container>
        <Repo.Nav />
        <Repo.SubPage>
          <Page.EmberedError visible code={503} />
        </Repo.SubPage>
      </Page.Container>
    </Page>
  );
};

RepositoriesWiki.getInitialProps = async ctx => {
  return {};
};
export default RepositoriesWiki;
