import { Button, EditableText, FormGroup } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { Form } from 'formik';
import _ from 'lodash';

interface SimpleFormProps<T> {
  defaultValue?: T | any;
  onSubmit: (value: T) => void;
  fields: string[];
}

const SimpleForm = (props: SimpleFormProps<any>) => {
  const targetValue = _.pick(props.defaultValue, props.fields) as any;
  const [mod, setMod] = useState(targetValue);
  useEffect(() => {
    setMod(props.defaultValue);
  }, [props.defaultValue]);
  const mergeMod = (newMod: any) => setMod({ ...mod, ...newMod });
  return (
    <Form>
      {props.fields.map(f => (
        <div key={f}>
          <FormGroup label={f}>
            <EditableText
              placeholder={f}
              value={mod[f]}
              onChange={v => mergeMod({ [f]: v })}
            />
          </FormGroup>
        </div>
      ))}
      <Button
        intent="primary"
        onClick={() => props.onSubmit(_.pick(mod, props.fields))}
      >
        保存
      </Button>
    </Form>
  );
};

export default SimpleForm;
