import { Classes, Icon, Tab, Tabs, UL } from '@blueprintjs/core';
import { Link, route } from '@helpers/route';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import React from 'react';
import { Repository } from '@server/repository/repository.entity';
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
        <Link route={`/repositories/${repo.id}`}>
          <TextLink
            aria-selected={+query.repository_id === repo.id}
            className="sider-item sider-title"
          >
            {/* <Icon icon="git-repo" /> */}
            {repo.name}
          </TextLink>
        </Link>
      </Flex>
      <RepoNavList>
        {repo.modules.map(mod => (
          <li key={mod.id}>
            <Link route={`/repositories/${repo.id}/modules/${mod.id}`}>
              <TextLink aria-selected={+query.module_id === mod.id}>
                {/* <Icon icon="cube" /> */}
                {mod.name}
              </TextLink>
            </Link>
            {+query.module_id === mod.id && (
              <RepoNavList>
                {mod.interfaces.map(inte => (
                  <li className={Classes.TEXT_OVERFLOW_ELLIPSIS} key={inte.id}>
                    <Link
                      route={`/repositories/${repo.id}/modules/${mod.id}?interface_id=${inte.id}`}
                    >
                      <TextLink
                        style={{ marginLeft: 8 }}
                        aria-selected={+query.interface_id === inte.id}
                      >
                        {/* <Icon icon="application" /> */}
                        {inte.name}
                      </TextLink>
                    </Link>
                  </li>
                ))}
                <li key="create-interface">
                  <CURD.Create
                    action="/api/interface"
                    defaultValue={{
                      method: '',
                      url: '',
                      name: '',
                      description: '',
                    }}
                    success={(values, json) =>
                      route(
                        `/repositories/${repo.id}/modules/${mod.id}?interface_id=${json.id}`,
                      ).replace()
                    }
                    drawerTitle={`New Interface In ${mod.name}`}
                    params={{ repository: repo, module: mod }}
                    actionRenderer={({ handleClick }) => (
                      <ActionLink
                        style={{ marginLeft: 8 }}
                        onClick={handleClick}
                      >
                        <Icon intent="success" icon="plus" />
                      </ActionLink>
                    )}
                  />
                </li>
              </RepoNavList>
            )}
          </li>
        ))}
        <CURD.Create
          action="/api/module"
          defaultValue={{ name: '', description: '' }}
          params={{ repository: repo }}
          success={(values, json) =>
            route(`/repositories/${repo.id}/modules/${json.id}`).replace()
          }
          drawerTitle={`New Module In ${repo.name}`}
          actionRenderer={({ handleClick }) => (
            <ActionLink onClick={handleClick}>
              <Icon intent="success" icon="plus" />
            </ActionLink>
          )}
        />
      </RepoNavList>
      <div>
        <Link route={`/repositories/${repo.id}/modules`}>
          <TextLink
            className="sider-item"
            aria-selected={router.asPath === `/repositories/${repo.id}/modules`}
          >
            <span>Modules</span>
          </TextLink>
        </Link>
      </div>
      <div>
        <Link route={`/repositories/${repo.id}/status-codes`}>
          <TextLink
            className="sider-item"
            aria-selected={
              router.asPath === `/repositories/${repo.id}/status-codes`
            }
          >
            <span>Status Codes</span>
          </TextLink>
        </Link>
      </div>
      <div>
        <Link route={`/repositories/${repo.id}/members`}>
          <TextLink
            className="sider-item"
            aria-selected={router.asPath === `/repositories/${repo.id}/members`}
          >
            <span>Members</span>
          </TextLink>
        </Link>
      </div>
      <div>
        <Link route={`/repositories/${repo.id}/settings`}>
          <TextLink
            className="sider-item"
            aria-selected={
              router.asPath === `/repositories/${repo.id}/settings`
            }
          >
            <span>Settings</span>
          </TextLink>
        </Link>
      </div>
    </RepoSiderContainer>
  );
};

export const Repo = Object.assign(() => null, {
  Nav: RepoNav,
  Sider: RepoSider,
  SubPage: styled.div`
    width: 1280px;
    margin: 0 auto;
  `,
});
