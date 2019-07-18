import { Page } from '@/components/Page';
import React from 'react';
import { Repo } from '@/components/_to_rm_domains/repo';

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
