import { Classes, Code, Tag } from '@blueprintjs/core';
import { ChildLine } from './depth-line';
import React from 'react';

export const ReadableRow = (props: any) => {
  const row = props.source;
  return (
    <tr>
      <td>
        <ChildLine {...row} />
        <Code>{row.name}</Code>
      </td>
      <td>
        <div>
          {props.scope === 'request' && (
            <Tag intent={row.required ? 'success' : 'none'}>
              {row.required ? '必填' : '可选'}
            </Tag>
          )}
          <div>
            <strong>{row.type}</strong>
            {!!row.default && (
              <span className={Classes.TEXT_MUTED}> = {row.default}</span>
            )}
          </div>
          <div>{row.description}</div>
        </div>
      </td>
    </tr>
  );
};
