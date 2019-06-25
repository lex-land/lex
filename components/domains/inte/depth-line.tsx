import React from 'react';

export const ChildLine = (row: any) =>
  row.parent ? (
    <span style={{ color: '#ddd', marginLeft: (row.depth - 1) * 14 }}>└</span>
  ) : null;
