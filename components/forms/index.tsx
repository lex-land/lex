import { Form, Formik, FormikActions, FormikProps } from 'formik';
import { Position, Toaster } from '@blueprintjs/core';
import { Field } from './Field';
import React from 'react';
import { ValidationError } from 'class-validator';

interface QuickFormProps<T> {
  defaultValue?: object;
  action: (value: T) => any;
  success?: (value: T, json: any) => any;
  failure?: (value: T, json: any) => any;
  render?: (formik: FormikProps<any>) => any;
  successToast?: string;
  large?: boolean;
}

export const QuickForm = (props: QuickFormProps<any>) => {
  const { defaultValue, render } = props;
  if (!defaultValue && !render) {
    throw new Error('render 和 defaultValue不能同时为空');
  }
  const handleSubmit = async (
    values: any,
    formikActions: FormikActions<any>,
  ) => {
    const { error = '', message, ...json } = await props.action(values);
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
          icon: 'tick',
          message: props.successToast,
        });
    }
  };

  return (
    <Formik
      initialValues={defaultValue}
      onSubmit={handleSubmit}
      render={formik => (
        <Form>
          {render
            ? render(formik)
            : Object.keys(defaultValue || {}).map(
                (field: string, index: number) => (
                  <Field.Input key={index} name={field} />
                ),
              )}
        </Form>
      )}
    />
  );
};
