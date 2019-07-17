import {
  Callout,
  EditableText,
  H1,
  H4,
  HTMLSelect,
  Popover,
} from '@blueprintjs/core';
import { composePageProps, usePageProps } from '@/core/next-compose';
import { inte, repo } from '@/helpers/page-props';
import { throttledUpdateInte, useEntity } from '@/helpers/service';
import { Flex } from '@/core/layout/flex';
import { Inte } from '@/components/domains/inte';
import { Interface } from '@/helpers/interfaces/interface';
import { Page } from '@/components/page';
import React from 'react';
import { Repo } from '@/components/domains/repo';
import styled from 'styled-components';

const RequestURL = styled.code`
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`;

export default composePageProps(repo, inte)(() => {
  const { inte } = usePageProps<{ inte: Interface }>();
  const { value: inteInfo, setValue: changeInteInfo } = useEntity(
    inte,
    newMod => throttledUpdateInte(inte.id, newMod),
  );
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div>
              <H1>
                <EditableText
                  value={inteInfo.name}
                  onChange={name => changeInteInfo({ name })}
                />
              </H1>
              <EditableText
                minLines={2}
                placeholder="Click to add description"
                multiline
                onChange={description => changeInteInfo({ description })}
                value={inteInfo.description}
              />
            </div>
            <Flex>
              <Flex.Auto>
                <div id="请求地址" style={{ padding: '40px 0' }}>
                  <H4>请求地址</H4>
                  <Callout>
                    <RequestURL>
                      <Popover
                        content={
                          <HTMLSelect
                            value={inteInfo.method}
                            minimal
                            large
                            onChange={e =>
                              changeInteInfo({ method: e.target.value })
                            }
                          >
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                            <option value="PATCH">PATCH</option>
                          </HTMLSelect>
                        }
                        position="right"
                        interactionKind="hover"
                      >
                        <span style={{ marginRight: 8 }}>
                          [{inteInfo.method}]
                        </span>
                      </Popover>
                      <EditableText
                        value={inteInfo.url}
                        onChange={url => changeInteInfo({ url })}
                      />
                    </RequestURL>
                  </Callout>
                </div>
                <div id="请求参数" style={{ padding: '40px 0' }}>
                  <H4>请求参数</H4>
                  <Inte.TreeEditor
                    inte={inte}
                    scope="request"
                    maxDepth={1}
                    editable={false}
                    defaultValue={inte.properties.filter(
                      p => p.scope === 'request',
                    )}
                  />
                </div>
                <div id="响应参数" style={{ padding: '40px 0' }}>
                  <H4>响应参数</H4>
                  <Inte.TreeEditor
                    inte={inte}
                    scope="response"
                    editable={true}
                    defaultValue={inte.properties.filter(
                      p => p.scope === 'response',
                    )}
                  />
                </div>
                <div id="错误码" style={{ padding: '40px 0' }}>
                  <H4>错误码</H4>
                </div>
                <div id="操作日志" style={{ padding: '40px 0' }}>
                  <H4>操作日志</H4>
                </div>
              </Flex.Auto>
              <Inte.Scrollspy
                items={[
                  '请求地址',
                  '请求参数',
                  '响应参数',
                  '错误码',
                  '操作日志',
                ]}
              />
            </Flex>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
