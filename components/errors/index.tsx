import './error.less';
import { Error403 } from './403';
import { Error404 } from './404';
import { Error500 } from './500';
import React from 'react';
import { getToken } from '@helpers/secure';
import { logger } from '@core/logger';

const Routes = {
  500: Error500,
  404: Error404,
  1003: Error403,
  1004: Error404,
  '-1': Error500,
};

export type RouteCode = keyof typeof Routes;

export default (props: any) => {
  const statusCode: RouteCode = props.statusCode;
  logger.error(props.error);
  const token = getToken();
  if (token) {
    const Error = Routes[statusCode];
    return <Error />;
  } else {
    const Error = Routes[1003];
    return <Error />;
  }
};
