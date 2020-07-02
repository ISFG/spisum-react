import { callAsyncAction } from "core/action";
import { documentHandoverActionType } from "core/api/document/_actions";
import { SslProperties } from "core/api/models";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {
  DialogContentPropsType,
  DialogDataProps,
  DialogType
} from "core/components/dialog/_types";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { GenericDocument } from "core/types";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DocumentHandoverContent } from "./DocumentHandoverContent";
import { DocumentHandoverFormValues } from "./_types";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const handoverDocumentDialog = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          dispatch(documentViewAction__Refresh(true));
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        const { nextGroup, nextOwner } = channels.contentTab.state
          ?.formValues as DocumentHandoverFormValues;

        dispatch(
          callAsyncAction({
            action: documentHandoverActionType,
            onError,
            onSuccess,
            payload: {
              body: {
                nextGroup,
                ...(nextOwner && {
                  nextOwner
                })
              } as SslProperties,
              cancelDocumentOwner: !!(dialogData as DialogDataProps)
                ?.cancelDocumentOwner,
              nodeId: (dialogData as GenericDocument).id,
              nodeType: (dialogData as GenericDocument).nodeType
            }
          })
        );
      }
    )
  ],
  content: DocumentHandoverContent,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.handover))}
      {...props}
    />
  ),
  type: DialogType.HandoverDocument
};
