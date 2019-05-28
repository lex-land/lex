import './error.less';
import { Button, Col, Row } from 'antd';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error403 = () => {
  return (
    <Page>
      <Row className="Error" align="middle" type="flex" justify="center">
        <Col>
          <div className="Banner">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
              alt=""
            />
          </div>
        </Col>
        <Col>
          <h1 className="h1">403</h1>
          <div className="description">抱歉，你的登录身份失效了</div>
          <Link route="/login">
            <Button type="primary">重新登录</Button>
          </Link>
        </Col>
      </Row>
    </Page>
  );
};
