import { IconName, NonIdealState } from '@blueprintjs/core';
import { Flex } from '@/shared/Flex';
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

export const EmberedError = ({ className, ...props }: ErrorProps) =>
  props.visible ? (
    <ErrorContainer className={className}>
      <NonIdealState icon={props.icon} />
      <br />
      {props.description && (
        <div className="description">{props.description}</div>
      )}
      {props.action}
    </ErrorContainer>
  ) : null;
