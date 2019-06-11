import './error.less';
import { Button } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error403 = () => {
  return (
    <Page>
      <div>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
          alt=""
        />
      </div>
      <div>
        <h1 className="h1">403</h1>
        <div className="description">抱歉，你的登录身份失效了</div>
        <Link route="/login">
          <Button>重新登录</Button>
        </Link>
      </div>
    </Page>
  );
};
