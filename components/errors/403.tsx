import './error.less';
import { AnchorButton } from '@blueprintjs/core';
import { Page } from '@components/layout';
import React from 'react';
import { Router } from '@helpers/next-routes';

export const Error403 = () => {
  return (
    <Page className="Error">
      <div className="title">
        <h1 className="h1">403</h1>
        <div className="description">抱歉，你暂无此页面的访问权限</div>
        <AnchorButton onClick={Router.back} intent="primary" minimal>
          回到上页
        </AnchorButton>
      </div>
    </Page>
  );
};
