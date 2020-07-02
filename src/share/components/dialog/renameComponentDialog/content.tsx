import { callAsyncAction } from "core/action";
import { componentUpdateAction } from "core/api/components/_actions";
import { secondaryAction } from "core/components/dialog/lib/actionsFactory";
import {DialogContentPropsType, DialogType} from "core/components/dialog/_types";
import { File } from "core/entities";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { RenameComponentContent } from "./RenameComponentContent";
import { RenameComponentFormValues } from "./_types";
import { updateFileName } from "./_utils";
import NamedTitle from "../../../../core/components/namedTitle";
import React from "react";

export const renameComponentDialog = {
  actions: [
    secondaryAction(
      t(translationPath(lang.dialog.buttons.confirm)),
      ({ dispatch, channels, dialogData, onClose, buttonState }) => {
        const onSuccess = () => {
          onClose();
        };

        const onError = () => {
          buttonState.setIsPending(false);
        };

        buttonState.setIsPending(true);

        const { name } = channels.contentTab.state
          ?.formValues as RenameComponentFormValues;

        dispatch(
          callAsyncAction({
            action: componentUpdateAction,
            onError,
            onSuccess,
            payload: updateFileName(dialogData as File, name || "")
          })
        );
      }
    )
  ],
  content: RenameComponentContent,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.renameComponent))}
      {...props}
    />
  ),
  type: DialogType.RenameComponent
};
