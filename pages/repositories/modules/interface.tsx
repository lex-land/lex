import { Button, ButtonGroup, H1, H3 } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { CURD } from '@components/curd';
import { Flex } from '@components/layout/flex';
import { Inte } from '@components/domains/inte';
import { Interface } from '@server/interface/interface.entity';
import { Page } from '@components/page';
import { Repo } from '@components/domains/repo';
import { usePageProps } from '@core/next-compose';

const TreeEditorHeader = (treeUtil: any) => {
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
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div>
              <H1>
                <Flex justify="space-between" align="center">
                  <span>
                    [{inte.method}] {inte.url}
                  </span>
                  <CURD.Update
                    action={`/api/interface/${inte.id}`}
                    defaultValue={inte}
                    fields={['name', 'description', 'method', 'url']}
                    successForceReload
                    button={
                      <CURD.Button icon="edit" minimal text="编辑接口信息" />
                    }
                  />
                </Flex>
              </H1>
              <p>
                <span>{inte.name}</span>
                {inte.description && <span> {inte.description}</span>}
              </p>
            </div>
            <Flex>
              <Flex.Auto>
                <div id="请求参数" style={{ padding: '40px 0' }}>
                  <H3>请求参数</H3>
                  <Inte.TreeEditor
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
                <div id="响应参数" style={{ padding: '40px 0' }}>
                  <H3>响应参数</H3>
                  <Inte.TreeEditor
                    header={TreeEditorHeader}
                    inte={inte}
                    scope="response"
                    editable={false}
                    defaultValue={inte.properties.filter(
                      p => p.scope === 'response',
                    )}
                  />
                </div>
              </Flex.Auto>
              <Inte.Scrollspy
                items={['请求参数', '响应参数', '返回码', '示例请求', 'SDK']}
              />
            </Flex>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
};
