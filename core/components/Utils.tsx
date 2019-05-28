import Link from 'next/link';
import React from 'react';
import _ from 'lodash';

export const Anchor = (props: any) => React.createElement('a', props);

export interface IfProps {
  condition: boolean;
  children: any;
}

export const If = (props: IfProps) => {
  if (props.condition) {
    return props.children;
  }
  return null;
};

interface SwitchProps {
  children: any[];
  on: string;
}

export const Switch = (props: SwitchProps) => {
  if (!_.isArray(props.children)) {
    return null;
  }
  return props.children.find(i => i.props.value === props.on) || null;
};

export const Case = (props: any) => props.children || null;

export const Svg = (props: any) => {
  const svgProps = {
    style: {
      verticalAlign: 'middle',
      fill: 'currentColor',
    },
    ...props,
    name: `#icon-${props.name}`,
  };
  return (
    <svg {...svgProps}>
      <use xlinkHref={svgProps.name} />
    </svg>
  );
};

export const Logo = () => (
  <Link href="/">
    <span className="logo">
      <Svg width="5em" height="1em" name="logo" />
    </span>
  </Link>
);

export const LogoDes = () => <span>新零售就用商米</span>;
