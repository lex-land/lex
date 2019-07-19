import { Button, EditableText, H1, Tag } from '@blueprintjs/core';
import { compose, createMany } from '@/shared/PageProps';
import { AlignLeftTable } from '@/components/AlignLeftTable';
import { CURD } from '@/components/CURD';
import { Flex } from '@/shared/Flex';
import Link from 'next/link';
import { Module } from '@/interfaces/Module';
import { Page } from '@/components/Page';
import React from 'react';
import { Repo } from '@/components/_to_rm_domains/repo';
import { entityContext } from '@/helpers/entityContext';
import { throttledUpdateEntityFn } from '@/helpers/entityHelper';
import { useRouter } from 'next/router';

const throttledUpdateMod = throttledUpdateEntityFn('module');

const pageProps = createMany({
  repo: entityContext('repository').findOne(),
});

export default compose(pageProps)(() => {
  const repo = pageProps.use('repo');
  const mods: Module[] = repo.modules;
  const router = useRouter();
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>Modules</H1>
            <Page.EmberedError
              visible={mods.length === 0}
              code={404}
              icon="clean"
              description="当前仓库没有任何模块，可以新建一个看看"
              action={
                <CURD.Create
                  action={`/api/module`}
                  params={{ repository: router.query.repository_id }}
                  defaultValue={{ name: '', description: '' }}
                  drawerTitle="新建模块"
                  success={(values, json) =>
                    router.replace(
                      `/repositories/[repository_id]/modules/[module_id]`,
                      `/repositories/${router.query.repository_id}/modules/${json.id}`,
                    )
                  }
                  actionRenderer={({ handleClick }) => (
                    <CURD.Button
                      onClick={handleClick}
                      icon="cube"
                      intent="success"
                      text="New"
                    />
                  )}
                />
              }
            />
            <div style={{ marginTop: 40 }}>
              {mods.length !== 0 && (
                <AlignLeftTable>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Interfaces Num</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mods.map(mod => (
                      <tr key={mod.id}>
                        <td>
                          <Link
                            href={`/repositories/[repository_id]/modules/[module_id]`}
                            as={`/repositories/${router.query.repository_id}/modules/${mod.id}`}
                          >
                            <a>
                              <strong>{mod.name}</strong>
                            </a>
                          </Link>
                        </td>
                        <td>
                          <EditableText
                            defaultValue={mod.description}
                            onChange={description =>
                              throttledUpdateMod(mod.id, { description })
                            }
                          />
                        </td>
                        <td>
                          <Tag>{mod.interfaces.length}个接口</Tag>
                        </td>
                        <td>
                          <CURD.Delete
                            action={`/api/module/${mod.id}`}
                            alertWhen
                            success={() =>
                              router.replace(
                                `/repositories/[repository_id]/modules`,
                                `/repositories/${router.query.repository_id}/modules`,
                              )
                            }
                            actionRenderer={({ handleClick }) => (
                              <Button
                                intent="danger"
                                minimal
                                onClick={handleClick}
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
            </div>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
