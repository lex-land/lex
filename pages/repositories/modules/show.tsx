import { Button, Code, EditableText, H1, HTMLTable } from '@blueprintjs/core';
import { Link, route } from '@helpers/route';
import React, { useState } from 'react';
import { composePageProps, usePageProps } from '@core/next-compose';
import { inte, mod, repo } from '@helpers/page-props';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import IntePage from './interface';
import { Module } from '@server/module/module.entity';
import { Page } from '@components/page';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { useQuery } from '@helpers/hooks';

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

const updateMod = throttle((modId: number, mod: any) => {
  http.put(`/api/module/${modId}`, mod);
}, 3000);

const updateInte = throttle((inteId: number, inte) => {
  http.put(`/api/interface/${inteId}`, inte);
}, 3000);

export default composePageProps(repo, mod, inte)(() => {
  const { repo, mod } = usePageProps<PageProps>();
  const { interface_id: inteId } = useQuery();
  const [modInfo, setModInfo] = useState(mod);
  const changeModInfo = (value: Partial<Module>) => {
    updateMod(mod.id, value);
    setModInfo({ ...modInfo, ...value });
  };
  return inteId ? (
    <IntePage />
  ) : (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div style={{ marginBottom: 40 }}>
              <H1>
                <Flex justify="space-between" align="flex-end">
                  <EditableText
                    value={modInfo.name}
                    onChange={name => changeModInfo({ name })}
                  />
                </Flex>
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
                            route={`/repositories/${repo.id}/modules/${mod.id}?interface_id=${inte.id}`}
                          >
                            <a>
                              [{inte.method}]{inte.url}
                            </a>
                          </Link>
                        </Code>
                      </td>
                      <td>
                        <EditableText
                          onChange={name => updateInte(inte.id, { name })}
                          defaultValue={inte.name}
                        />
                      </td>
                      <td style={{ width: 150 }}>
                        <CURD.Delete
                          alertWhen
                          success={() =>
                            route(
                              `/repositories/${repo.id}/modules/${mod.id}`,
                            ).replace()
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
                    route(
                      `/repositories/${repo.id}/modules/${mod.id}?interface_id=${json.id}`,
                    ).replace()
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
      </Repo.SubPage>
    </Page>
  );
});
