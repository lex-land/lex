import { Form, Formik, FormikActions, FormikProps } from 'formik';
// import { Position, Toaster } from '@blueprintjs/core';
import React, { useState } from 'react';
import { InputItem } from './InputItem';
import { Select } from './Select';
import { ValidationError } from 'class-validator';

interface QuickFormState {
  loading: boolean;
}

interface QuickFormProps<T> {
  defaultValue?: object;
  action: (value: T) => Promise<any>;
  success?: (value: T, json: any) => any;
  failure?: (value: T, json: any) => any;
  render?: (formik: FormikProps<any>, state: QuickFormState) => any;
  successToast?: string;
  large?: boolean;
  button?: React.ReactNode;
}

export const QuickForm = Object.assign(
  (props: QuickFormProps<any>) => {
    const { defaultValue, render } = props;
    if (!defaultValue && !render) {
      throw new Error('render 和 defaultValue不能同时为空');
    }
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (
      values: any,
      formikActions: FormikActions<any>,
    ) => {
      setLoading(true);
      const { error = '', message, ...json } = await props.action(values);
      setLoading(false);
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
        // props.successToast &&
        //   Toaster.create({ position: Position.TOP_RIGHT }).show({
        //     icon: 'tick',
        //     message: props.successToast,
        //   });
      }
    };

    return (
      <Formik
        initialValues={defaultValue}
        onSubmit={handleSubmit}
        render={formik => (
          <Form>
            {render ? (
              render(formik, { loading })
            ) : (
              <>
                {Object.keys(defaultValue || {}).map(
                  (field: string, index: number) => (
                    <InputItem key={index} name={field} />
                  ),
                )}
                {props.button}
              </>
            )}
          </Form>
        )}
      />
    );
  },
  { Input: InputItem, Select },
);
