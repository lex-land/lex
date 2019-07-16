import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Page.EmberedError visible code={503} />
      </Repo.SubPage>
    </Page>
  );
};
