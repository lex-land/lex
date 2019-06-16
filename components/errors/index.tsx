import { Error401 } from './401';
import { Error403 } from './403';
import { Error404 } from './404';
import { Error500 } from './500';
import { Error503 } from './503';
import React from 'react';
import { usePageProps } from '@helpers/hooks';

const Routes = {
  401: Error401,
  500: Error500,
  404: Error404,
  403: Error403,
  503: Error503,
};

export const CATCHED_CODE = Object.keys(Routes).map(Number);
export type CatchedCode = keyof typeof Routes;

const Error = ({ code }: { code?: CatchedCode }) => {
  const { statusCode } = usePageProps<{ statusCode: CatchedCode }>();
  const Error: any = Routes[code || statusCode];
  return <Error />;
};

export default Error;
