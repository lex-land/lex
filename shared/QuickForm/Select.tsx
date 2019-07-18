import {
  FormGroup,
  HTMLSelect,
  IHTMLSelectProps,
  Intent,
} from '@blueprintjs/core';
import { FieldConfig } from 'formik';
import React from 'react';
import { createField } from './createField';

type Props = IHTMLSelectProps & FieldConfig;

export const Select = createField<Props>((props: Props) => {
  const { field, form, ...otherProps } = props as any;
  const error = form.errors && form.errors[field.name];

  return (
    <FormGroup
      label={field.name}
      helperText={error}
      intent={error ? Intent.DANGER : Intent.NONE}
    >
      <HTMLSelect style={{ width: '100%' }} {...otherProps} />
    </FormGroup>
  );
});
