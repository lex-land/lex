import { Empty } from 'antd';
import { EmptyProps } from 'antd/lib/empty';
import React from 'react';

export const NoData = (props: EmptyProps) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        color: '#ccc',
        height: '100%',
      }}
    >
      <Empty {...props} />
    </div>
  );
};
