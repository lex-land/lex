import { Anchor, NoData } from '@core/components';
import { Axis, Chart, Coord, Geom, Legend, Tooltip } from 'bizcharts';
import { Icon, Radio } from 'antd';
import React, { useState } from 'react';
import DataSet from '@antv/data-set';
import _ from 'lodash';
import { genLabel } from '@helpers/locales';
import { useToggle } from 'react-use';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const fieldsMap: any = {
  store_num: ['stock_store_num', 'increase_store_num'],
  sales: ['sales'],
  transaction: ['transaction'],
  ats: ['ats'],
  spm: ['spm'],
};

export default (props: { dataSource: any[] }) => {
  const [activeX, setActiveX] = useState('store_num');
  const perItemHeight = 80;
  const [on, toggle] = useToggle(false);
  const dataSource = on ? props.dataSource : props.dataSource.slice(0, 5);
  const currentHeight = dataSource.length * perItemHeight + 50;
  if (!dataSource.length) {
    return <NoData />;
  }
  const sourceData = dataSource
    .map(i => {
      return { ...i, ..._.mapKeys(i, (value, key) => genLabel(key)) };
    })
    .reverse();
  const dv = new DataSet.View().source(sourceData);
  dv.transform({
    type: 'fold',
    fields: fieldsMap[activeX].map(genLabel),
    key: '字段',
    value: activeX,
    retains: ['industry_name'],
  });
  const data = dv.rows;
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <RadioGroup value={activeX} onChange={e => setActiveX(e.target.value)}>
          <RadioButton value="store_num">商户数(家)</RadioButton>
          <RadioButton value="sales">交易额(元)</RadioButton>
          <RadioButton value="transaction">交易数(笔)</RadioButton>
          <RadioButton value="ats">单笔交易额 (元/笔)</RadioButton>
          <RadioButton value="spm">坪效(元/m2)</RadioButton>
        </RadioGroup>
      </div>
      <div>
        <Chart
          height={currentHeight}
          data={data}
          padding={[40, 150, 25, 120]}
          forceFit
        >
          <Legend offsetX={0} offsetY={-30} position="right-top" />
          <Coord transpose />
          <Axis name="industry_name" label={{ offset: 12 }} />
          <Axis name={activeX} />
          <Tooltip />
          <Geom
            type="intervalStack"
            position={`industry_name*${activeX}`}
            color={['字段', ['#1C7ACE', '#13c2c2']]}
          />
        </Chart>
      </div>
      <div style={{}}>
        <Anchor disabled={dataSource.length <= 5} onClick={() => toggle(!on)}>
          {on ? '收起' : '展开'}
          <Icon type={on ? 'up' : 'down'} />
        </Anchor>
      </div>
    </div>
  );
};
