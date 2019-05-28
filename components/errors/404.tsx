import './error.less';
import { Button, Col, Row } from 'antd';
import { Link } from '@helpers/next-routes';
import { Page } from '@components/layout';
import React from 'react';

export const Error404 = () => {
  return (
    <Page>
      <Row className="Error" align="middle" type="flex" justify="center">
        <Col>
          <div className="Banner">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
              alt=""
            />
          </div>
        </Col>
        <Col>
          <h1 className="h1">404</h1>
          <div className="description">抱歉，你访问的页面不存在</div>
          <Link route="/">
            <Button type="primary">返回首页</Button>
          </Link>
        </Col>
      </Row>
    </Page>
  );
};
