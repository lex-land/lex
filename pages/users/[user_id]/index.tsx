import { H1 } from '@blueprintjs/core';
import { Page } from '@/components/Page';
import React from 'react';

export default () => {
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <H1>个人中心</H1>
        <Page.EmberedError code={503} />
      </Page.Content>
    </Page>
  );
};
