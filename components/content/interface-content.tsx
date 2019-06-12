import './interface-content.less';
import { H2, H3, H4 } from '@blueprintjs/core';
import React, { Fragment } from 'react';
import { TreeEditor, TreeUtil } from '@components/tree-editor';
import { Interface } from '@server/interface/interface.entity';

const TreeEditorHeader = (treeUtil: TreeUtil) => {
  return (
    <Fragment>
      {/* <ButtonGroup>
        <Button onClick={() => treeUtil.onAppendRootChild()} icon="plus" />
        {!treeUtil.editable && (
          <Button onClick={() => treeUtil.setEditable(true)} icon="edit" />
        )}
        {treeUtil.editable && (
          <Button
            onClick={() => treeUtil.setEditable(false)}
            icon="disable"
            intent="danger"
          />
        )}
      </ButtonGroup> */}
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
  return (
    <div className="interface-content" style={{ padding: 40 }}>
      <H2>
        [{inte.method}] {inte.url}({inte.name})
      </H2>
      {inte.description && <p>{inte.description}</p>}
      {/* <br />
      <EditButton
        action={`/api/interface/${inte.id}`}
        fields={['method', 'url', 'name', 'description']}
        icon="edit"
        successToast="已更新接口信息"
      /> */}
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
