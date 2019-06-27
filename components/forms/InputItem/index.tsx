import {
  Button,
  FormGroup,
  IInputGroupProps,
  InputGroup,
  Intent,
  Tooltip,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { FieldConfig } from 'formik';
import { createField } from '@components/forms/Field/util';

const LockButton = ({ showPassword, onClick }: any) => {
  return (
    <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
      <Button
        icon={showPassword ? 'eye-off' : 'eye-open'}
        intent={Intent.WARNING}
        minimal={true}
        onClick={() => onClick()}
      />
    </Tooltip>
  );
};

export type InputItemProps = IInputGroupProps & FieldConfig;

export const InputItem = createField<InputItemProps>(
  (props: InputItemProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { field, form, ...otherProps } = props as any;
    const onClick = () => setShowPassword(!showPassword);
    const isPassword = props.type === 'password';
    const error = form.errors && form.errors[field.name];
    return (
      <FormGroup
        label={field.name}
        helperText={error}
        intent={error ? Intent.DANGER : Intent.NONE}
      >
        <InputGroup
          intent={error ? Intent.DANGER : Intent.NONE}
          {...field}
          {...otherProps}
          type={!showPassword && isPassword ? 'password' : 'text'}
          rightElement={
            isPassword ? LockButton({ showPassword, onClick }) : undefined
          }
        />
      </FormGroup>
    );
  },
);
