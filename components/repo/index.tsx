import { Tab, Tabs } from '@blueprintjs/core';
import { Flex } from '@components/layout/flex';
import React from 'react';
import { route } from '@helpers/next-routes';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const RepoNav = () => {
  const router = useRouter();
  const query: any = router.query;
  const selectedTabId = router.route
    .split('/')
    .slice(1, 3)
    .join('/');
  const handleChange = (newId: string) => {
    route(newId).push({ repository_id: query.repository_id });
  };
  return (
    <div>
      <Tabs
        animate={false}
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
    </div>
  );
};

export const Repo = Object.assign(() => null, {
  Nav: RepoNav,
  SubPage: styled(Flex.Auto)`
    margin-top: 40px;
  `,
});
