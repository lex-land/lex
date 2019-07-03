import 'moment/locale/zh-cn';
import { onUnhandledrejection, onWindowError } from '@config/error';
import moment from 'moment';

moment.locale('zh-cn');

if (typeof window !== 'undefined') {
  window.onerror = onWindowError;
  window.addEventListener('unhandledrejection', onUnhandledrejection);
}
