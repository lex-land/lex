import {
  Button,
  FormGroup,
  IButtonProps,
  InputGroup,
  Intent,
  Position,
  Toaster,
} from '@blueprintjs/core';
import { Form, Formik, FormikActions } from 'formik';
import React from 'react';
import { ValidationError } from 'class-validator';
import _ from 'lodash';
import { initObjectByKeys } from '@core/transformer';

interface QuickFormProps<T> {
  defaultValue?: object;
  action: (value: T) => any;
  success?: (value: T, json: any) => any;
  fields: string[];
  footer?: any;
  successToast?: string;
  large?: boolean;
  submitButton?: IButtonProps;
}

export const QuickForm = (props: QuickFormProps<any>) => {
  const targetValue = _.pick(
    props.defaultValue || initObjectByKeys(props.fields),
    props.fields,
  ) as any;
  const handleSubmit = async (
    values: any,
    formikActions: FormikActions<any>,
  ) => {
    const { error = '', message, ...json } = await props.action(
      _.pick(values, props.fields),
    );
    if (error) {
      const errorMsg: ValidationError[] = message;
      errorMsg.forEach(e => {
        formikActions.setFieldError(
          e.property,
          Object.values(e.constraints)[0],
        );
      });
    } else {
      props.success && props.success(values, json);
      props.successToast &&
        Toaster.create({ position: Position.TOP_RIGHT }).show({
          intent: Intent.SUCCESS,
          message: props.successToast,
        });
    }
  };

  return (
    <Formik
      initialValues={targetValue}
      onSubmit={handleSubmit}
      render={formik => (
        <Form>
          {props.fields.map(f => (
            <FormGroup
              intent={formik.errors[f] ? 'danger' : 'none'}
              helperText={formik.errors[f]}
              key={f}
              label={f}
            >
              <InputGroup
                large={props.large}
                intent={formik.errors[f] ? 'danger' : 'none'}
                name={f}
                value={formik.values[f]}
                onChange={formik.handleChange}
              />
            </FormGroup>
          ))}
          {props.footer || (
            <Button
              large={props.large}
              intent="primary"
              text="保存"
              {...props.submitButton}
              type="submit"
            />
          )}
        </Form>
      )}
    />
  );
};
