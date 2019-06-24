import { CURD } from '@components/curd';
import { InteScrollspy } from './scrollspy';
import React from 'react';
import { TreeEditor } from './tree-editor';

export const InteCURD = {
  Create: ({ button, params }: any) => (
    <CURD.Create
      action={`/api/interface`}
      params={params}
      fields={['method', 'url', 'name', 'description']}
      button={button}
      drawerTitle="新增接口"
      successForceReload
    />
  ),
};

export const Inte = {
  CURD: InteCURD,
  Scrollspy: InteScrollspy,
  TreeEditor: TreeEditor,
};
