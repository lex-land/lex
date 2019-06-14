import '../public/stylesheets/index.less';
import 'moment/locale/zh-cn';
import { Router } from '@helpers/next-routes';
import { catchError } from '@config/error';
import moment from 'moment';

moment.locale('zh-cn');
catchError();

// TODO: 目前官方修复了在canary分支，但canary分支存在问题，待合并到主分支后配合修改
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
