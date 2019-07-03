import { Button, EditableText, H1, HTMLTable, Tag } from '@blueprintjs/core';
import { Link, route } from '@helpers/route';
import { composePageProps, usePageProps } from '@core/next-compose';
import { mods, repo } from '@helpers/page-props';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Module } from '@server/module/module.entity';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import styled from 'styled-components';
import { throttledUpdateMod } from '@helpers/service';
import { useQuery } from '@helpers/hooks';

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

export default composePageProps(repo, mods)(() => {
  const { mods } = usePageProps<{ mods: Module[] }>();
  const query = useQuery();
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
                  params={{ repository: query.repository_id }}
                  defaultValue={{ name: '', description: '' }}
                  drawerTitle="新建模块"
                  success={(values, json) =>
                    route(
                      `/repositories/${query.repository_id}/modules/${json.id}`,
                    ).replace()
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
                            route="repositories/modules/show"
                            params={{
                              repository_id: query.repository_id,
                              module_id: mod.id,
                            }}
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
                              route(
                                `/repositories/${query.repository_id}/modules`,
                              ).replace()
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
