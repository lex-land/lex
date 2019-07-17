// import 'moment/locale/zh-cn';
// import moment from 'moment';
// moment.locale('zh-cn');
import { logger } from '@/core/logger';

function reportError(_error: any) {
  logger.error(_error);
}

// fetch异常
const onUnhandledrejection = (e: any) => {
  if (process.env.SUNMI_ENV === 'pub') {
    reportError(e);
    e.preventDefault();
  }
};

const onWindowError = (e: any) => {
  if (process.env.SUNMI_ENV === 'pub') {
    reportError(e);
    e.preventDefault();
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('error', onWindowError);
  window.addEventListener('unhandledrejection', onUnhandledrejection);
}
