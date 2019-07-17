import ErrorRoute from '@/config/ErrorRoute';
import React from 'react';
import constants from '@/config/constants';

class ErrorBoundary extends React.Component<{
  statusCode: keyof typeof ErrorRoute;
}> {
  // static getDerivedStateFromError(error: any) {
  //   // Update state so the next render will show the fallback UI.
  //   return {};
  // }

  // componentDidCatch(error: any, info: any) {
  //   console.error(error);
  //   // You can also log the error to an error reporting service
  //   // logErrorToMyService(error, info);
  // }

  render() {
    if (constants.CATCHED_CODE.includes(this.props.statusCode)) {
      const Error = ErrorRoute[this.props.statusCode];
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
