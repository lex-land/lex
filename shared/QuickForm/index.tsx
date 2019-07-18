import { Form, Formik, FormikActions, FormikProps } from 'formik';
import React, { useState } from 'react';
import { InputItem } from './InputItem';
import { Select } from './Select';
import { ValidationError } from 'class-validator';

interface QuickFormState {
  loading: boolean;
}

interface QuickFormProps<Values> {
  defaultValue?: Values;
  action: (value: Values) => Promise<any>;
  success?: (value: Values, json: any) => any;
  failure?: (value: Values, json: any) => any;
  render?: (formik: FormikProps<any>, state: QuickFormState) => any;
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
