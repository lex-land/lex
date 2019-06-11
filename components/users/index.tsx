import './index.less';
import { Icon } from '@blueprintjs/core';
import React from 'react';
import { User } from '@server/user/user.entity';

export const Avator = ({ user }: { user: User }) => {
  return (
    <span className="avator">
      <span className="avator__logo">{user.fullname.slice(0, 1)}</span>
      <span>{user.fullname}</span>
      <Icon icon="caret-down" />
    </span>
  );
};
