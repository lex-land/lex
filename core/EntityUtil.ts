import { useEffect, useState } from 'react';
import { createHttpUtil } from './HttpUtil';
import { throttle } from 'lodash';

const httpUtil = createHttpUtil();

export const createThrottled = (fn: any) => throttle(fn, 3000);

export const updateEntityFn = (entity: string) => (id: number, query: any) => {
  httpUtil.put(`/api/${entity}/${id}`, query);
};

export const createEntityFn = (entity: string) => (query: any) =>
  httpUtil.post(`/api/${entity}`, query);

export const getEntityFn = (entity: string) => (id: number) =>
  httpUtil.get(`/api/${entity}/${id}`);

export const deleteEntityFn = (entity: string) => (id: number) =>
  httpUtil.delete(`/api/${entity}/${id}`);

export const throttledUpdateEntityFn = createThrottled(updateEntityFn);

export const useEntity = (entity: any, curd?: (newValue: any) => any) => {
  const [entityValue, setEntityValue] = useState(entity);
  const setValue = (newValue: Partial<any>) => {
    curd && curd(newValue);
    setEntityValue({ ...entityValue, ...newValue });
  };
  useEffect(() => setEntityValue(entity), [entity, entity.id]);
  return { value: entityValue, setValue };
};
