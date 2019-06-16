import styled from 'styled-components';

export const SiderPanel = styled.aside`
  overflow: hidden;
  min-height: calc(100vh - 50px);
  padding: 0 24px;
  border-right: 1px solid #ddd;
  background: #fff;
  .bp3-menu {
    padding: 0;
    margin-top: 16px;
    .bp3-menu-item {
      margin-bottom: 2px;
    }
  }
  .list-header {
    margin-top: 16px;
    .title {
      padding-left: 7px;
    }
  }
  .nav-list {
    margin-bottom: 24px;
  }
  .bp3-divider {
    margin-right: 0;
    margin-bottom: 24px;
    margin-left: 0;
  }
`;
