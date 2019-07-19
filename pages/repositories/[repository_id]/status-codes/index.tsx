import { compose, createMany } from '@/shared/PageProps';
import { AlignLeftTable } from '@/components/AlignLeftTable';
import { Flex } from '@/shared/Flex';
import { H1 } from '@blueprintjs/core';
import { Page } from '@/components/Page';
import React from 'react';
import { Repo } from '@/components/_to_rm_domains/repo';
import { entityContext } from '@/helpers/entityContext';

const pageProps = createMany({
  repo: entityContext('repository').findOne(),
});

export default compose(pageProps)(() => {
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>Status Codes</H1>
            <AlignLeftTable>
              <thead>
                <tr>
                  <th>StatusCode</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>404</td>
                  <td>Not Found</td>
                </tr>
              </tbody>
            </AlignLeftTable>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
