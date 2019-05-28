import './show.less';
import { Col, Layout, Modal, Row, Table, Tabs, Tag } from 'antd';
import React, { Fragment } from 'react';
import { Router, route } from '@helpers/next-routes';
import { RouterProps, withRouter } from 'next/router';
import { NextContext } from 'next';
import { PageWrappedHeader } from '@components/layout';
import { genLabel } from '@helpers/locales';
import { get } from '@helpers/fetch';
import { renderLongString } from '@helpers/col-renders';
import { useAsync } from 'react-use';

const Description = ({ term, children, span = 12 }: any) => (
  <Col span={span}>
    <div className="description">
      <div className="term">{genLabel(term)}</div>
      <div className="detail">{children}</div>
    </div>
  </Col>
);

const TabPane = Tabs.TabPane;

const dataSource = [
  { key: 'stores/show', name: '经营趋势' },
  { key: 'stores/saas-orders', name: 'SaaS' },
  { key: 'stores/receipt-orders', name: '小票' },
  { key: 'stores/sunmi-orders', name: '支付' },
  { key: 'stores/devices', name: '设备活跃' },
  { key: 'stores/health', name: '健康体检' },
];

const PayModal = (props: any) => {
  const { storeId, payId } = props;
  const { loading, value: json = { data: { pay_order_number: 1 } } } = useAsync(
    () => get(`/apis/stores/${storeId}/sunmi-orders/${payId}`),
    [],
  );
  return (
    <Modal
      onCancel={() => route().replaceRemove(['pay_id'])}
      width={1000}
      footer={null}
      visible={true}
      title="支付信息"
    >
      <Table
        rowKey="pay_order_number"
        loading={loading}
        pagination={false}
        dataSource={[json.data]}
      >
        <Table.Column
          title="支付订单号"
          dataIndex="pay_order_number"
          render={renderLongString}
        />
        <Table.Column title="支付时间" dataIndex="pay_time" />
        <Table.Column title="支付金额(元)" dataIndex="pay_amount" />
        <Table.Column title="支付状态" dataIndex="pay_stat" />
        <Table.Column title="支付类型" dataIndex="trade_type" />
        <Table.Column title="收款设备" dataIndex="sn" />
        <Table.Column title="支付通道" dataIndex="pay_channel" />
      </Table>
    </Modal>
  );
};

const ReceiptModal = (props: any) => {
  const { storeId, receiptId } = props;
  const {
    loading,
    value: json = { data: { receipt_order_number: 1 } },
  } = useAsync(
    () => get(`/apis/stores/${storeId}/receipt-orders/${receiptId}`),
    [],
  );
  return (
    <Modal
      onCancel={() => route().replaceRemove(['receipt_id'])}
      width={1000}
      footer={null}
      visible={true}
      title="小票信息"
    >
      <Table
        rowKey="receipt_order_number"
        loading={loading}
        pagination={false}
        dataSource={[json.data]}
      >
        <Table.Column title="小票订单号" dataIndex="receipt_order_number" />
        <Table.Column title="交易时间" dataIndex="trade_time" />
        <Table.Column title="实收金额(元)" dataIndex="sales" />
      </Table>
    </Modal>
  );
};

const SaaSModal = (props: any) => {
  const { storeId, saasId } = props;
  const { loading, value: json = { data: { order_number: 1 } } } = useAsync(
    () => get(`/apis/stores/${storeId}/saas-orders/${saasId}`),
    [],
  );
  return (
    <Modal
      onCancel={() => route().replaceRemove(['saas_id'])}
      width={1000}
      footer={null}
      visible={true}
      title="SaaS订单信息"
    >
      <Table
        rowKey="order_number"
        loading={loading}
        pagination={false}
        dataSource={[json.data]}
      >
        <Table.Column title="SaaS订单号" dataIndex="order_number" />
        <Table.Column title="交易时间" dataIndex="trade_date" />
        <Table.Column title="交易金额(元)" dataIndex="sales" />
        <Table.Column title="支付类型" dataIndex="pay_type" />
        <Table.Column title="交易类型" dataIndex="trade_type" />
        <Table.Column title="SaaS名称" dataIndex="soft_name" />
      </Table>
    </Modal>
  );
};

export const SunmiTabs = withRouter((props: any) => {
  const router: RouterProps = props.router;
  const activeKey = router.route.substr(1) || 'stores/show';
  const payId = router.query ? router.query.pay_id : '';
  const receiptId = router.query ? router.query.receipt_id : '';
  const saasId = router.query ? router.query.saas_id : '';
  const storeId = router.query ? router.query.store_id : '';
  const handleClick = async (key: string) => {
    if (activeKey === key) {
      return;
    }
    route(key).replace({
      store_id: storeId,
    });
  };

  return (
    <Layout className="SunmiTabs">
      <Tabs activeKey={activeKey} onChange={handleClick}>
        {dataSource.map(i => (
          <TabPane tab={i.name} key={i.key} />
        ))}
      </Tabs>
      {props.children}
      {payId && <PayModal storeId={storeId} payId={payId} />}
      {receiptId && <ReceiptModal storeId={storeId} receiptId={receiptId} />}
      {saasId && <SaaSModal storeId={storeId} saasId={saasId} />}
    </Layout>
  );
});

const StoresTabs = (props: any) => {
  const store = props.store || {
    softwares: [],
    organizations: {},
  };
  return (
    <Fragment>
      <PageWrappedHeader
        className="StoresTabs"
        onBack={() => Router.back()}
        title={store.store_name}
        subTitle={store.industry}
        tags={
          store.store_stat === '已失效' ? (
            <Tag>已失效</Tag>
          ) : (
            <Tag color="#1C7ACE">履约中</Tag>
          )
        }
        footer={<SunmiTabs />}
        content={
          <div className="wrap">
            <div className="content padding">
              <Row>
                <Description term="department">
                  {store.organizations.department}
                </Description>
                <Description term="account_manager">
                  {store.organizations.account_manager}
                </Description>
                <Description term="acreage">{store.acreage}</Description>
                <Description term="softwares">
                  {store.softwares.map((software: any, index: number) => (
                    <Tag color="cyan" key={index}>
                      {software.soft_name}
                    </Tag>
                  ))}
                </Description>
                <Description term="contact_name">
                  {store.contact_name}
                </Description>
                <Description term="contact_phone">
                  {store.contact_phone}
                </Description>
                <Description term="address_detail" span={24}>
                  {store.address + store.address_detail}
                </Description>
              </Row>
            </div>
          </div>
        }
      />
      <div style={{ margin: 24 }}>{props.children}</div>
    </Fragment>
  );
};

StoresTabs.getInitialProps = async (ctx: NextContext) => {
  const query = {
    store_id: '',
    ...ctx.query,
  };
  const store = await get(`/apis/stores/${query.store_id}`);
  return {
    store: store.data,
  };
};

export { StoresTabs };
