import { Classes, Icon, Tab, Tabs, UL } from '@blueprintjs/core';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Inte } from '../inte';
import { Mod } from '../mod';
import React from 'react';
import { Repository } from '@server/repository/repository.entity';
import { route } from '@helpers/route';
import styled from 'styled-components';
import { usePageProps } from '@core/next-compose';
import { useQuery } from '@helpers/hooks';
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
        <Tab disabled id="repositories/wiki" title="Wiki" />
        <Tab id="repositories/members" title="成员" />
        <Tab id="repositories/settings" title="设置" />
      </Tabs>
    </div>
  );
};

const RepoSiderContainer = styled.div`
  width: 20%;
  padding: 24px 32px;
  font-size: 15px;
  font-family: Graphik LCG Web, Graphik Arabic Web Regular, -apple-system,
    BlinkMacSystemFont, Helvetica Neue, Helvetica, Arial, Lucida Grande,
    Sans-Serif;
  .sider-item {
    margin: 5px 0;
  }
  .sider-title {
    color: #1c1e21;
  }
`;

const TextLink = styled.a`
  color: ${props => (props['aria-selected'] ? '#106ba3' : '#4b4f56')};
  margin: 2px 0;
  display: inline-block;
  font-weight: 500;
  svg {
    margin-right: 5px;
  }
`;

const ActionLink = styled(TextLink)``;

const RepoNavList = styled(UL)`
  padding-left: 0;
  list-style: none;
`;

const RepoSider = () => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const router = useRouter();
  const query = useQuery();
  return (
    <RepoSiderContainer>
      <Flex justify="space-between" align="center">
        <TextLink
          aria-selected={+query.repository_id === repo.id}
          href={`/repositories/${repo.id}`}
          className="sider-item sider-title"
        >
          {/* <Icon icon="git-repo" /> */}
          {repo.name}
        </TextLink>
      </Flex>
      <RepoNavList>
        {repo.modules.map(mod => (
          <li key={mod.id}>
            <TextLink
              aria-selected={+query.module_id === mod.id}
              href={`/repositories/${repo.id}/modules/${mod.id}`}
            >
              {/* <Icon icon="cube" /> */}
              {mod.name}
            </TextLink>
            {+query.module_id === mod.id && (
              <RepoNavList>
                {mod.interfaces.map(inte => (
                  <li className={Classes.TEXT_OVERFLOW_ELLIPSIS} key={inte.id}>
                    <TextLink
                      style={{ marginLeft: 8 }}
                      aria-selected={+query.interface_id === inte.id}
                      href={`/repositories/${repo.id}/modules/${mod.id}?interface_id=${inte.id}`}
                    >
                      {/* <Icon icon="application" /> */}
                      {inte.name}
                    </TextLink>
                  </li>
                ))}
                <li key="create-interface">
                  <Inte.CURD.Create
                    params={{ repository: repo, module: mod }}
                    button={
                      <ActionLink style={{ marginLeft: 8 }}>
                        <Icon intent="success" icon="plus" />
                        {/* <span>新增</span> */}
                      </ActionLink>
                    }
                  />
                </li>
              </RepoNavList>
            )}
          </li>
        ))}
        <Mod.CURD.Create
          params={{ repository: repo }}
          button={
            <ActionLink>
              <Icon intent="success" icon="plus" />
            </ActionLink>
          }
        />
      </RepoNavList>
      <div>
        <TextLink
          className="sider-item"
          aria-selected={router.asPath === `/repositories/${repo.id}/members`}
          href={`/repositories/${repo.id}/members`}
        >
          <span>成员</span>
        </TextLink>
      </div>
      <div>
        <TextLink
          className="sider-item"
          aria-selected={router.asPath === `/repositories/${repo.id}/settings`}
          href={`/repositories/${repo.id}/settings`}
        >
          <span>设置</span>
        </TextLink>
      </div>
    </RepoSiderContainer>
  );
};

const RepoCURD = {
  Create: ({ button }: { button: any }) => (
    <CURD.Create
      action="/api/repository"
      fields={['name', 'description']}
      button={button}
      successForceReload
    />
  ),
  Update: ({
    id,
    button,
    defaultValue,
  }: {
    id: number;
    button: any;
    defaultValue: any;
  }) => (
    <CURD.Update
      action={`/api/repository/${id}`}
      fields={['name', 'description']}
      defaultValue={defaultValue}
      button={button}
      successForceReload
    />
  ),
  Delete: ({ id, button }: any) => (
    <CURD.Delete
      successGoto="/"
      action={`/api/repository/${id}`}
      button={button}
      alertWhen
    />
  ),
};

export const Repo = Object.assign(() => null, {
  Nav: RepoNav,
  Sider: RepoSider,
  SubPage: styled.div`
    width: 1280px;
    margin: 0 auto;
  `,
  CURD: RepoCURD,
});
