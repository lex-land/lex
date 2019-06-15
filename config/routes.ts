import Routes, { add, get, resources, root } from '@core/next-routes';

add(
  resources('repositories').nest(
    // 嵌套层级不超过一级
    // http://weblog.jamisbuck.org/2007/2/5/nesting-resources
    // resources('orders').nest(resources('videos')) 在这是不生效的且有问题的,
    resources('modules'),
    resources('settings'),
    resources('members'),
    resources('wiki'),
  ),
);

add(
  resources('users').nest(
    // 嵌套层级不超过一级
    resources('repositories'),
  ),
);

add(
  resources('orgs').nest(
    // 嵌套层级不超过一级
    resources('repositories'),
  ),
);

add(get('settings'));
add(get('login'));
add(get('join'));

add(root('dashboard'));

// 打印对应关系
export default Routes;
