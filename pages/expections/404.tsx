import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@components/page';
import React from 'react';
import { Router } from '@helpers/next-routes';

export const Error404 = () => {
  return (
    <Page>
      <Page.Error
        code={404}
        description="抱歉，你的访问的网页未找到，你可以返回上页"
        action={
          <AnchorButton onClick={Router.back} intent="primary" minimal>
            返回上页
          </AnchorButton>
        }
      />
    </Page>
  );
};
