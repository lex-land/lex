import {
  Alert,
  Button,
  Drawer,
  Intent,
  Position,
  Toaster,
} from '@blueprintjs/core';
import React, { useState } from 'react';
import { FormikProps } from 'formik';
import { LexContent } from '@/components/layout/container';
import { QuickForm } from '@/components/forms';
import { createHttpUtil } from '@/core/HttpUtil';

const httpUtil = createHttpUtil();

interface CurdButtonProps {
  action: string;
  fields?: string[];
  params?: any;
  successToast?: string;
  successForceReload?: boolean;
  alertStrongText?: string;
  alertWhen?: boolean;
  successGoto?: string;
  defaultValue?: any;
  onChange?: any;
  success?: (values: any, json: any) => any;
  render?: (formik: FormikProps<any>) => any;
  drawerTitle?: string;
  actionRenderer?: (action: { handleClick: any }) => React.ReactNode;
}

const CreateButton = ({
  defaultValue,
  action,
  params,
  onChange,
  actionRenderer,
  success,
  render,
  drawerTitle,
}: CurdButtonProps) => {
  const [drawerOpen, setOpen] = useState(false);
  const onAddClick = () => {
    setOpen(true);
  };
  const onSuccess = async (newMod: any, json: any) => {
    setOpen(false);
    onChange && onChange({ ...newMod, ...params });
    success && success(newMod, json);
  };
  return (
    <>
      {actionRenderer && actionRenderer({ handleClick: onAddClick })}
      <Drawer
        title={drawerTitle}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
        position="left"
      >
        <LexContent>
          <QuickForm
            defaultValue={defaultValue}
            action={values => httpUtil.post(action, { ...values, ...params })}
            success={onSuccess}
            render={render}
            button={
              <Button type="submit" intent="success">
                Create
              </Button>
            }
          />
        </LexContent>
      </Drawer>
    </>
  );
};

const EditButton = ({
  action,
  params,
  defaultValue,
  onChange,
  drawerTitle,
  actionRenderer: button,
}: CurdButtonProps) => {
  const [drawerOpen, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const onAddClick = () => {
    setOpen(true);
  };
  const handleSubmit = async (newMod: any) => {
    setValue({ ...newMod, ...params });
    setOpen(false);
    onChange && onChange({ ...newMod, ...params });
  };
  return (
    <>
      {button && <span onClick={onAddClick}>{button}</span>}
      <Drawer
        title={drawerTitle}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
        position="left"
      >
        <LexContent>
          <QuickForm
            defaultValue={value}
            action={values => httpUtil.put(action, { ...values, ...params })}
            success={handleSubmit}
          />
        </LexContent>
      </Drawer>
    </>
  );
};

const DeleteButton = ({
  action,
  successToast,
  alertStrongText,
  alertWhen,
  success,
  actionRenderer,
}: CurdButtonProps) => {
  const [alertOpen, setOpen] = useState(false);
  const afterDelete = () => {
    Toaster.create({ position: Position.TOP }).show({
      message: successToast || '删除成功',
    });
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const result = await httpUtil.delete(action);
      success && success({}, result);
    } catch (error) {}
    afterDelete();
  };

  const check = () => {
    if (alertWhen) {
      setOpen(true);
    } else {
      handleDelete();
    }
  };

  return (
    <>
      {actionRenderer && actionRenderer({ handleClick: check })}
      <Alert
        isOpen={alertOpen}
        cancelButtonText="取消"
        confirmButtonText="删除"
        icon="trash"
        intent={Intent.DANGER}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
      >
        <p>
          您确定要将<b>{alertStrongText}</b>删除吗？这个动作无法被撤销。
        </p>
      </Alert>
    </>
  );
};

export const CURD = Object.assign(
  {},
  {
    Button,
    Delete: DeleteButton,
    Create: CreateButton,
    Update: EditButton,
  },
);
