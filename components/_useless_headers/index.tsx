// import './index.less';
import { H5 } from '@blueprintjs/core';
import React from 'react';

export const ListHeader = ({ style, title, rightElement }: any) => {
  return (
    <div className="list-header" style={style}>
      <H5 className="title">{title}</H5>
      {rightElement}
    </div>
  );
};
