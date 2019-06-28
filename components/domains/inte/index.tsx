import { CURD } from '@components/curd';
import { InteScrollspy } from './scrollspy';
import React from 'react';
import { TreeEditor } from './tree-editor';

export const InteCURD = {
  Create: ({ button, params }: any) => (
    <CURD.Create
      action={`/api/interface`}
      params={params}
      defaultValue={{
        method: 'GET',
        url: '',
        name: '',
        description: '',
      }}
      actionRenderer={button}
      drawerTitle="新增接口"
      successForceReload
    />
  ),
  Update: ({ id, button, defaultValue }: any) => (
    <CURD.Update
      action={`/api/interface/${id}`}
      fields={['method', 'url', 'name', 'description']}
      defaultValue={defaultValue}
      drawerTitle="编辑接口"
      actionRenderer={button}
      successForceReload
    />
  ),
  Delete: ({ id, button }: any) => (
    <CURD.Delete
      action={`/api/interface/${id}`}
      actionRenderer={button}
      alertWhen
      successForceReload
    />
  ),
};

export const Inte = {
  CURD: InteCURD,
  Scrollspy: InteScrollspy,
  TreeEditor: TreeEditor,
};
