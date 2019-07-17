import * as Yup from 'yup';
import { Button, HTMLTable, ITreeNode } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import {
  createEntityFn,
  deleteEntityFn,
  throttledUpdateEntityFn,
} from '@/core/EntityUtil';
import { EditableRow } from './editable-row';
import { Interface } from '@/interfaces/Interface';
import { Property } from '@/interfaces/property';
import _ from 'lodash';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
  onAppendRootChild: () => void;
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
  name: '点击我编辑',
  type: 'String',
  description: '点击我编辑',
  default: '点击我编辑',
};

const throttledUpdateProp = throttledUpdateEntityFn('property');
const createProperty = createEntityFn('property');
const deleteProperty = deleteEntityFn('property');

export const TreeEditor = (props: TreeEditorProps) => {
  const [rows, setRows] = useState(sortTree(props.defaultValue));
  const router = useRouter();
  useEffect(() => {
    setRows(sortTree(props.defaultValue));
  }, [props.defaultValue, props.inte.id]);

  const onAppendChild = async (row: any, index: number) => {
    const newRows = [...rows];
    row.children = row.children ? row.children : [];
    const newRow = await createProperty({
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
    const newRow = await createProperty({
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
    deleteProperty(row.id);
    if (row.children && row.children.length > 0) {
      // reload page
      router.reload();
    } else {
      setRows(newRows);
    }
  };

  const onItemChange = ({ depth, children, ...newRow }: any) => {
    const newRows = [...rows];
    newRows[newRows.findIndex(r => r.id === newRow.id)] = {
      ...newRow,
      depth,
      children,
    };
    propSchema.isValid(newRow) && throttledUpdateProp(newRow);
    setRows(newRows);
  };

  const treeUtil = {
    onAppendRootChild,
    setRows,
  };

  return (
    <div>
      {props.header && <div>{props.header(treeUtil)}</div>}
      <AlignLeftTable>
        <thead>
          <tr>
            <th style={{ width: 220 }}>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i: any, index: any) => (
            <EditableRow
              {...props}
              maxDepth={props.maxDepth || 3}
              onItemChange={onItemChange}
              onDelete={() => deleteItem(i)}
              onAppendChild={() => onAppendChild(i, index)}
              index={index}
              key={i.id}
              source={i}
            />
          ))}
        </tbody>
      </AlignLeftTable>
      <div style={{ marginTop: 16 }}>
        <Button
          minimal
          fill
          onClick={() => treeUtil.onAppendRootChild()}
          icon="plus"
          intent="success"
          text="新增"
        />
      </div>
      {props.footer && <div>{props.footer(treeUtil)}</div>}
    </div>
  );
};
