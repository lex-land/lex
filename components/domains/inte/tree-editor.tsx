import * as Yup from 'yup';
import { Classes, HTMLTable, ITreeNode } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { EditableRow } from './editable-row';
import { Interface } from '@server/interface/interface.entity';
import { Property } from '@server/property/property.entity';
import { ReadableRow } from './readable-row';
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
    <div>
      {props.header && <div>{props.header(treeUtil)}</div>}
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
      {props.footer && <div>{props.footer(treeUtil)}</div>}
    </div>
  );
};
