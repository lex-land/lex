import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@/components/Page';
import React from 'react';

export default function Error500() {
  return (
    <Page>
      <Page.Error
        code={500}
        description="抱歉，服务器出错了，你可以返回首页"
        action={
          <AnchorButton href="/" intent="primary" minimal>
            返回首页
          </AnchorButton>
        }
      />
    </Page>
  );
}
