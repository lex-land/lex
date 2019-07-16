import {
  Button,
  ControlGroup,
  H1,
  Position,
  ProgressBar,
  TextArea,
  Toaster,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import { http } from '@helpers/fetch';
import { useRouter } from 'next/router';

export default () => {
  const [repo, setRepo] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    await http.post('/api/migration/user', JSON.parse(repo));
    await http.post('/api/migration/org', JSON.parse(repo));
    router.replace('/');
    Toaster.create({ position: Position.TOP }).show({
      icon: 'tick',
      message: <span>成功迁移组织结构</span>,
    });
  };
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <H1>Migrate Organizations from JSON</H1>
        <Flex style={{ margin: '24px 0' }}>
          <Flex.Auto>
            {loading && <ProgressBar />}
            <ControlGroup vertical>
              <TextArea
                disabled={loading}
                rows={15}
                value={repo}
                placeholder="支持的JSON格式：[GET] http://<rap_server_url>/organization/list?name=&cursor=1&limit=100"
                onChange={e => setRepo(e.target.value)}
              />
              <Button
                disabled={loading}
                large
                intent="primary"
                onClick={() => handleSubmit()}
              >
                Create
              </Button>
            </ControlGroup>
          </Flex.Auto>
        </Flex>
      </Page.Content>
    </Page>
  );
};
