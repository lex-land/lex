import './PageWrappedHeader.less';

import { PageHeader, Typography } from 'antd';
import { WithRouterProps, withRouter } from 'next/router';
import { Link } from '@helpers/next-routes';
import { PageHeaderProps } from 'antd/lib/page-header';
import React from 'react';
import breadcrumbs from '@config/breadcrumb.json';
import path from 'path';

function itemRender(route: any, params: any, routes: any) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link route={route.path}>
      <a>{route.breadcrumbName}</a>
    </Link>
  );
}

interface PageWrappedHeaderProps extends PageHeaderProps {
  title: any;
  content?: any;
  autoBreadcrumb?: boolean;
}

export const PageWrappedHeader = withRouter(
  (props: WithRouterProps & PageWrappedHeaderProps) => {
    const { autoBreadcrumb, ...resProps } = props;
    let breadcrumb: any = props.breadcrumb;
    if (props.router && autoBreadcrumb) {
      const pathArray = props.router.route.split('/');
      const keys: string[] = [];
      pathArray.reduce((pre, next) => {
        keys.push(path.resolve([pre, next].join('/')));
        return pre + next;
      }, '');
      breadcrumb = {
        routes: keys
          .map(pathKey => breadcrumbs.find(i => i.path === pathKey))
          .filter(Boolean),
        itemRender,
      };
    }
    return (
      <PageHeader
        {...resProps}
        breadcrumb={breadcrumb}
        title={
          <Typography.Title style={{ marginBottom: 0 }} level={4}>
            {props.title}
          </Typography.Title>
        }
      >
        {props.content && <div>{props.content}</div>}
      </PageHeader>
    );
  },
);
