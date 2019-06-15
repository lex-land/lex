import './error.less';
import { AnchorButton, NonIdealState } from '@blueprintjs/core';
import { Page } from '@components/layout';
import React from 'react';
import { Router } from '@helpers/next-routes';

export const Error503 = ({ embered }: { embered?: boolean }) => {
  return (
    <Page className="Error">
      <div className="title">
        {embered ? (
          <div className="embered">
            <NonIdealState icon="geosearch" />
            <br />
            <div className="description">抱歉，此功能还在开发中</div>
          </div>
        ) : (
          <div>
            <h1 className="h1">503</h1>
            <div className="description">
              抱歉，此页面功能还在开发中，回到上页再看看吧
            </div>
            <AnchorButton onClick={Router.back} intent="primary" minimal>
              回到上页
            </AnchorButton>
          </div>
        )}
      </div>
    </Page>
  );
};
