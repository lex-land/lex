import { Button, EditableText, H1, H5 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@/core/PageProps';
import { CURD } from '@/components/CURD';
import { Flex } from '@/components/layout/flex';
import Link from 'next/link';
import { Page } from '@/components/Page';
import React from 'react';
import { Repo } from '@/components/domains/repo';
import { Repository } from '@/interfaces/Repository';
import { repo } from '@/helpers/page-props';
import styled from 'styled-components';
import { throttledUpdateEntityFn } from '@/core/EntityUtil';
import { useRouter } from 'next/router';

export const throttledUpdateMod = throttledUpdateEntityFn('module');
export const throttledUpdateRepo = throttledUpdateEntityFn('repository');

const ModDashBoard = styled.div`
  width: 30%;
  margin-bottom: 36px;
`;

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const router = useRouter();
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div style={{ marginBottom: 40 }}>
              <H1>
                <EditableText
                  defaultValue={repo.name}
                  onChange={name => throttledUpdateRepo(repo.id, { name })}
                />
              </H1>
              <EditableText
                multiline
                defaultValue={repo.description}
                onChange={description =>
                  throttledUpdateRepo(repo.id, { description })
                }
              />
            </div>
            <Flex gutter={24}>
              {repo.modules.map(mod => (
                <ModDashBoard key={mod.id}>
                  <H5>
                    <Link href={`/repositories/${repo.id}/modules/${mod.id}`}>
                      <a>
                        <strong>{mod.name}</strong>
                      </a>
                    </Link>
                  </H5>
                  <EditableText
                    multiline
                    defaultValue={mod.description}
                    onChange={description =>
                      throttledUpdateMod(mod.id, { description })
                    }
                  />
                </ModDashBoard>
              ))}
            </Flex>
            <Page.EmberedError
              visible={repo.modules.length === 0}
              code={404}
              icon="clean"
              description="当前仓库没有任何模块，可以新建一个看看"
              action={
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
                    <Button
                      intent="success"
                      icon="cube"
                      onClick={handleClick}
                      text="New"
                    />
                  )}
                />
              }
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
