import { callAsyncAction } from "core/action";
import { documentChangeLocationActionType } from "core/api/document/_actions";
import { fileChangeLocationAction } from "core/api/file/_actions";
import { NodeChildAssociationEntry, SslProperties } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { ChangeLocationDialog } from "./ChangeLocationDialog";
import { ChangeLocationValues } from "./_types";

export const changeLocationDialog: DialogContentType = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, dialogData, onClose, buttonState, channels }) => {
        const onSuccess = (
          response: NodeChildAssociationEntry<SslProperties>
        ) => {
          onClose();
          dispatch(documentViewAction__Refresh(true));
          (dialogData as DialogDataProps)?.onSuccess?.();
        };

        const onError = () => {
          buttonState.setIsPending(false);
          (dialogData as DialogDataProps)?.onError?.();
        };

        if (!dialogData) {
          return;
        }

        const { nodeType, id } = dialogData as GenericDocument;

        const action =
          nodeType === SpisumNodeTypes.Document
            ? documentChangeLocationActionType
            : nodeType === SpisumNodeTypes.File
            ? fileChangeLocationAction
            : undefined;

        if (!action) {
          return;
        }

        buttonState.setIsPending(true);

        dispatch(
          callAsyncAction({
            action,
            onError,
            onSuccess,
            payload: {
              body: {
                location: (channels.contentTab?.state
                  ?.formValues as ChangeLocationValues).location
              },
              nodeId: id
            }
          })
        );
      }
    )
  ],
  content: ChangeLocationDialog,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.general.editStorageLocation))}
      {...props}
    />
  ),
  type: DialogType.ChangeLocation
};
