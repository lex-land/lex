import Error401 from '@/pages/expections/401';
import Error403 from '@/pages/expections/403';
import Error404 from '@/pages/expections/404';
import Error500 from '@/pages/expections/500';
import Error503 from '@/pages/expections/503';
import React from 'react';

const ErrorRoute = {
  '401': Error401,
  '403': Error403,
  '404': Error404,
  '500': Error500,
  '503': Error503,
};

// ErrorRoute
// 只要错误码 添加进来， 就会被catch到

class ErrorBoundary extends React.Component<{
  statusCode: keyof typeof ErrorRoute;
}> {
  render() {
    if (Object.keys(ErrorRoute).includes(this.props.statusCode)) {
      const Error = ErrorRoute[this.props.statusCode];
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
