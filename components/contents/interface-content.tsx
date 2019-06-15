import './interface-content.less';
import {
  AnchorButton,
  Button,
  ButtonGroup,
  H2,
  H3,
  H4,
} from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { TreeEditor, TreeUtil } from '@components/tree-editor';
import { Interface } from '@server/interface/interface.entity';
import { useQuery } from '@helpers/hooks';

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

const InterfaceContent = ({
  edit,
  inte,
}: {
  edit: boolean;
  inte: Interface;
}) => {
  const {
    repository_id: repoId,
    module_id: modId,
    interface_id: inteId,
  } = useQuery();
  const editUrl = `/repositories/${repoId}/modules/edit/${modId}?interface_id=${inteId}`;

  return (
    <div className="interface-content" style={{ padding: 40 }}>
      <div>
        <H2 className="page-title">
          <span>
            [{inte.method}] {inte.url}({inte.name})
          </span>
          <div className="page-actions">
            <AnchorButton
              href={editUrl}
              icon="edit"
              minimal
              text="编辑本页面"
            />
          </div>
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
          editable={edit}
          defaultValue={inte.properties.filter(p => p.scope === 'request')}
        />
      </div>
      <div style={{ padding: '40px 0' }}>
        <H4>响应参数</H4>
        <TreeEditor
          header={TreeEditorHeader}
          inte={inte}
          scope="response"
          editable={edit}
          defaultValue={inte.properties.filter(p => p.scope === 'response')}
        />
      </div>
      <div>
        <H3>返回码说明</H3>
      </div>
      {/* <DeleteButton
        alertWhen={inte.properties.length}
        alertStrongText={inte.name}
        action={`/api/interface/${inte.id}`}
        buttonText="删除"
        successGoBack
      /> */}
    </div>
  );
};

export default InterfaceContent;
