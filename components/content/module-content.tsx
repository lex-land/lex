import './module-content.less';
import { Card, Code, H4, HTMLTable, NonIdealState } from '@blueprintjs/core';
import { CreateButton } from '@components/curd/CURD-button';
import { Link } from '@helpers/next-routes';
import { Module } from '@server/module/module.entity';
import React from 'react';
import { useQuery } from '@core/hooks';

const ModuleContent = (props: { mod: Module }) => {
  const { mod } = props;
  const query = useQuery();
  return (
    <div className="module-content" style={{ flex: '1 1', padding: 40 }}>
      <H4>
        {mod.name} {mod.description && `(${mod.description})`}
      </H4>
      {!mod.interfaces.length && (
        <Card>
          <NonIdealState
            icon="search"
            title="暂无接口"
            description="当前模块没有任何接口，可以新建一个看看"
            action={
              <CreateButton
                action={`/api/interface`}
                params={{ repository: query.repository_id, module: mod.id }}
                fields={['method', 'url', 'name', 'description']}
                buttonIcon="application"
                buttonText="新建"
                successForceReload
              />
            }
          />
        </Card>
      )}
      {!!mod.interfaces.length && (
        <HTMLTable style={{ width: '100%' }}>
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
        </HTMLTable>
      )}
    </div>
  );
};

export default ModuleContent;

{
  /* <td>
                  <ButtonGroup>
                    <EditButton
                      fields={['method', 'url', 'name', 'description']}
                      defaultValue={inte}
                      icon="edit"
                    />
                    <Popover
                      position="auto"
                      content={
                        <div style={{ padding: 20 }}>
                          <H5>删除确认</H5>
                          <p>你确认要删除这个接口吗？这个动作将不能撤销</p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginTop: 15,
                            }}
                          >
                            <Button
                              className={Classes.POPOVER_DISMISS}
                              style={{ marginRight: 10 }}
                            >
                              取消
                            </Button>
                            <Button
                              intent={Intent.DANGER}
                              className={Classes.POPOVER_DISMISS}
                            >
                              删除
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <Button intent="danger" icon="trash" />
                    </Popover>
                  </ButtonGroup>
                </td> */
}
