import { Classes, Icon, UL } from '@blueprintjs/core';
import { CURD } from '@/components/CURD';
import { Flex } from '@/shared/Flex';
import Link from 'next/link';
import React from 'react';
import { Repository } from '@/interfaces/Repository';
import styled from 'styled-components';
import { usePageProps } from '@/shared/PageProps';
import { useRouter } from 'next/router';

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
  const repo = usePageProps<Repository>('repo') || {
    modules: [],
  };
  const router = useRouter();
  return (
    <RepoSiderContainer>
      <Flex justify="space-between" align="center">
        <Link
          href={`/repositories/[repository_id]`}
          as={`/repositories/${repo.id}`}
        >
          <TextLink
            aria-selected={+router.query.repository_id === repo.id}
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
            <Link
              href={`/repositories/[repository_id]/modules/[module_id]`}
              as={`/repositories/${repo.id}/modules/${mod.id}`}
            >
              <TextLink aria-selected={+router.query.module_id === mod.id}>
                {/* <Icon icon="cube" /> */}
                {mod.name}
              </TextLink>
            </Link>
            {+router.query.module_id === mod.id && (
              <RepoNavList>
                {mod.interfaces.map(inte => (
                  <li className={Classes.TEXT_OVERFLOW_ELLIPSIS} key={inte.id}>
                    <Link
                      href={`/repositories/[repository_id]/modules/[module_id]/interfaces/[interface_id]`}
                      as={`/repositories/${repo.id}/modules/${mod.id}/interfaces/${inte.id}`}
                    >
                      <TextLink
                        style={{ marginLeft: 8 }}
                        aria-selected={+router.query.interface_id === inte.id}
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
                      router.replace(
                        `/repositories/[repository_id]/modules/[module_id]/interfaces/[interface_id]`,
                        `/repositories/${repo.id}/modules/${mod.id}/interfaces/${json.id}`,
                      )
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
            router.replace(
              `/repositories/[repository_id]/modules/[module_id]`,
              `/repositories/${repo.id}/modules/${json.id}`,
            )
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
        <Link
          href={`/repositories/[repository_id]/modules`}
          as={`/repositories/${repo.id}/modules`}
        >
          <TextLink
            className="sider-item"
            aria-selected={router.asPath === `/repositories/${repo.id}/modules`}
          >
            <span>Modules</span>
          </TextLink>
        </Link>
      </div>
      <div>
        <Link
          href={`/repositories/[repository_id]/status-codes`}
          as={`/repositories/${repo.id}/status-codes`}
        >
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
        <Link
          href={`/repositories/[repository_id]/members`}
          as={`/repositories/${repo.id}/members`}
        >
          <TextLink
            className="sider-item"
            aria-selected={router.asPath === `/repositories/${repo.id}/members`}
          >
            <span>Members</span>
          </TextLink>
        </Link>
      </div>
      <div>
        <Link
          href={`/repositories/[repository_id]/settings`}
          as={`/repositories/${repo.id}/settings`}
        >
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
  Sider: RepoSider,
  SubPage: styled.div`
    width: 1280px;
    margin: 0 auto;
  `,
});
