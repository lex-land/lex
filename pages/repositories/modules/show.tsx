import { Button, Code, H1, HTMLTable } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { inte, mod, repo } from '@helpers/page-props';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import IntePage from './interface';
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
                </Flex>
              </H1>
              <p>{mod.description}</p>
            </div>
            <AlignLeftTable>
              <thead>
                <tr>
                  <th>接口</th>
                  <th>描述</th>
                  <th>操作</th>
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
                    <td>
                      <div>{inte.name}</div>
                    </td>
                    <td style={{ width: 150 }}>
                      <CURD.Delete
                        action={`/api/interface/${inte.id}`}
                        actionRenderer={({ handleClick }) => (
                          <Button onClick={handleClick} intent="danger" minimal>
                            Delete
                          </Button>
                        )}
                      />
                    </td>
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
