import { Icon, Tag } from '@blueprintjs/core';
import React from 'react';
import styled from 'styled-components';

export interface AvatorProps {
  text?: string;
  label?: string;
  minimal?: boolean;
  children?: string;
  arrow?: boolean;
}

const Image = styled(Tag)`
  width: 25px;
  height: 25px;
`;

const Label = styled.span`
  margin-left: 5px;
`;

const Container = styled.span`
  cursor: pointer;
  font-weight: bold;
`;

export const Avator = Object.assign(
  ({
    text,
    children,
    label,
    arrow,
    ...props
  }: AvatorProps & React.HTMLAttributes<HTMLSpanElement>) => {
    const name = text || children;
    return (
      <Container {...props}>
        {name && <Image>{name.slice(0, 1)}</Image>}
        {label && <Label>{label}</Label>}
        {arrow && <Icon icon="caret-down" />}
      </Container>
    );
  },
  { Image, Label, Container },
);
