import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentType } from "core/components/dialog/_types";
import { GenericDocument } from "core/types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

export const FoundContent: DialogContentType["content"] = ({ dialogData }) => {
  const classes = useStyles();
  const nodes = dialogData as GenericDocument[];

  return (
    <div className={classes.modalSmall}>
      {t(translationPath(lang.dialog.content.recoverDialogQuestion), {
        count: nodes.length
      })}
    </div>
  );
};
