import { Code, H4, HTMLTable } from '@blueprintjs/core';
import { Link } from '@helpers/route';
import { Module } from '@server/module/module.entity';
import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@helpers/hooks';

const AlignLeftTable = styled(HTMLTable)`
  width: 100%;
  &.bp3-html-table td {
    vertical-align: middle;
  }
  &.bp3-html-table td:first-child,
  &.bp3-html-table th:first-child {
    padding-left: 0;
  }
`;

export const ModuleContent = (props: {
  mod: Module;
  noContent: React.ReactNode;
}) => {
  const { mod } = props;
  const query = useQuery();
  return (
    <div>
      <H4>
        {mod.name} {mod.description && `(${mod.description})`}
      </H4>
      {!mod.interfaces.length && props.noContent}
      {!!mod.interfaces.length && (
        <AlignLeftTable>
          <thead>
            <tr>
              <th style={{ width: 200 }}>描述</th>
              <th style={{ width: 450 }}>接口</th>
            </tr>
          </thead>
          <tbody>
            {mod.interfaces.map(inte => (
              <tr key={inte.id}>
                <td>
                  <Link
                    route="repositories/modules/show"
                    params={{
                      repository_id: query.repository_id,
                      module_id: mod.id,
                      interface_id: inte.id,
                    }}
                  >
                    <a>{inte.name}</a>
                  </Link>
                </td>
                <td>
                  <Link
                    route="repositories/modules/show"
                    params={{
                      repository_id: query.repository_id,
                      module_id: mod.id,
                      interface_id: inte.id,
                    }}
                  >
                    <Code>
                      <a>
                        [{inte.method}] {inte.url}
                      </a>
                    </Code>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </AlignLeftTable>
      )}
    </div>
  );
};
