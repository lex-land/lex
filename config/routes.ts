import Routes, { add, get, resources } from '@core/next-routes';

add(
  resources('stores').nest(
    // 嵌套层级不超过一级
    // http://weblog.jamisbuck.org/2007/2/5/nesting-resources
    // resources('orders').nest(resources('videos')) 在这是不生效的且有问题的,
    resources('analysis'),
    resources('saas-orders'),
    resources('receipt-orders'),
    resources('sunmi-orders'),
    resources('devices'),
    resources('health'),
  ),
);

// only 只针对服务端render
add(resources('leaderboards', { only: ['index'] }));
add(resources('industry-analysis', { only: ['index'] }));
add(resources('compares', { only: ['index'] }));

add(get('early-warning'));

add(get('login'));

add(get('dashboard'));

// 打印对应关系
export default Routes;
