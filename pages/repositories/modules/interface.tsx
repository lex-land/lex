import { Button, ButtonGroup, H2, H3, H4 } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { TreeEditor, TreeUtil } from '@core/tree-editor';
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
        <Repo.Nav />
        <Flex.Auto>
          <div>
            <H2 className="page-title">
              [{inte.method}] {inte.url}({inte.name})
            </H2>
            {inte.description && <p>{inte.description}</p>}
          </div>
          <div style={{ padding: '40px 0' }}>
            <H4>请求参数</H4>
            <TreeEditor
              header={TreeEditorHeader}
              inte={inte}
              scope="request"
              maxDepth={1}
              editable={false}
              defaultValue={inte.properties.filter(p => p.scope === 'request')}
            />
          </div>
          <div style={{ padding: '40px 0' }}>
            <H4>响应参数</H4>
            <TreeEditor
              header={TreeEditorHeader}
              inte={inte}
              scope="response"
              editable={false}
              defaultValue={inte.properties.filter(p => p.scope === 'response')}
            />
          </div>
          <div>
            <H3>返回码说明</H3>
          </div>
        </Flex.Auto>
      </Repo.SubPage>
    </Page>
  );
};
