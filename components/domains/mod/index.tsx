import { CURD } from '@components/curd';
import React from 'react';

export const ModCURD = {
  Create: () => (
    <CURD.Create
      action={`/api/module`}
      // params={{ repository: query.repository_id }}
      fields={['name', 'description']}
      button={<CURD.Button intent="success" minimal icon="cube" text="新建" />}
      drawerTitle="新建模块"
      successForceReload
    />
  ),
};
