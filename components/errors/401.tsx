import './error.less';
import { Button } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error401 = () => {
  return (
    <Page>
      <div className="Banner">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
          alt=""
        />
      </div>
      <div>
        <h1 className="h1">401</h1>
        <div className="description">抱歉，你的身份已失效</div>
        <Link route="login">
          <Button>返回登录</Button>
        </Link>
      </div>
    </Page>
  );
};
