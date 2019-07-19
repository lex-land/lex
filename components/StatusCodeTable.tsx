import { AlignLeftTable } from './AlignLeftTable';
import React from 'react';

export const StatusCodeTable = () => {
  return (
    <AlignLeftTable>
      <thead>
        <tr>
          <th>StatusCode</th>
          <th>Description</th>
          <th>Solution</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>404</td>
          <td>Not Found</td>
          <td>reload page</td>
        </tr>
      </tbody>
    </AlignLeftTable>
  );
};
