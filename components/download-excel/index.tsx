import React, { useState } from 'react';
import { Anchor } from '@core/components';
import { FieldKey } from '@helpers/constants';
import XLSX from 'xlsx';
import _ from 'lodash';
import { genLabel } from '@helpers/locales';
import { get } from '@helpers/fetch';
import { initQuery } from '@helpers/initializer';
import { logger } from '@core/logger';
import { message } from 'antd';
import moment from 'moment';

async function toExcel(json: any, fields: string[], filename: string) {
  /* generate workbook */
  const ws = XLSX.utils.aoa_to_sheet(
    [fields.map(field => genLabel(field))].concat(
      json.map((i: any) => Object.values(_.pick(i, fields))),
    ),
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
  XLSX.writeFile(wb, filename);
}

interface DownloadExcelProps {
  action: any;
  params?: any;
  disabled?: boolean;
  children?: any;
  total?: number;
  at?: string;
  fields: FieldKey[];
  filename: string;
  formatter?: (json: any) => any;
}

export function DownloadExcel(props: DownloadExcelProps) {
  const formatter = props.formatter ? props.formatter : (j: any) => j;
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    setLoading(true);
    try {
      const json = await get(
        props.action,
        initQuery({
          ...props.params,
          current: 1,
          page_size: props.total,
        }),
      );
      const [results] = _.at(json, [props.at || 'data.results']);
      await toExcel(
        results.map(formatter),
        props.fields,
        `${moment().format('YYYYMMDD')}${props.filename}`,
      );
    } catch (error) {
      logger.error(error);
      message.error('导出失败');
    }
    setLoading(false);
  };
  return (
    <Anchor
      style={{
        fontFamily: 'PingFangSC-Medium',
        fontWeight: 500,
      }}
      disabled={loading || props.disabled || props.total === 0}
      onClick={handleExport}
      type="primary"
    >
      <span>{loading ? '下载中...' : props.children}</span>
    </Anchor>
  );
}
