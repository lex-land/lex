import { Button, Code, EditableText, H1, HTMLTable } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@/core/next-compose';
import { mod, repo } from '@/helpers/page-props';
import {
  throttledUpdateInte,
  throttledUpdateMod,
  useEntity,
} from '@/helpers/service';
import { CURD } from '@/components/curd';
import { Flex } from '@/core/layout/flex';
import Link from 'next/link';
import { Module } from '@/helpers/interfaces/module';
import { Page } from '@/components/page';
import React from 'react';
import { Repo } from '@/components/domains/repo';
import { Repository } from '@/helpers/interfaces/repository';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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

export default composePageProps(repo, mod)(() => {
  const router = useRouter();
  const { repo, mod } = usePageProps<PageProps>();
  const { value: modInfo, setValue: changeModInfo } = useEntity(mod, newMod =>
    throttledUpdateMod(newMod.id, newMod),
  );
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
                            href={`/repositories/${repo.id}/modules/${mod.id}/interfaces/${inte.id}`}
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
      </Repo.SubPage>
    </Page>
  );
});
