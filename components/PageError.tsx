import { Flex } from '@/shared/Flex';
import { IconName } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

interface ErrorProps {
  icon?: IconName;
  code: number;
  className?: string;
  description?: string;
  action?: any;
  visible?: boolean;
  title?: string;
}

export const ErrorContainer = styled(Flex.Auto)`
  .title {
  }
  .h1 {
    margin-bottom: 24px;
    color: #434e59;
    font-size: 72px;
    font-weight: 800;
    line-height: 72px;
  }
  .description {
    margin-bottom: 16px;
    color: #394b59;
    font-size: 20px;
    line-height: 28px;
  }
`;

export const PageError = ({
  code,
  description,
  action,
  className,
}: ErrorProps) => (
  <ErrorContainer className={className}>
    {code && <h1 className="h1">{code}</h1>}
    {description && <div className="description">{description}</div>}
    {action && <div className="action">{action}</div>}
  </ErrorContainer>
);
