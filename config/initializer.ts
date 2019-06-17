import './main.less';

import 'moment/locale/zh-cn';
import { Router } from '@helpers/next-routes';
import { catchError } from '@config/error';
import moment from 'moment';

moment.locale('zh-cn');
catchError();

// FIXME: 为了解决开发环境下的样式加载问题，开发环境下会有样式闪烁问题，生产上没有
Router.events.on('routeChangeComplete', () => {
  // https://github.com/zeit/next-plugins/issues/282
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]',
    );
    const timestamp = new Date().valueOf();
    const link: any = els[0];
    link.href = `/_next/static/css/styles.chunk.css?v=${timestamp}`;
  }
});
