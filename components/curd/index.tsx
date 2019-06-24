import {
  Alert,
  Button,
  Drawer,
  Intent,
  Position,
  Toaster,
} from '@blueprintjs/core';
import React, { Fragment, useState } from 'react';
import { LexContent } from '@components/layout/container';
import { QuickForm } from '@components/forms/quick';
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
  drawerTitle?: string;
  button?: React.ReactNode;
}

const CreateButton = ({
  fields,
  action,
  params,
  onChange,
  successForceReload,
  successToast,
  button,
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
  const defaultKeys = fields || [];
  return (
    <Fragment>
      {button && <span onClick={onAddClick}>{button}</span>}
      <Drawer
        title={drawerTitle}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
      >
        <LexContent>
          <QuickForm
            fields={defaultKeys}
            action={values => http.post(action, { ...values, ...params })}
            success={success}
            successToast={successToast || '新增成功'}
          />
        </LexContent>
      </Drawer>
    </Fragment>
  );
};

const EditButton = ({
  fields,
  action,
  params,
  defaultValue,
  onChange,
  successToast,
  successForceReload,
  drawerTitle,
  button,
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
    <Fragment>
      {button && <span onClick={onAddClick}>{button}</span>}
      <Drawer
        title={drawerTitle}
        onClose={() => setOpen(false)}
        isOpen={drawerOpen}
      >
        <LexContent>
          <QuickForm
            fields={fields || []}
            defaultValue={value}
            action={values => http.put(action, { ...values, ...params })}
            success={handleSubmit}
            successToast={successToast}
          />
        </LexContent>
      </Drawer>
    </Fragment>
  );
};

const DeleteButton = ({
  action,
  successToast,
  successForceReload,
  alertStrongText,
  alertWhen,
  successGoto,
  button,
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
    <Fragment>
      <span onClick={check}>{button}</span>
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

{
  /* <td>
                  <ButtonGroup>
                    <EditButton
                      fields={['method', 'url', 'name', 'description']}
                      defaultValue={inte}
                      icon="edit"
                    />
                    <Popover
                      position="auto"
                      content={
                        <div style={{ padding: 20 }}>
                          <H5>删除确认</H5>
                          <p>你确认要删除这个接口吗？这个动作将不能撤销</p>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              marginTop: 15,
                            }}
                          >
                            <Button
                              className={Classes.POPOVER_DISMISS}
                              style={{ marginRight: 10 }}
                            >
                              取消
                            </Button>
                            <Button
                              intent={Intent.DANGER}
                              className={Classes.POPOVER_DISMISS}
                            >
                              删除
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <Button intent="danger" icon="trash" />
                    </Popover>
                  </ButtonGroup>
                </td> */
}

export const CURD = Object.assign(
  {},
  {
    Button,
    Delete: DeleteButton,
    Create: CreateButton,
    Update: EditButton,
  },
);
