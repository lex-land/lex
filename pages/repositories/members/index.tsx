import {
  Button,
  Card,
  Classes,
  ControlGroup,
  Divider,
  H5,
  InputGroup,
  Intent,
  Popover,
  Position,
  Toaster,
} from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { http } from '@helpers/fetch';
import { repo } from '@helpers/page-props';

export default composePageProps(repo)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  const handleSubmit = (newRepo: any) => {
    http.post(`/api/repository/${repo.id}/members`, newRepo);
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: '已成功添加成员',
    });
  };
  return (
    <Page>
      <Page.Navbar />
      <Repo.Nav />
      <Repo.SubPage>
        <form onSubmit={handleSubmit}>
          <Card>
            {repo.members.map(m => (
              <div key={m.id}>
                <span>{m.fullname}</span>
                <Popover
                  position="auto"
                  content={
                    <div style={{ padding: 20 }}>
                      <H5>移除成员</H5>
                      <p>
                        你确认要踢掉 <strong>{m.fullname}</strong>
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: 15,
                        }}
                      >
                        <Button
                          className={Classes.POPOVER_DISMISS}
                          style={{ marginRight: 10 }}
                        >
                          取消
                        </Button>
                        <Button
                          intent={Intent.DANGER}
                          className={Classes.POPOVER_DISMISS}
                        >
                          删除
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Button intent="danger" icon="trash" />
                </Popover>
                <Divider />
              </div>
            ))}
            <div style={{ flex: '1 1', marginTop: 24, textAlign: 'right' }}>
              <ControlGroup>
                <InputGroup />
                <Button intent="success" text="添加成员" />
              </ControlGroup>
            </div>
          </Card>
        </form>
      </Repo.SubPage>
    </Page>
  );
});
