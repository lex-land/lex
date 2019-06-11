import './error.less';
import { Button } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error404 = () => {
  return (
    <Page>
      <div className="Banner">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
          alt=""
        />
      </div>
      <div>
        <h1 className="h1">404</h1>
        <div className="description">抱歉，你访问的页面不存在</div>
        <Link route="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </Page>
  );
};
