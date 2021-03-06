import { Button, EditableText, H1, H5 } from '@blueprintjs/core';
import { compose, createMany } from '@/shared/PageProps';
import { CURD } from '@/components/CURD';
import { Flex } from '@/shared/Flex';
import Link from 'next/link';
import { Page } from '@/components/Page';
import React from 'react';
import { RepoSider } from '@/components/RepoSider';
import { Repository } from '@/interfaces/Repository';
import { entityContext } from '@/helpers/entityContext';
import styled from 'styled-components';
import { throttledUpdateEntityFn } from '@/helpers/entityHelper';
import { useRouter } from 'next/router';

export const throttledUpdateMod = throttledUpdateEntityFn('module');
export const throttledUpdateRepo = throttledUpdateEntityFn('repository');

const ModDashBoard = styled.div`
  width: 33%;
  margin-bottom: 36px;
`;

const defaultRepo = {
  modules: [],
};

const pageProps = createMany({
  repo: entityContext('repository').findOne(),
});

export default compose(pageProps)(() => {
  const repo = pageProps.use<Repository>('repo') || defaultRepo;
  const router = useRouter();
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Page.SubPage>
        <Flex>
          <RepoSider />
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
            <Flex wrap="wrap">
              {repo.modules.map(mod => (
                <ModDashBoard key={mod.id}>
                  <H5>
                    <Link
                      href={`/repositories/[repository_id]/modules/[module_id]`}
                      as={`/repositories/${repo.id}/modules/${mod.id}`}
                    >
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
      </Page.SubPage>
    </Page>
  );
});
