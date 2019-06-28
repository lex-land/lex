import { H1, MenuItem } from '@blueprintjs/core';
import React, { useState } from 'react';
import { composePageProps, usePageProps } from '@core/next-compose';
import { repo, user } from '@helpers/page-props';
import { Flex } from '@components/layout/flex';
import { MultiSelect } from '@blueprintjs/select';
import { Page } from '@components/page';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { User } from '@server/user/user.entity';
import { http } from '@helpers/fetch';

const MemberMultiSelect = MultiSelect.ofType<any>();

export default composePageProps(repo, user.all, user.session)(() => {
  const { repo, users, user: session } = usePageProps<{
    repo: Repository;
    users: User[];
    user: User;
  }>();
  const [selectedItems, setSelectedItems] = useState(
    repo.members.map(i => ({ ...i, name: i.fullname })),
  );
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H1>成员</H1>
            <MemberMultiSelect
              itemRenderer={(item, { handleClick }) => (
                <MenuItem
                  icon={item.checked && 'tick'}
                  key={item.id}
                  onClick={handleClick}
                  label={item.name}
                />
              )}
              items={users
                .filter(user => user.id !== session.id)
                .map(user => ({
                  id: user.id,
                  name: user.fullname,
                  checked: selectedItems.map(i => i.id).includes(user.id),
                }))}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={item => {
                item.checked = !item.checked;
                if (selectedItems.map(i => i.id).includes(item.id)) {
                  // remove
                  selectedItems.splice(
                    selectedItems.findIndex(i => i.id === item.id),
                    1,
                  );
                  http.delete(`/api/repository/${repo.id}/members`, item);
                  setSelectedItems([...selectedItems]);
                } else {
                  // add
                  selectedItems.push(item);
                  http.post(`/api/repository/${repo.id}/members`, item);
                  setSelectedItems([...selectedItems]);
                }
              }}
              tagRenderer={item => item.name}
              tagInputProps={{
                onRemove: (item, index) => {
                  http.delete(
                    `/api/repository/${repo.id}/members`,
                    selectedItems[index],
                  );
                  selectedItems.splice(
                    selectedItems.findIndex(
                      i => i.id === selectedItems[index].id,
                    ),
                    1,
                  );
                  setSelectedItems([...selectedItems]);
                },
              }}
              selectedItems={selectedItems}
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
