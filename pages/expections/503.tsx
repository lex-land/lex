import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@components/page';
import React from 'react';
import { useRouter } from 'next/router';

export const Error503 = () => {
  const router = useRouter();
  return (
    <Page>
      <Page.Error
        code={503}
        description="抱歉，此页面功能还在开发中，返回上页再看看吧"
        action={
          <AnchorButton onClick={router.back} intent="primary" minimal>
            返回上页
          </AnchorButton>
        }
      />
    </Page>
  );
};
