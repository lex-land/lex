import { Flex } from '@/shared/Flex';
import styled from 'styled-components';

export const LexContainer = styled.div`
  width: 980px;
  margin: 0 auto;
`;

export const LexContent = styled(Flex.Auto)`
  padding: 32px 40px;
`;

export const PageSider = styled.aside<{ offset?: number }>`
  min-height: ${props => `calc(100vh - ${props.offset || 64}px)`};
  min-width: 300px;
  padding: 0 24px;
  border-right: 1px solid rgba(16, 22, 26, 0.15);
  background: #fff;
  .bp3-divider {
    border: 0;
    margin-left: -24px;
    margin-right: -24px;
    margin-bottom: 16px;
    background-image: linear-gradient(
      90deg,
      rgba(16, 22, 26, 0) 0,
      rgba(16, 22, 26, 0.15) 20%,
      rgba(16, 22, 26, 0) 100%
    );
    height: 1px;
    padding: 0;
  }
`;
