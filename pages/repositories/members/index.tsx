import { H4, MenuItem } from '@blueprintjs/core';
import React, { useState } from 'react';
import { composePageProps, usePageProps } from '@core/next-compose';
import { repo, user } from '@helpers/page-props';
import { Flex } from '@components/layout/flex';
import { MultiSelect } from '@blueprintjs/select';
import { Page } from '@components/page';
import { Repo } from '@components/domains/repo';
import { Repository } from '@server/repository/repository.entity';
import { User } from '@server/user/user.entity';

const MemberMultiSelect = MultiSelect.ofType<any>();

export default composePageProps(repo, user.all)(() => {
  const { repo, users } = usePageProps<{ repo: Repository; users: User[] }>();
  const [selectedItems, setSelectedItems] = useState(
    repo.members.map(i => ({ name: i.fullname })),
  );
  return (
    <Page>
      <Page.Navbar />
      <Repo.SubPage>
        <Flex>
          <Repo.Sider />
          <Page.Content>
            <H4>成员</H4>
            <MemberMultiSelect
              itemRenderer={(item, { handleClick }) => (
                <MenuItem
                  icon={item.checked && 'tick'}
                  key={item.name}
                  onClick={handleClick}
                  label={item.name}
                />
              )}
              items={users.map(user => ({
                name: user.fullname,
                checked: selectedItems.map(i => i.name).includes(user.fullname),
              }))}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={item => {
                item.checked = !item.checked;
                if (selectedItems.map(i => i.name).includes(item.name)) {
                  // remove
                  selectedItems.splice(
                    selectedItems.findIndex(i => i.name === item.name),
                    1,
                  );
                  setSelectedItems([...selectedItems]);
                } else {
                  // add
                  selectedItems.push(item);
                  setSelectedItems([...selectedItems]);
                }
              }}
              tagRenderer={item => <span>{item.name}</span>}
              selectedItems={selectedItems}
            />
          </Page.Content>
        </Flex>
      </Repo.SubPage>
    </Page>
  );
});
