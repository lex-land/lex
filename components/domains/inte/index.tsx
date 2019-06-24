import * as Yup from 'yup';
import {
  Button,
  Classes,
  Code,
  EditableText,
  HTMLSelect,
  HTMLTable,
  ITreeNode,
  Icon,
  Switch,
  Tag,
} from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { CURD } from '@components/curd';
import { Interface } from '@server/interface/interface.entity';
import { Property } from '@server/property/property.entity';
import Scrollspy from 'react-scrollspy';
import _ from 'lodash';
// TODO: 组件层面去掉HTTP，让此组件保持无状态
import { http } from '@helpers/fetch';
import styled from 'styled-components';

const AlignLeftTable = styled(HTMLTable)`
  width: 100%;
  &.bp3-html-table td {
    vertical-align: top;
  }
  &.bp3-html-table td:first-child,
  &.bp3-html-table th:first-child {
    padding-left: 0;
  }
`;

export interface TreeState {
  nodes: ITreeNode<any>[];
}

const propSchema = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string().required(),
  type: Yup.string().required(),
  description: Yup.string(),
  required: Yup.boolean(),
  default: Yup.string(),
  children: Yup.array(),
});

interface Record extends Property {
  depth: number;
  children: Record[];
}

const hasChildren = (type: string | undefined) =>
  ['Array', 'Object'].includes(type || '');

export const EditableRow = (props: any) => {
  const [row, setRow] = useState(props.source);
  const marginLeft = row.depth * 16;
  const mergeRow = (newRow: any) => {
    setRow({ ...row, ...newRow });
    props.onItemChange && props.onItemChange({ ...row, ...newRow });
  };
  const rowHasCaret = hasChildren(row.type);
  const rowHasChildren = !!row.children && !!row.children.length;
  return (
    <tr>
      <td>
        <div>
          <Button
            className="icon-button"
            disabled={rowHasChildren}
            intent={rowHasChildren ? 'danger' : 'none'}
            onClick={props.onDelete}
          >
            <Icon iconSize={20} icon="minus" />
          </Button>
          {!!row.parent && (
            <span className="child-line" style={{ marginLeft }}>
              └
            </span>
          )}
          <Code>
            <EditableText
              value={row.name}
              onChange={name => mergeRow({ name })}
            />
          </Code>
          {rowHasCaret && (
            <Button
              className="icon-button add"
              disabled={row.depth >= props.maxDepth}
              onClick={props.onAppendChild}
            >
              <Icon iconSize={20} icon="plus" />
            </Button>
          )}
        </div>
      </td>
      <td>
        <div>
          <div className="align-middle">
            <HTMLSelect
              value={row.type}
              onChange={e => mergeRow({ type: e.target.value })}
            >
              <option value="String">String</option>
              <option value="Number">Number</option>
              <option value="Object">Object</option>
              <option value="Array">Array</option>
              <option value="Boolean">Boolean</option>
            </HTMLSelect>
            <Code style={{ marginLeft: 6 }}>
              <EditableText
                placeholder="= 初始值"
                value={row.default}
                onChange={d => mergeRow({ default: d })}
              />
            </Code>
            {props.scope === 'request' && (
              <div style={{ marginLeft: 16 }} className="align-middle">
                <Switch
                  style={{ marginBottom: 0 }}
                  checked={row.required}
                  onChange={e =>
                    mergeRow({ required: e.currentTarget.checked })
                  }
                  innerLabelChecked="必填"
                  innerLabel="可选"
                />
              </div>
            )}
          </div>
          <div className="description" style={{ maxWidth: '35em' }}>
            <EditableText
              multiline
              placeholder="描述, 回车可以换行"
              value={row.description}
              maxLength={1000}
              onChange={description => mergeRow({ description })}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export const ReadableRow = (props: any) => {
  const row = props.source;
  return (
    <tr className="readable-tr">
      <td>
        {!!row.parent && <span style={{ marginLeft: row.depth * 16 }}>└</span>}
        <Code>{row.name}</Code>
      </td>
      <td>
        <div>
          <div>
            <code className="type">
              <strong>{row.type}</strong>
              {!!row.default && (
                <span className={Classes.TEXT_MUTED}> = {row.default}</span>
              )}
            </code>
          </div>
          <div className="description">{row.description}</div>
          {props.scope === 'request' && (
            <Tag intent={row.required ? 'success' : 'none'}>
              {row.required ? '必填' : '可选'}
            </Tag>
          )}
        </div>
      </td>
    </tr>
  );
};

export interface TreeUtil {
  editable: boolean;
  onAppendRootChild: () => void;
  setEditable: (editable: boolean) => void;
  setRows: (rows: any) => void;
}

export interface TreeEditorProps {
  editable: boolean;
  defaultValue: Property[];
  inte: Interface;
  scope: 'request' | 'response';
  onSave?: (properties: Record[]) => void;
  maxDepth?: number;
  header?: (treeUtil: TreeUtil) => any;
  footer?: (treeUtil: TreeUtil) => any;
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison

const sortTree = (tree: Property[]) => {
  // 根
  const roots = tree.filter(row => !row.parent).map(r => ({ ...r, depth: 0 }));
  const isChildren = (parents: any) => (row: any) =>
    row.parent && parents.some((root: any) => root.id === row.parent.id);

  const addRow = (row: any, depth: number) =>
    roots.splice(roots.findIndex(root => root.id === row.parent.id) + 1, 0, {
      ...row,
      depth,
    });

  let currentChildren: any = roots;
  let depth = 0;
  while (currentChildren.length > 0) {
    // 孩子
    depth++;
    currentChildren = tree.filter(isChildren(currentChildren));
    currentChildren.forEach((row: any) => addRow(row, depth));
  }
  return roots;
};

const initialProp = {
  name: 'test',
  type: 'String',
  description: 'test',
  default: 'test',
};

export const TreeEditor = (props: TreeEditorProps) => {
  const [editable, setEditable] = useState(props.editable);
  const [rows, setRows] = useState(sortTree(props.defaultValue));

  useEffect(() => {
    setRows(sortTree(props.defaultValue));
    setEditable(props.editable);
  }, [props.defaultValue, props.editable, props.inte.id]);

  const onAppendChild = async (row: any, index: number) => {
    const newRows = [...rows];
    row.children = row.children ? row.children : [];
    const newRow = await http.post(`/api/property`, {
      ...initialProp,
      parent: row,
      interface: props.inte,
      scope: props.scope,
    });
    row.children.push(newRow);
    newRows.splice(index + row.children.length, 0, {
      ...newRow,
      depth: row.depth + 1,
    });
    setRows(newRows);
  };

  const onAppendRootChild = async () => {
    const newRows = [...rows];
    const newRow = await http.post(`/api/property`, {
      ...initialProp,
      interface: props.inte,
      scope: props.scope,
    });
    newRows.push({ ...newRow, depth: 0 });
    setRows(newRows);
  };

  const deleteItem = async (row: any) => {
    const newRows = [...rows];
    const parent =
      row.parent && newRows[newRows.findIndex(r => r.id === row.parent.id)];
    _.remove(newRows, i => i.id === row.id);
    parent && _.remove(parent.children, i => i.id === row.id);
    setRows(newRows);
    http.delete(`/api/property/${row.id}`);
  };

  const onItemChange = ({ depth, children, ...newRow }: any) => {
    propSchema.isValidSync(newRow) &&
      http.put(`/api/property/${newRow.id}`, newRow);
    const newRows = [...rows];
    newRows[newRows.findIndex(r => r.id === newRow.id)] = {
      ...newRow,
      depth,
      children,
    };
    setRows(newRows);
  };
  const treeUtil = {
    onAppendRootChild,
    setEditable,
    setRows,
    editable,
  };
  return (
    <div className="tree-editor">
      {props.header && (
        <div className="tree-editor__header">{props.header(treeUtil)}</div>
      )}
      <AlignLeftTable className={Classes.RUNNING_TEXT}>
        <thead>
          <tr>
            <th style={{ width: 220 }}>字段名</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i: any, index: any) =>
            editable ? (
              <EditableRow
                {...props}
                maxDepth={props.maxDepth || 3}
                onItemChange={_.throttle(onItemChange, 800)}
                onDelete={() => deleteItem(i)}
                onAppendChild={() => onAppendChild(i, index)}
                index={index}
                key={i.id}
                source={i}
              />
            ) : (
              <ReadableRow {...props} key={i.id} source={i} />
            ),
          )}
        </tbody>
      </AlignLeftTable>
      {props.footer && (
        <div className="tree-editor__footer">{props.footer(treeUtil)}</div>
      )}
    </div>
  );
};

const StickyContainer = styled.div`
  position: relative;
  width: 250px;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  padding: 32px;
`;

const ScrollspyListItem = styled.li`
  & + & {
    padding-top: 12px;
  }
  a {
    color: #929598;
  }
  &.is-current {
    a {
      color: #106ba3;
    }
  }
`;

const ScrollspyList = styled(Scrollspy)`
  padding-left: 0;
  margin: 0;
  list-style: none;
  font-size: 13px;
`;

export const InteScrollspy = ({ items }: { items: string[] }) => {
  const ids = items;
  return (
    <StickyContainer>
      <Sticky>
        <ScrollspyList items={ids} currentClassName="is-current">
          {ids.map(id => (
            <ScrollspyListItem key={id}>
              <a href={`#${id}`}>{id}</a>
            </ScrollspyListItem>
          ))}
        </ScrollspyList>
      </Sticky>
    </StickyContainer>
  );
};

export const InteCURD = {
  Create: ({ button, params }: any) => (
    <CURD.Create
      action={`/api/interface`}
      params={params}
      fields={['method', 'url', 'name', 'description']}
      button={button}
      drawerTitle="新增接口"
      successForceReload
    />
  ),
};

export const Inte = {
  CURD: InteCURD,
  Scrollspy: InteScrollspy,
};
