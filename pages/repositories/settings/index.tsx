import { Button, H1, H4 } from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@core/next-compose';
import { repo, user } from '@helpers/page-props';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Page } from '@components/page';
import { QuickForm } from '@components/forms';
import React from 'react';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import _ from 'lodash';
import { http } from '@helpers/fetch';

export default composePageProps(repo, user.all)(() => {
  const { repo } = usePageProps<{ repo: Repository }>();
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>设置</H1>
            <H4>基本信息</H4>
            <QuickForm
              defaultValue={_.pick(repo, ['name', 'description'])}
              action={(newRepo: any) =>
                http.put(`/api/repository/${repo.id}`, newRepo)
              }
              render={() => (
                <>
                  <QuickForm.Input name="name" />
                  <QuickForm.Input name="description" />
                  <Button type="submit" intent="primary" text="Update" />
                </>
              )}
            />
            <br />
            <br />
            <Button>转移仓库所属</Button>
            <CURD.Delete
              action={`/api/repository/${repo.id}`}
              actionRenderer={({ handleClick }) => (
                <Button onClick={handleClick}>删除这个仓库</Button>
              )}
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
