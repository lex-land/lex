import { Error401 } from './401';
import { Error403 } from './403';
import { Error404 } from './404';
import { Error500 } from './500';
import { Error503 } from './503';

// ErrorRoute
// 只要错误码 添加进来， 就会被catch到
export default {
  401: Error401,
  403: Error403,
  404: Error404,
  500: Error500,
  503: Error503,
};
