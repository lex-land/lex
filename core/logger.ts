/* eslint-disable no-console */

export const logger = {
  info: (...args: any[]) => {
    if (process.env.NODE_ENV === 'production') {
      // console.clear();
    } else {
      console.info(...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.NODE_ENV === 'production') {
      // console.clear();
    } else {
      console.error(...args);
    }
  },
};
