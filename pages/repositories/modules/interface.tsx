import { Button, ButtonGroup, H1, H3, H4 } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { TreeEditor, TreeUtil } from '@components/domains/inte';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Interface } from '@server/interface/interface.entity';
import { Page } from '@components/page';
import { Repo } from '@components/domains/repo';
import { usePageProps } from '@core/next-compose';

const TreeEditorHeader = (treeUtil: TreeUtil) => {
  return (
    <Fragment>
      {treeUtil.editable && (
        <ButtonGroup>
          <Button onClick={() => treeUtil.onAppendRootChild()} icon="plus" />
          <Button
            onClick={() => treeUtil.setEditable(false)}
            icon="disable"
            intent="danger"
          />
        </ButtonGroup>
      )}
    </Fragment>
  );
};

export default () => {
  const { inte } = usePageProps<{ inte: Interface }>();
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div>
              <H1>{inte.name}</H1>
              {inte.description && <p>{inte.description}</p>}
              <p>
                [{inte.method}] {inte.url}
              </p>
            </div>
            <CURD.Update
              action={`/api/interface/${inte.id}`}
              defaultValue={inte}
              fields={['name', 'description', 'method', 'url']}
              successForceReload
              button={<CURD.Button text="编辑" />}
            />
            <div style={{ padding: '40px 0' }}>
              <H4>请求参数</H4>
              <TreeEditor
                header={TreeEditorHeader}
                inte={inte}
                scope="request"
                maxDepth={1}
                editable={false}
                defaultValue={inte.properties.filter(
                  p => p.scope === 'request',
                )}
              />
            </div>
            <div style={{ padding: '40px 0' }}>
              <H4>响应参数</H4>
              <TreeEditor
                header={TreeEditorHeader}
                inte={inte}
                scope="response"
                editable={false}
                defaultValue={inte.properties.filter(
                  p => p.scope === 'response',
                )}
              />
            </div>
            <div>
              <H3>返回码说明</H3>
            </div>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
};
