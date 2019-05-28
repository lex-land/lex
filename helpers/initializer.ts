const initArray = (obj: any, fieldKey: string) => ({
  [fieldKey]:
    typeof obj[fieldKey] === 'string' && obj[fieldKey]
      ? obj[fieldKey].split('/')
      : obj[fieldKey],
});

export const initQuery = (obj: any) => {
  const target = {
    ...obj,
    ...initArray(obj, 'pay_time'),
    ...initArray(obj, 'amount_range'),
    ...initArray(obj, 'department'),
    ...initArray(obj, 'trade_time'),
    ...initArray(obj, 'date_range'),
  };
  Object.keys(target).forEach((key: string) => {
    if (!target[key]) {
      delete target[key];
    }
  });
  return target;
};
