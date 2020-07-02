import { callAsyncAction } from "core/action";
import { conceptUpdateActionType } from "core/api/concept/_actions";
import { documentUpdateActionType } from "core/api/document/_actions";
import { NodeChildAssociationEntry, SslProperties } from "core/api/models";
import { errorAction, successAction } from "core/components/dialog/lib/actionsFactory";
import { triggerChannelsValidation } from "core/components/dialog/_methods";
import { ChannelsType, DialogContentType, DialogDataProps, DialogType } from "core/components/dialog/_types";
import { documentViewAction__Refresh, documentViewAction__UpdateItem } from "core/components/documentView/_actions";
import { SpisumNodeTypes } from "enums";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import { shipmentDetailBodyList, shipmentDetailSaveActionList } from "../shipmentDetailDialog/mappers";
import DataModifiedDialogContent from "./DataModifiedDialog";
import { updateFileAction } from "../../../../core/api/file/_actions";

export const dataModifiedDialog: DialogContentType = {
  actions: [
    successAction(
      t(translationPath(lang.dialog.form.save)),
      ({ dialogData, onClose, dispatch, buttonState, channels }) => {
        const dialogDataTyped = dialogData as DialogDataProps;
        buttonState.setIsPending(true);

        const onError = () => {
          buttonState.setIsPending(false);
        };

        const onSuccess = ({ refreshDocumentView = false } = {}) => (
          response: NodeChildAssociationEntry<SslProperties> | void
        ) => {
          dialogDataTyped?.onSuccess?.();
          if (refreshDocumentView && response) {
            dispatch(documentViewAction__UpdateItem(response));
          } else if (refreshDocumentView) {
            dispatch(documentViewAction__Refresh(true));
          }
        };

        if (dialogDataTyped.parentDialogChannels) {
          const parentDialogChannels: ChannelsType =
            dialogDataTyped.parentDialogChannels;

          triggerChannelsValidation(parentDialogChannels).then(() => {
            const allValid = Object.values(parentDialogChannels).every(
              (channel) => channel.isValid
            );

            if (!allValid) {
              onClose();
              return;
            }

            switch (dialogDataTyped.nodeType) {
              case SpisumNodeTypes.Document: {
                dispatch(
                  callAsyncAction({
                    action: documentUpdateActionType,
                    onError,
                    onSuccess: onSuccess({ refreshDocumentView: true }),
                    payload: {
                      body: {
                        properties: dialogDataTyped!.formValues
                      },
                      nodeId: dialogDataTyped!.id
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
                      body: dialogDataTyped!.formValues,
                      nodeId: dialogDataTyped!.id
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
                      nodeId: dialogDataTyped!.id,
                      properties: dialogDataTyped!.formValues,
                    }
                  })
                );
                break;
              }
              default: {
                const action =
                  shipmentDetailSaveActionList[dialogDataTyped.nodeType!];
                const bodyMapper =
                  shipmentDetailBodyList[dialogDataTyped.nodeType!];
                const componentIdList =
                  parentDialogChannels?.Komponenty?.state
                    ?.selectedComponentsIds;
                const body = bodyMapper(
                  dialogDataTyped.formValues,
                  componentIdList
                );

                dispatch(
                  callAsyncAction({
                    action,
                    onError,
                    onSuccess: onSuccess(),
                    payload: {
                      body,
                      nodeId: dialogDataTyped.id
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
      ({ dialogData, onClose }) => {
        (dialogData as DialogDataProps)?.onSuccess?.();
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
