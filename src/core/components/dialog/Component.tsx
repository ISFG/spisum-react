import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { Dispatch } from "redux";
import Dialog from "./Dialog";
import { DialogActionType, dialogAction__Clear } from "./_actions";
import {
  ActionOnCloseType,
  DialogContentType,
  DialogDataProps,
  DialogType
} from "./_types";

const registeredDialogs = {};

export function registerDialog(content: DialogContentType) {
  if (registeredDialogs[content.type]) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(`DialogType '${content.type}' already registered.`);
    }
    return;
  }

  registeredDialogs[content.type] = content;
}

interface DialogQueueType {
  content: () => JSX.Element;
  dialogType: DialogType;
}
let dialogs: DialogQueueType[] = [];

const Component = () => {
  const dispatch = useDispatch<Dispatch<DialogActionType>>();
  const { dialogType, dialogData } = useSelector(
    (state: RootStateType) => state.dialogReducer
  );
  const sessionStatus = useSelector(
    (state: RootStateType) => state.loginReducer.session.status
  );

  useEffect(() => {
    dialogs = [];
  }, [sessionStatus]);

  const showDialog =
    dialogType &&
    registeredDialogs[dialogType] &&
    !dialogs.find((x) => x.dialogType === dialogType);

  React.useEffect(() => {
    if (showDialog) {
      dispatch(dialogAction__Clear());
    }
  });

  if (dialogType && showDialog) {
    const onClose = (props: ActionOnCloseType) => {
      const dialogIndex = dialogs.findIndex(
        (dialog) => dialog.content === dialogElement
      );
      dialogs.splice(dialogIndex, dialogs.length);
      (dialogData as DialogDataProps)?.onClose?.(props);
    };

    const dialogElement = () => (
      <Dialog
        onClose={onClose}
        {...registeredDialogs[dialogType]}
        dialogData={dialogData}
      />
    );

    dialogs.push({ content: dialogElement, dialogType });
  }

  return (
    <>
      {dialogs.map((dialog) => {
        const Element = dialog.content;
        return <Element key={dialogs.indexOf(dialog)} />;
      })}
    </>
  );
};

export default Component;
