import React from 'react';

export const ChildLine = (row: any) =>
  row.parent ? (
    <span style={{ color: '#ddd', marginLeft: row.depth * 16 }}>└</span>
  ) : null;
