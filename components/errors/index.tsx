import './error.less';
import { Error403 } from './403';
import { Error404 } from './404';
import { Error500 } from './500';
import React from 'react';
import { usePageProps } from '@core/hooks';

const Routes = {
  500: Error500,
  404: Error404,
  403: Error403,
};

export const CATCHED_CODE = Object.keys(Routes).map(Number);
export type CatchedCode = keyof typeof Routes;

export default () => {
  const { statusCode } = usePageProps<{ statusCode: CatchedCode }>();
  const Error = Routes[statusCode];
  return <Error />;
};
