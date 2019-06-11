import React, { Fragment, useEffect, useState } from 'react';

export const BaseHeader = ({ defaultValue, render }: any) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return <Fragment>{render && render(value, setValue)}</Fragment>;
};
