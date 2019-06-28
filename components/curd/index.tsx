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
import { LexContent } from '@components/layout/container';
import { QuickForm } from '@components/forms';
import { http } from '@helpers/fetch';
import { route } from '@helpers/route';

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
  render?: (formik: FormikProps<any>) => any;
  drawerTitle?: string;
  actionRenderer?: (action: { handleClick: any }) => React.ReactNode;
}

const CreateButton = ({
  defaultValue,
  action,
  params,
  onChange,
  successForceReload,
  successToast,
  actionRenderer,
  render,
  drawerTitle,
}: CurdButtonProps) => {
  const [drawerOpen, setOpen] = useState(false);
  const onAddClick = () => {
    setOpen(true);
  };
  const success = async (newMod: any) => {
    setOpen(false);
    onChange && onChange({ ...newMod, ...params });
    successForceReload &&
      route()
        .merge()
        .replace();
  };
  return (
    <>
      {actionRenderer && actionRenderer({ handleClick: onAddClick })}
      <Drawer
        title={drawerTitle}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
      >
        <LexContent>
          <QuickForm
            defaultValue={defaultValue}
            action={values => http.post(action, { ...values, ...params })}
            success={success}
            render={render}
            button={
              <Button type="submit" intent="success">
                Create
              </Button>
            }
            successToast={successToast || '新增成功'}
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
  successToast,
  successForceReload,
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
    successForceReload &&
      route()
        .merge()
        .replace();
  };
  return (
    <>
      {button && <span onClick={onAddClick}>{button}</span>}
      <Drawer
        title={drawerTitle}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
      >
        <LexContent>
          <QuickForm
            defaultValue={value}
            action={values => http.put(action, { ...values, ...params })}
            success={handleSubmit}
            successToast={successToast}
          />
        </LexContent>
      </Drawer>
    </>
  );
};

const DeleteButton = ({
  action,
  successToast,
  successForceReload,
  alertStrongText,
  alertWhen,
  successGoto,
  actionRenderer,
}: CurdButtonProps) => {
  const [alertOpen, setOpen] = useState(false);
  const afterDelete = () => {
    successForceReload &&
      route()
        .merge()
        .replace();
    successGoto && route(successGoto).replace({});
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: successToast || '删除成功',
    });
    setOpen(false);
  };

  const deleteEmpty = async () => {
    await http.delete(action);
    afterDelete();
  };

  const deleteCascade = async () => {
    await http.delete(action);
    afterDelete();
  };

  const check = () => {
    if (alertWhen) {
      setOpen(true);
    } else {
      deleteEmpty();
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
        onConfirm={deleteCascade}
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
