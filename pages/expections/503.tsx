import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@components/page';
import React from 'react';
import { Router } from '@helpers/next-routes';

export const Error503 = () => {
  return (
    <Page>
      <Page.Error
        code={503}
        description="抱歉，此页面功能还在开发中，返回上页再看看吧"
        action={
          <AnchorButton onClick={Router.back} intent="primary" minimal>
            返回上页
          </AnchorButton>
        }
      />
    </Page>
  );
};
