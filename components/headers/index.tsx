import './index.less';
import React from 'react';

export const ListHeader = ({ style, title, rightElement }: any) => {
  return (
    <div className="list-header" style={style}>
      <h4 className="title">{title}</h4>
      {rightElement}
    </div>
  );
};
