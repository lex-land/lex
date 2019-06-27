import 'moment/locale/zh-cn';
import { onUnhandledrejection, onWindowError } from '@config/error';
import hljs from 'highlight.js';
import moment from 'moment';

moment.locale('zh-cn');

if (typeof window !== 'undefined') {
  window.onerror = onWindowError;
  window.addEventListener('unhandledrejection', onUnhandledrejection);
  hljs.initHighlightingOnLoad();
}
