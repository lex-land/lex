import './error.less';
import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@components/layout';
import React from 'react';

export const Error500 = () => {
  return (
    <Page className="Error">
      <div className="title">
        <h1 className="h1">500</h1>
        <div className="description">抱歉，服务器出错了</div>
        <AnchorButton href="/" intent="primary" minimal>
          回到首页
        </AnchorButton>
      </div>
    </Page>
  );
};
