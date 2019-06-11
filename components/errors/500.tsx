import './error.less';
import { Button } from '@blueprintjs/core';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error500 = () => {
  return (
    <Page>
      <div className="Banner">
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
          alt=""
        />
      </div>
      <div>
        <h1 className="h1">500</h1>
        <div className="description">抱歉，服务器出错了</div>
        <Link route="/">
          <Button>返回首页</Button>
        </Link>
      </div>
    </Page>
  );
};
