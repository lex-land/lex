import { Axis, Chart, Geom, Legend, Tooltip } from 'bizcharts';
import React, { useState } from 'react';
import { Radio } from 'antd';
import _ from 'lodash';
import { genLabel } from '@helpers/locales';
import moment from 'moment';

const DataSet = require('@antv/data-set');

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default ({ dataSource }: { dataSource: any[] }) => {
  const [activeX, setActiveX] = useState('sales');
  const fieldsMap: any = {
    sales: ['saas_sales', 'receipt_sales', 'sunmi_sales'],
    transaction: [
      'saas_transaction',
      'receipt_transaction',
      'sunmi_transaction',
    ],
    ats: ['saas_ats', 'receipt_ats', 'sunmi_ats'],
    spm: ['saas_spm', 'receipt_spm', 'sunmi_spm'],
  };

  const sourceData = dataSource
    .map((i: any) => {
      const target = _.pick(i, ['time', ...fieldsMap[activeX]]);
      return _.mapKeys(target, (value, key) => genLabel(key));
    })
    .map(i => ({
      ...i,
      时间:
        i['时间'].length > 10
          ? `${moment(i['时间']).format('H点')}~${moment(i['时间'])
              .add(1, 'hour')
              .format('H点')}`
          : i['时间'],
    }));
  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'fold',
    fields: fieldsMap[activeX].map(genLabel),
    key: 'city',
    value: activeX,
  });

  const data = dv.rows;
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <RadioGroup value={activeX} onChange={e => setActiveX(e.target.value)}>
          <RadioButton value="sales">交易额(元)</RadioButton>
          <RadioButton value="transaction">交易数(笔)</RadioButton>
          <RadioButton value="ats">单笔交易额 (元/笔)</RadioButton>
          <RadioButton value="spm">坪效(元/m2)</RadioButton>
        </RadioGroup>
      </div>
      <Chart
        // animate={false}
        height={500}
        data={data}
        padding={[40, 80, 80, 80]}
        scale={{
          时间: {
            tickCount: 8,
          },
          [activeX]: {
            tickCount: 10,
          },
        }}
        forceFit
      >
        <Legend />
        <Axis name="时间" />
        {/* <Axis name={activeX} /> */}
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom
          type="line"
          position={`时间*${activeX}`}
          size={2}
          color={['city', ['#1C7ACE', '#13c2c2', '#E8B23A', '#EF7A88']]}
          shape={'smooth'}
        />
        <Geom
          type="point"
          position={`时间*${activeX}`}
          size={4}
          color={['city', ['#1C7ACE', '#13c2c2', '#E8B23A', '#EF7A88']]}
          style={{ stroke: '#fff', lineWidth: 1 }}
          shape="circle"
        />
      </Chart>
    </div>
  );
};
