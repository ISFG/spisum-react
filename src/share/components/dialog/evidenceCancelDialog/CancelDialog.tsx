import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentType } from "core/components/dialog/_types";
import { ReasonForm } from "core/components/reasonForm/ReasonForm";
import React from "react";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";

export const CancelDialogContent: DialogContentType["content"] = ({
  channel,
  dialogProps
}) => {
  const classes = useStyles();

  return (
    <div className={classes.modalSmall}>
      <ReasonForm
        channel={channel}
        dialogProps={dialogProps}
        reasonLabel={t(translationPath(lang.general.reasonForCancel))}
      />
    </div>
  );
};
