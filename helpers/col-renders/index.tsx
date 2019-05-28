import { Icon, Popover, Tag, Typography } from 'antd';
import { Link, genId } from '@helpers/next-routes';
import { FieldKey } from '@helpers/constants';
import React from 'react';
import _ from 'lodash';
import { genLabel } from '@helpers/locales';
import numeral from 'numeral';

export const renderNumber = (num: number) => numeral(num).format('0,0.00');

export const renderRank = (record: any, _record: any, index: number) =>
  index + 1;

export const linkToShow = (key: string, locales: string = '详情') => (
  ctx: any,
  record: any,
) => (
  <span>
    <Link
      route={[key, 'show'].join('/')}
      params={{ [genId(key)]: record[genId(key)] || 0 }}
    >
      <a
        style={{ fontFamily: 'PingFangSC-Medium', fontWeight: 500 }}
        href="javascript:;"
      >
        {record[key] || record[locales] || locales}
      </a>
    </Link>
  </span>
);

export const linkToStoresShow = linkToShow('stores', 'store_name');

export const renderDataIndex = (dataIndex: FieldKey, title?: string) => {
  return {
    title: title || genLabel(dataIndex),
    dataIndex: dataIndex,
    render: (value: string) => (['', null].includes(value) ? '--' : value),
  };
};

export const storeStatusTags = (tags: string[]) => (
  <span>
    {tags.map(tag => {
      let color = tag.length > 5 ? 'geekblue' : 'green';
      if (tag === 'loser') {
        color = 'volcano';
      }
      return (
        <Tag color={color} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      );
    })}
  </span>
);

export function renderLongString(str: string, limmit: number = 10) {
  if (!str) {
    return '--';
  }
  if (str.length > 10) {
    return (
      <Popover content={str}>
        {str.substring(0, _.isNumber(limmit) ? limmit : 10)}...
      </Popover>
    );
  } else {
    return str;
  }
}

export function formatLongNumber(str: number): any {
  const numStr = String(str);
  if (numStr.length > 9) {
    return <Popover content={numStr}>{numStr.substring(0, 9)}...</Popover>;
  } else {
    return str.toLocaleString('en-US');
  }
}

export function toLocaleStringEnUS(str: number): any {
  return str.toLocaleString('en-US');
}

export const formatGrowthRate = (rate: any) => {
  if (rate === '') {
    return `--`;
  }
  return `${rate * 100}%`;
};

export const renderGrowthRate = (rate: number | string) => {
  if (rate === '') {
    return `--`;
  }
  if (+rate === 0) {
    return `${Math.abs(+rate * 100)}%`;
  }
  const str = Math.abs(+rate * 100).toFixed(2);
  if (rate > 0) {
    return (
      <span style={{ color: '#f5222d' }}>
        {str}%
        <Icon type="caret-up" />
      </span>
    );
  } else {
    return (
      <span style={{ color: 'rgb(82, 196, 26)' }}>
        {str}%
        <Icon type="caret-down" />
      </span>
    );
  }
};

export const showTotal = (value: any) => (
  <Typography.Text>
    共搜索到
    <Typography.Text strong> {value} </Typography.Text>
    条数据
  </Typography.Text>
);
