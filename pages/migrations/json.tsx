import {
  Button,
  Callout,
  ControlGroup,
  H1,
  Position,
  ProgressBar,
  TextArea,
  Toaster,
  UL,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import { http } from '@helpers/fetch';
import repoSample from './data/repo.sample.json';
import { route } from '@helpers/route';

export default () => {
  const [repo, setRepo] = useState(JSON.stringify(repoSample, null, 2));
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const repoRes = await http.post('/api/migration/repo', JSON.parse(repo));
    route('repositories/show')
      .merge({ repository_id: repoRes.id })
      .replace();
    Toaster.create({ position: Position.TOP }).show({
      icon: 'tick',
      message: (
        <span>
          成功创建仓库<strong>{repoRes.name}</strong>
        </span>
      ),
    });
  };
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <Callout
          style={{ marginBottom: 24 }}
          intent="warning"
          title="从JSON新建，会有一些自动变更"
        >
          <UL>
            <li>仓库的拥有者会自动变更为当前登录用户</li>
            <li>仓库的成员也会自动清空</li>
          </UL>
        </Callout>
        <H1>从JSON新建</H1>
        <Flex style={{ margin: '24px 0' }}>
          <Flex.Auto>
            {loading && <ProgressBar />}
            <ControlGroup vertical>
              <TextArea
                disabled={loading}
                rows={15}
                value={repo}
                onChange={e => setRepo(e.target.value)}
              />
              <Button
                disabled={loading}
                large
                intent="primary"
                onClick={() => handleSubmit()}
              >
                迁移
              </Button>
            </ControlGroup>
          </Flex.Auto>
        </Flex>
      </Page.Content>
    </Page>
  );
};
