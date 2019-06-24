import { CURD } from '@components/curd';
import React from 'react';

export const ModCURD = {
  Create: ({ button, params }: { params: any; button: any }) => (
    <CURD.Create
      action={`/api/module`}
      params={params}
      fields={['name', 'description']}
      button={button}
      drawerTitle="新建模块"
      successForceReload
    />
  ),
  Update: ({
    id,
    button,
    defaultValue,
  }: {
    id: number;
    button: any;
    defaultValue: any;
  }) => (
    <CURD.Update
      defaultValue={defaultValue}
      fields={['name', 'description']}
      action={`/api/module/${id}`}
      button={button}
      successForceReload
    />
  ),
};

export const Mod = {
  CURD: ModCURD,
};
