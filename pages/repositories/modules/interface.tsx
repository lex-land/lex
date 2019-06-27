import { Callout, H1, H4 } from '@blueprintjs/core';
import { Flex } from '@components/layout/flex';
import { Inte } from '@components/domains/inte';
import { Interface } from '@server/interface/interface.entity';
import { Page } from '@components/page';
import React from 'react';
import { Repo } from '@components/domains/repo';
import styled from 'styled-components';
import { usePageProps } from '@core/next-compose';

const RequestURL = styled.code`
  font-family: Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`;

export default () => {
  const { inte } = usePageProps<{ inte: Interface }>();
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <div>
              <H1>
                <Flex justify="space-between" align="center">
                  <span>{inte.name}</span>
                </Flex>
              </H1>
              <p>{inte.description && <span> {inte.description}</span>}</p>
            </div>
            <Flex>
              <Flex.Auto>
                <div id="请求地址" style={{ padding: '40px 0' }}>
                  <H4>请求地址</H4>
                  <Callout>
                    <RequestURL>
                      [{inte.method}] {inte.url}
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
};
