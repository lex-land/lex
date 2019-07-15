/* eslint-disable no-console */

export const logger = {
  info: (...args: any[]) => {
    if (process.env.NODE_ENV === 'production') {
      console.info(...args);
    } else {
      console.info(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'production') {
      console.error(...args);
    } else {
      console.error(...args);
    }
  },
};
