import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/repo';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Repo.Nav />
      <Repo.SubPage>
        <Page.EmberedError visible code={503} />
      </Repo.SubPage>
    </Page>
  );
};
