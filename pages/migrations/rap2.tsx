import { Button, ControlGroup, TextArea } from '@blueprintjs/core';
import React, { useState } from 'react';
import { Page } from '@components/page';
import { http } from '@helpers/fetch';

export default () => {
  const [repo, setRepo] = useState('');
  return (
    <Page>
      <Page.Navbar />
      <Page.Content>
        <ControlGroup vertical>
          <TextArea
            onChange={e => setRepo(e.target.value)}
            value={repo}
            fill
            rows={10}
            placeholder="copy资源"
          />
          <Button
            large
            intent="primary"
            onClick={() => http.post('/api/migration/repo', JSON.parse(repo))}
          >
            迁移
          </Button>
        </ControlGroup>
      </Page.Content>
    </Page>
  );
};
