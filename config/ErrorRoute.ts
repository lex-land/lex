import Error401 from '../pages/expections/401';
import Error403 from '../pages/expections/403';
import Error404 from '../pages/expections/404';
import Error500 from '../pages/expections/500';
import Error503 from '../pages/expections/503';

const ErrorRoute = {
  401: Error401,
  403: Error403,
  404: Error404,
  500: Error500,
  503: Error503,
};

// ErrorRoute
// 只要错误码 添加进来， 就会被catch到
export default ErrorRoute;
