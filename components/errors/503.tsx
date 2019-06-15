import './error.less';
import { Button, NonIdealState } from '@blueprintjs/core';
import React from 'react';
import { Router } from '@helpers/next-routes';

export const Error503 = () => {
  return (
    <NonIdealState
      icon="geosearch"
      title="正在开发中"
      description="当前功能还在开发中，回到首页再看看吧"
      action={
        <Button
          intent="warning"
          onClick={Router.back}
          minimal
          text="返回上页"
        />
      }
    />
  );
};
