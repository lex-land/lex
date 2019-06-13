import {
  Alert,
  Button,
  Drawer,
  Intent,
  Position,
  Toaster,
} from '@blueprintjs/core';
import React, { Fragment, useState } from 'react';
import SimpleForm from '@components/forms/simple-form';
import { http } from '@helpers/fetch';
import { route } from '@helpers/next-routes';

export const CreateButton = ({
  fields,
  action,
  params,
  buttonText,
  onChange,
  successForceReload,
  successToast,
  buttonIcon,
}: any) => {
  const [drawerOpen, setOpen] = useState(false);
  const onAddClick = () => {
    setOpen(true);
  };
  const handleSubmit = async (newMod: any) => {
    await http.post(action, { ...newMod, ...params });
    setOpen(false);
    onChange && onChange({ ...newMod, ...params });
    successForceReload && route().replaceMerge({});
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: successToast || '添加成功',
    });
  };
  return (
    <Fragment>
      <Button icon={buttonIcon} onClick={onAddClick} intent="success">
        {buttonText}
      </Button>
      <Drawer
        title={buttonText}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
      >
        <SimpleForm fields={fields} defaultValue={{}} onSubmit={handleSubmit} />
      </Drawer>
    </Fragment>
  );
};

export const EditButton = ({
  fields,
  action,
  params,
  buttonText,
  defaultValue,
  onChange,
  successToast,
  intent,
  icon,
  successForceReload,
}: any) => {
  const [drawerOpen, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const onAddClick = () => {
    setOpen(true);
  };
  const handleSubmit = async (newMod: any) => {
    await http.put(action, { ...newMod, ...params });
    setValue({ ...newMod, ...params });
    setOpen(false);
    onChange && onChange({ ...newMod, ...params });
    successForceReload && route().replaceMerge({});
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: successToast || '编辑成功',
    });
  };
  return (
    <Fragment>
      <Button icon={icon} intent={intent} onClick={onAddClick}>
        {buttonText}
      </Button>
      <Drawer
        title={buttonText}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
      >
        <SimpleForm
          fields={fields}
          defaultValue={value}
          onSubmit={handleSubmit}
        />
      </Drawer>
    </Fragment>
  );
};

export const DeleteButton = ({
  action,
  buttonText,
  successToast,
  successForceReload,
  alertStrongText,
  alertWhen,
  successGoBack,
}: any) => {
  const [alertOpen, setOpen] = useState(false);
  const afterDelete = () => {
    successForceReload && route().replaceMerge({});
    successGoBack && history.back();
    Toaster.create({ position: Position.TOP_RIGHT }).show({
      intent: Intent.SUCCESS,
      message: successToast || '删除成功',
    });
  };

  const deleteEmpty = async () => {
    await http.delete(action);
    afterDelete();
  };

  const deleteCascade = async () => {
    // await http.delete(action);
    // afterDelete();
  };

  const check = () => {
    if (alertWhen) {
      setOpen(true);
    } else {
      deleteEmpty();
    }
  };

  return (
    <Fragment>
      <Button intent={Intent.DANGER} onClick={check}>
        {buttonText}
      </Button>
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
    </Fragment>
  );
};
