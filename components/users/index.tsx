import './index.less';
import { Icon } from '@blueprintjs/core';
import React from 'react';
import { User } from '@server/user/user.entity';

export const Avator = ({
  user,
  minimal = false,
  thumbnail = false,
}: {
  user: User;
  minimal?: boolean;
  thumbnail?: boolean;
}) => {
  return (
    <span className="avator">
      {(thumbnail || minimal) && (
        <span className="avator__logo">{user.fullname.slice(0, 1)}</span>
      )}
      {!minimal && <span className="avator__name">{user.fullname}</span>}
      <Icon icon="caret-down" />
    </span>
  );
};
