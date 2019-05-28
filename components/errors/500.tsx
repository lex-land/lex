import './error.less';
import { Button, Col, Row } from 'antd';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error500 = () => {
  return (
    <Page>
      <Row className="Error" align="middle" type="flex" justify="center">
        <Col>
          <div className="Banner">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
              alt=""
            />
          </div>
        </Col>
        <Col>
          <h1 className="h1">500</h1>
          <div className="description">抱歉，服务器出错了</div>
          <Link route="/">
            <Button type="primary">返回首页</Button>
          </Link>
        </Col>
      </Row>
    </Page>
  );
};
