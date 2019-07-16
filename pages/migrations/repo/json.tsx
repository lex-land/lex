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
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ToastProgressBar = styled(ProgressBar)`
  display: inline-flex;
`;

export default () => {
  const [repo, setRepo] = useState(JSON.stringify(repoSample, null, 2));
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    const toast = Toaster.create({ position: Position.TOP });
    setLoading(true);
    try {
      toast.show({
        icon: 'swap-horizontal',
        message: <ToastProgressBar intent="primary" />,
      });
      const repoRes = await http.post('/api/migration/repo', JSON.parse(repo));
      router.replace(
        `/repositories/[repository_id]`,
        `/repositories/${repoRes.id}`,
      );
      toast.clear();
    } catch (error) {
      toast.show({
        intent: 'danger',
        icon: 'error',
        message: error.message,
      });
    }
    setLoading(false);
  };
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <Callout
          style={{ marginBottom: 24 }}
          intent="warning"
          title="Something strange about Migrate from JSON"
        >
          <UL>
            <li>仓库的拥有者会自动变更为当前登录用户</li>
            <li>仓库的成员也会自动清空</li>
          </UL>
        </Callout>
        <H1>New Repository Migrate From JSON</H1>
        <Flex style={{ margin: '24px 0' }}>
          <Flex.Auto>
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
                Create
              </Button>
            </ControlGroup>
          </Flex.Auto>
        </Flex>
      </Page.Content>
    </Page>
  );
};
