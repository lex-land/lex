import { Button, FormGroup, H3, H5, InputGroup } from '@blueprintjs/core';
import { compose, createMany } from '@/shared/PageProps';
import { CURD } from '@/components/CURD';
import { Flex } from '@/shared/Flex';
import { Page } from '@/components/Page';
import React from 'react';
import { RepoSider } from '@/components/RepoSider';
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
      <Page.SubPage>
        <Flex>
          <RepoSider />
          <Page.Content>
            <div style={{ marginTop: 40 }}>
              <div>
                <H3>Settings</H3>
                <FormGroup
                  label="Prod URL"
                  helperText="例如：[GET] /api/user，实际请求地址就会变成:[GET] https://<Prod URL>/api/user"
                >
                  <Flex gutter={8}>
                    <InputGroup />
                    <Button>
                      <strong>Save</strong>
                    </Button>
                  </Flex>
                </FormGroup>
              </div>
              <br />
              <div>
                <H3>Danger Zone</H3>
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
                    <Button onClick={handleClick}>
                      Delete this repository
                    </Button>
                  )}
                />
              </div>
            </div>
          </Page.Content>
        </Flex>
      </Page.SubPage>
    </Page>
  );
});
