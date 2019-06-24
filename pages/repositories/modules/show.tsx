import { Button, Code, H1, HTMLTable } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { inte, mod, repo } from '@helpers/page-props';
import { Flex } from '@components/layout/flex';
import IntePage from './interface';
import { Mod } from '@components/domains/mod';
import { Module } from '@server/module/module.entity';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import styled from 'styled-components';
import { useQuery } from '@helpers/hooks';

interface PageProps {
  mod: Module;
  repo: Repository;
}

const AlignLeftTable = styled(HTMLTable)`
  width: 100%;
  &.bp3-html-table td {
    vertical-align: top;
  }
  &.bp3-html-table td:first-child,
  &.bp3-html-table th:first-child {
    padding-left: 0;
  }
`;

export default composePageProps(repo, mod, inte)(() => {
  const { repo, mod } = usePageProps<PageProps>();
  const query = useQuery();
  return query.interface_id ? (
    <IntePage />
  ) : (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div>
              <H1>
                <Flex justify="space-between" align="center">
                  <span>{mod.name}</span>
                  <Mod.CURD.Update
                    id={mod.id}
                    defaultValue={mod}
                    button={
                      <Button icon="edit" minimal>
                        编辑模块信息
                      </Button>
                    }
                  />
                </Flex>
              </H1>
              <p>{mod.description}</p>
            </div>
            <AlignLeftTable>
              <thead>
                <tr>
                  <td>接口</td>
                  <td>描述</td>
                </tr>
              </thead>
              <tbody>
                {mod.interfaces.map(inte => (
                  <tr key={inte.id}>
                    <td>
                      <Code>
                        <a
                          href={`/repositories/${repo.id}/modules/${mod.id}?interface_id=${inte.id}`}
                        >
                          [{inte.method}]{inte.url}
                        </a>
                      </Code>
                    </td>
                    <td>{inte.name}</td>
                  </tr>
                ))}
              </tbody>
            </AlignLeftTable>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
