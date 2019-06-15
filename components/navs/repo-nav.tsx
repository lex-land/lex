import {
  Alignment,
  Breadcrumbs,
  IBreadcrumbProps,
  Navbar,
  Tab,
  Tabs,
} from '@blueprintjs/core';
import { Interface } from '@server/interface/interface.entity';
import { Module } from '@server/module/module.entity';
import React from 'react';
import { Repository } from '@server/repository/repository.entity';
import { route } from '@helpers/next-routes';
import { useRouter } from 'next/router';

const RepoNav = ({
  repo,
  mod,
  inte,
}: {
  repo?: Repository;
  mod?: Module;
  inte?: Interface;
}) => {
  const router = useRouter();
  const query: any = router.query;
  const selectedTabId = router.route
    .split('/')
    .slice(1, 3)
    .join('/');
  const handleChange = (newId: string) => {
    route(newId).push({ repository_id: query.repository_id });
  };
  const BREADCRUMBS: IBreadcrumbProps[] = [
    {
      href: `/repositories/${query.repository_id}`,
      text: repo && repo.name,
    },
    {
      href: mod && `/repositories/${query.repository_id}/modules/${mod.id}`,
      text: mod && mod.name,
    },
    { text: query.interface_id && inte && inte.name },
  ].filter(i => i.text);

  return (
    <Navbar className="repo-nav">
      <Navbar.Group>
        <Breadcrumbs items={BREADCRUMBS} />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Tabs
          id="navbar"
          large={true}
          onChange={handleChange}
          selectedTabId={selectedTabId}
        >
          <Tab id="repositories/show" title="总览" />
          <Tab id="repositories/modules" title="模块" />
          <Tab id="repositories/wiki" title="Wiki" />
          <Tab id="repositories/members" title="成员" />
          <Tab id="repositories/settings" title="设置" />
        </Tabs>
      </Navbar.Group>
    </Navbar>
  );
};

export default RepoNav;
