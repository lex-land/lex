import { Page } from '@/components/Page';
import React from 'react';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.EmberedError visible code={503} />
    </Page>
  );
};
