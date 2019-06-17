// http://www.counect.com/en-us/?support_data_analytics
export const LOCALES = {
  store_id: '商户ID',
  industry: '业态名称',
  department: '所属部门',
  account_manager: '客户经理',
  store_status: '商户状态',
  store_stat: '商户状态',
  health_stat: '健康状态',
  yesterday_health: '昨日体检',
  '30d_sales': '近30日交易额(元)',
  '30d_compare_rate': '近30日环比率',
  current: '当前页',
  page_size: '显示条数',
};

export type FieldKey = keyof typeof LOCALES;

export const genLabel = (id: string) => LOCALES[id as FieldKey];
