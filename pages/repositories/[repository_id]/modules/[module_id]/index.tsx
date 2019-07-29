import { Button, Code, EditableText, H1, HTMLTable } from '@blueprintjs/core';
import { compose, createMany } from '@/shared/PageProps';
import { throttledUpdateEntityFn, useEntity } from '@/helpers/entityHelper';
import { CURD } from '@/components/CURD';
import { Flex } from '@/shared/Flex';
import Link from 'next/link';
import { Module } from '@/interfaces/Module';
import { Page } from '@/components/Page';
import React from 'react';
import { RepoSider } from '@/components/RepoSider';
import { Repository } from '@/interfaces/Repository';
import { entityContext } from '@/helpers/entityContext';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const throttledUpdateMod = throttledUpdateEntityFn('module');
const throttledUpdateInte = throttledUpdateEntityFn('interface');

interface PageProps {
  mod: Module;
  repo: Repository;
}

const AlignLeftTable = styled(HTMLTable)`
  width: 100%;
  &.bp3-html-table td {
    vertical-align: middle;
  }
  &.bp3-html-table td:first-child,
  &.bp3-html-table th:first-child {
    padding-left: 0;
  }
`;

const pageProps = createMany({
  repo: entityContext('repository').findOne(),
  mod: entityContext('module').findOne(),
});

export default compose(pageProps)(() => {
  const router = useRouter();
  const { repo, mod } = pageProps.use<PageProps>();
  const { value: modInfo, setValue: changeModInfo } = useEntity(mod, newMod =>
    throttledUpdateMod(mod.id, newMod),
  );
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
                  value={modInfo.name}
                  onChange={name => changeModInfo({ name })}
                />
              </H1>
              <EditableText
                minLines={2}
                multiline
                value={modInfo.description}
                onChange={description => changeModInfo({ description })}
              />
            </div>
            {mod.interfaces.length !== 0 && (
              <AlignLeftTable>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mod.interfaces.map(inte => (
                    <tr key={inte.id}>
                      <td>
                        <Code>
                          <Link
                            href={`/repositories/[repository_id]/modules/[module_id]/interfaces/[interface_id]`}
                            as={`/repositories/${repo.id}/modules/${mod.id}/interfaces/${inte.id}`}
                          >
                            <a>
                              [{inte.method}]{inte.url}
                            </a>
                          </Link>
                        </Code>
                      </td>
                      <td>
                        <EditableText
                          onChange={name =>
                            throttledUpdateInte(inte.id, { name })
                          }
                          defaultValue={inte.name}
                        />
                      </td>
                      <td>
                        <EditableText
                          onChange={description =>
                            throttledUpdateInte(inte.id, { description })
                          }
                          defaultValue={inte.description}
                        />
                      </td>
                      <td style={{ width: 150 }}>
                        <CURD.Delete
                          alertWhen
                          success={() =>
                            router.replace(
                              `/repositories/[repository_id]/modules/[module_id]`,
                              `/repositories/${repo.id}/modules/${mod.id}`,
                            )
                          }
                          action={`/api/interface/${inte.id}`}
                          actionRenderer={({ handleClick }) => (
                            <Button
                              onClick={handleClick}
                              intent="danger"
                              minimal
                            >
                              Delete
                            </Button>
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </AlignLeftTable>
            )}
            <Page.EmberedError
              visible={mod.interfaces.length === 0}
              code={404}
              icon="clean"
              description="当前模块没有任何接口，可以新建一个看看"
              action={
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
                    <Button
                      intent="success"
                      icon="application"
                      style={{ marginLeft: 8 }}
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
