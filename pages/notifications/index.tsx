import { Page } from '@components/page';
import React from 'react';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.EmberedError visible code={503} />
    </Page>
  );
};
