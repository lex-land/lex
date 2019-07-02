import { Button, EditableText, H1, H5 } from '@blueprintjs/core';
import { Link, route } from '@helpers/route';
import { composePageProps, usePageProps } from '@core/next-compose';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';
import { repo } from '@helpers/page-props';
import styled from 'styled-components';
import { throttle } from 'lodash';

const ModDashBoard = styled.div`
  width: 33.3%;
  margin: 18px 0;
`;

const updateRepo = throttle(
  (id, repo) => http.put(`/api/repository/${id}`, repo),
  3000,
);

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
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
                  onChange={name => updateRepo(repo.id, { name })}
                />
              </H1>
              <EditableText
                multiline
                defaultValue={repo.description}
                onChange={description => updateRepo(repo.id, { description })}
              />
            </div>
            <Flex>
              {repo.modules.map(mod => (
                <ModDashBoard key={mod.id}>
                  <H5>
                    <Link route={`/repositories/${repo.id}/modules/${mod.id}`}>
                      <a>
                        <strong>{mod.name}</strong>
                      </a>
                    </Link>
                  </H5>
                  <p>{mod.description}</p>
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
                    route(
                      `/repositories/${repo.id}/modules/${json.id}`,
                    ).replace()
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
