import { Button, Callout, H1, H5 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { repo } from '@helpers/page-props';
import styled from 'styled-components';

const ModDashBoard = styled.div`
  width: 50%;
  margin: 18px 0;
`;

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <Callout intent="primary">
              试试全新的仓库页面吧，看看有什么<a href="/whats-new">新特性</a>
            </Callout>
            <br />
            <div>
              <H1>
                <Flex justify="space-between" align="center">
                  <span>{repo.name}</span>
                  <Repo.CURD.Update
                    id={repo.id}
                    defaultValue={repo}
                    button={
                      <Button icon="edit" minimal>
                        编辑仓库信息
                      </Button>
                    }
                  />
                </Flex>
              </H1>
              <p>{repo.description}</p>
            </div>
            <Flex>
              {repo.modules.map(mod => (
                <ModDashBoard key={mod.id}>
                  <H5>
                    <a href={`/repositories/${repo.id}/modules/${mod.id}`}>
                      {mod.name}
                    </a>
                  </H5>
                  <p>{mod.description}</p>
                </ModDashBoard>
              ))}
            </Flex>
            <Page.EmberedError
              visible={repo.modules.length === 0}
              code={404}
              description="当前仓库没有任何模块，可以新建一个看看"
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
