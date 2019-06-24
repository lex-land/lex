import {
  Button,
  Code,
  EditableText,
  HTMLSelect,
  Icon,
  Switch,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { ChildLine } from './depth-line';

const hasChildren = (type: string | undefined) =>
  ['Array', 'Object'].includes(type || '');

export const EditableRow = (props: any) => {
  const [row, setRow] = useState(props.source);
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
          <ChildLine {...row} />
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
          <div>
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
            <EditableText
              placeholder="= 初始值"
              value={row.default}
              onChange={d => mergeRow({ default: d })}
            />
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
          <div>
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
