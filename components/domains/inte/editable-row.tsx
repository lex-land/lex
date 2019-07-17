import {
  Button,
  ButtonGroup,
  Code,
  EditableText,
  HTMLSelect,
  Popover,
  Switch,
  Tag,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { ChildLine } from './depth-line';
import { Flex } from '@/core/layout/flex';
import styled from 'styled-components';

const hasChildren = (type: string | undefined) =>
  ['Array', 'Object'].includes(type || '');

const TdRow = styled.td``;

const Type = styled(Flex)`
  /* margin: 4px 0; */
  .type {
    font-weight: bold;
  }
  .default,
  .equal {
    font-style: italic;
    color: #777;
    margin: 0 4px;
  }
  .default {
    font-size: 13px;
  }
`;

const Description = styled(EditableText)`
  width: 450px;
  margin: 4px 0;
  line-height: 1.5;
  color: #333;
`;

export const EditableRow = (props: any) => {
  const [row, setRow] = useState(props.source);
  const mergeRow = (newRow: any) => {
    setRow({ ...row, ...newRow });
    props.onItemChange && props.onItemChange({ ...row, ...newRow });
  };
  const rowHasCaret = hasChildren(row.type);

  return (
    <tr>
      <TdRow>
        <Flex align="center">
          <ChildLine {...row} />
          <Code>
            <EditableText
              selectAllOnFocus
              value={row.name}
              onChange={name => mergeRow({ name })}
            />
          </Code>
        </Flex>
      </TdRow>
      <TdRow>
        <Flex justify="space-between" align="flex-start">
          <div>
            {props.scope === 'request' && (
              <Popover
                content={
                  <div style={{ padding: 10 }}>
                    <Switch
                      style={{
                        marginBottom: 0,
                      }}
                      checked={row.required}
                      onChange={e =>
                        mergeRow({ required: e.currentTarget.checked })
                      }
                      large
                      innerLabelChecked="必填"
                      innerLabel="可选"
                    />
                  </div>
                }
                position="right"
                interactionKind="hover"
              >
                <Tag
                  style={{ marginBottom: 4 }}
                  intent={row.required ? 'success' : 'none'}
                >
                  {row.required ? '必填' : '可选'}
                </Tag>
              </Popover>
            )}
            <Type align="center">
              <Popover
                content={
                  <HTMLSelect
                    value={row.type}
                    minimal
                    large
                    onChange={e => mergeRow({ type: e.target.value })}
                  >
                    <option value="String">String</option>
                    <option value="Number">Number</option>
                    <option value="Object">Object</option>
                    <option value="Array">Array</option>
                    <option value="Boolean">Boolean</option>
                  </HTMLSelect>
                }
                position="right"
                interactionKind="hover"
              >
                <code className="type">{row.type}</code>
              </Popover>
              <span className="equal">=</span>
              <EditableText
                className="default"
                selectAllOnFocus
                placeholder="初始值"
                value={row.default}
                onChange={d => mergeRow({ default: d })}
              />
            </Type>
            <div>
              <Description
                multiline
                placeholder="描述"
                value={row.description}
                maxLength={1000}
                onChange={description => mergeRow({ description })}
              />
            </div>
          </div>
          <ButtonGroup>
            <Button
              intent="danger"
              onClick={props.onDelete}
              minimal
              icon="minus"
            />
            {rowHasCaret && (
              <Button
                minimal
                intent="primary"
                disabled={row.depth >= props.maxDepth}
                onClick={props.onAppendChild}
                icon="plus"
              />
            )}
          </ButtonGroup>
        </Flex>
      </TdRow>
    </tr>
  );
};
