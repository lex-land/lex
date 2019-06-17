import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@components/page';
import React from 'react';
import { Router } from '@helpers/next-routes';

export const Error403 = () => {
  return (
    <Page>
      <Page.Error
        code={403}
        description="抱歉，你暂无此页面的访问权限，你可以返回上页"
        action={
          <AnchorButton onClick={Router.back} intent="primary" minimal>
            返回上页
          </AnchorButton>
        }
      />
    </Page>
  );
};
