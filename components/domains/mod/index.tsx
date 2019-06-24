import { CURD } from '@components/curd';
import React from 'react';

export const ModCURD = {
  Create: ({ button }: { button: any }) => (
    <CURD.Create
      action={`/api/module`}
      // params={{ repository: query.repository_id }}
      fields={['name', 'description']}
      button={button}
      drawerTitle="新建模块"
      successForceReload
    />
  ),
};

export const Mod = {
  CURD: ModCURD,
};
