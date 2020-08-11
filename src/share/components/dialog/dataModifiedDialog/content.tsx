import { callAsyncAction } from "core/action";
import { conceptUpdateActionType } from "core/api/concept/_actions";
import { documentUpdateActionType } from "core/api/document/_actions";
import { updateFileAction } from "core/api/file/_actions";
import { NodeChildAssociationEntry, SslProperties } from "core/api/models";
import {
  errorAction,
  successAction
} from "core/components/dialog/lib/actionsFactory";
import { triggerChannelsValidation } from "core/components/dialog/_methods";
import {
  ChannelsType,
  DialogContentType,
  DialogDataGenericData,
  DialogType
} from "core/components/dialog/_types";
import {
  documentViewAction__Refresh,
  documentViewAction__UpdateItem
} from "core/components/documentView/_actions";
import NamedTitle from "core/components/namedTitle";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  shipmentDetailBodyList,
  shipmentDetailSaveActionList
} from "../shipmentDetailDialog/mappers";
import DataModifiedDialogContent from "./DataModifiedDialog";

export const dataModifiedDialog: DialogContentType = {
  actions: () => [
    successAction(
      t(translationPath(lang.dialog.form.save)),
      ({ dialogProps, onClose, dispatch, buttonState, channels }) => {
        const dialogPropsTyped = dialogProps.data as DialogDataGenericData;
        buttonState.setIsPending(true);

        const onError = () => {
          buttonState.setIsPending(false);
        };

        const onSuccess = ({ refreshDocumentView = false } = {}) => (
          response: NodeChildAssociationEntry<SslProperties> | void
        ) => {
          onClose();
          dialogProps.onSuccess?.();
          if (refreshDocumentView && response) {
            dispatch(documentViewAction__UpdateItem(response));
          } else if (refreshDocumentView) {
            dispatch(documentViewAction__Refresh(true));
          }
        };

        if (dialogProps.parentDialogChannels) {
          const parentDialogChannels: ChannelsType =
            dialogProps.parentDialogChannels;

          triggerChannelsValidation(parentDialogChannels).then(() => {
            const allValid = Object.values(parentDialogChannels).every(
              (channel) => channel.isValid
            );

            if (!allValid) {
              onClose();
              return;
            }

            switch (dialogPropsTyped.nodeType) {
              case SpisumNodeTypes.Document: {
                dispatch(
                  callAsyncAction({
                    action: documentUpdateActionType,
                    onError,
                    onSuccess: onSuccess({ refreshDocumentView: true }),
                    payload: {
                      body: {
                        properties: dialogPropsTyped!.formValues
                      },
                      nodeId: dialogPropsTyped!.id
                    }
                  })
                );
                break;
              }
              case SpisumNodeTypes.Concept: {
                dispatch(
                  callAsyncAction({
                    action: conceptUpdateActionType,
                    onError,
                    onSuccess: onSuccess({ refreshDocumentView: true }),
                    payload: {
                      body: dialogPropsTyped!.formValues,
                      nodeId: dialogPropsTyped!.id
                    }
                  })
                );
                break;
              }
              case SpisumNodeTypes.File: {
                dispatch(
                  callAsyncAction({
                    action: updateFileAction,
                    onError,
                    onSuccess: onSuccess({ refreshDocumentView: true }),
                    payload: {
                      nodeId: dialogPropsTyped!.id,
                      properties: dialogPropsTyped!.formValues
                    }
                  })
                );
                break;
              }
              default: {
                const action =
                  shipmentDetailSaveActionList[dialogPropsTyped.nodeType!];
                const bodyMapper =
                  shipmentDetailBodyList[dialogPropsTyped.nodeType!];
                const componentIdList =
                  parentDialogChannels?.Komponenty?.state
                    ?.selectedComponentsIds;
                const body = bodyMapper(
                  dialogPropsTyped.formValues,
                  componentIdList
                );

                dispatch(
                  callAsyncAction({
                    action,
                    onError,
                    onSuccess: onSuccess(),
                    payload: {
                      body,
                      nodeId: dialogPropsTyped.id
                    }
                  })
                );
              }
            }
          });
        }
      }
    ),
    errorAction(
      t(translationPath(lang.dialog.form.dontSave)),
      ({ dialogProps, onClose }) => {
        dialogProps.onSuccess?.();
        onClose();
      }
    )
  ],
  content: DataModifiedDialogContent,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.unsavedChanges))}
      {...props}
    />
  ),
  type: DialogType.DataModified
};
