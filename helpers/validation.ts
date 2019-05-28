import _ from 'lodash';
import { initQuery } from './initializer';

export const amountRangeValidate = (values: any, formik: any) => {
  const amountRange = initQuery(values || {}).amount_range || [];
  const formattedAmountRange = amountRange.map(Number);
  const [min, max] = formattedAmountRange;
  if (formattedAmountRange.some((i: any) => i < 0 || _.isNaN(i))) {
    return false;
  }
  if (min > max) {
    formik.setFieldError('amount_range', '最小金额不能大于最大金额');
    return false;
  }
  return true;
};
