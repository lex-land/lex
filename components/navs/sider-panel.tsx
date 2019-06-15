import './sider-panel.less';
import React from 'react';

export const SiderPanel = ({ className, children }: any) => {
  return <aside className={`sider-panel ${className}`}>{children}</aside>;
};
