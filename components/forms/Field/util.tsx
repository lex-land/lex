import { Field } from 'formik';
import React from 'react';
export function createField<P>(C: any): React.FunctionComponent<P> {
  return (props: P) => <Field {...props} component={C} />;
}
