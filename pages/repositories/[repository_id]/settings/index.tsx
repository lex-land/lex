import { Button, H1, H4, H5 } from '@blueprintjs/core';
import { compose, createMany } from '@/shared/PageProps';
import { CURD } from '@/components/CURD';
import { Flex } from '@/shared/Flex';
import { Page } from '@/components/Page';
import React from 'react';
import { Repo } from '@/components/_to_rm_domains/repo';
import { Repository } from '@/interfaces/Repository';
import { entityContext } from '@/helpers/entityContext';
import { useRouter } from 'next/router';

const pageProps = createMany({
  repo: entityContext('repository').findOne(),
});

export default compose(pageProps)(() => {
  const repo = pageProps.use<Repository>('repo');
  const router = useRouter();
  return (
    <Page backgroundColor="#fff">
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>Settings</H1>
            <div style={{ marginTop: 40 }}>
              <H4>Danger Zone</H4>
              <H5>Transfer ownership</H5>
              Transfer this repository to another user or to an organization
              where you have the ability to create repositories.
              <Button>Transfer</Button>
              <H5>Delete this repository</H5>
              Once you delete a repository, there is no going back. Please be
              certain.
              <CURD.Delete
                alertWhen
                success={() => router.replace(`/`)}
                action={`/api/repository/${repo.id}`}
                actionRenderer={({ handleClick }) => (
                  <Button onClick={handleClick}>Delete this repository</Button>
                )}
              />
            </div>
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
