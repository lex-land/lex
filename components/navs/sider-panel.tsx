import './sider-panel.less';
import React from 'react';

const SiderPanel = ({ className, children }: any) => {
  return <aside className={`sider-panel ${className}`}>{children}</aside>;
};

export default SiderPanel;
