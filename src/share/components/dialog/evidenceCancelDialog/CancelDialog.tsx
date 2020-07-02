import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentType } from "core/components/dialog/_types";
import { ReasonForm } from "core/components/reasonForm/ReasonForm";
import React from "react";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";

export const CancelDialogContent: DialogContentType["content"] = ({
  channel,
  dialogData
}) => {
  const classes = useStyles();

  return (
    <div className={classes.modalSmall}>
      <ReasonForm
        channel={channel}
        dialogData={dialogData}
        reasonLabel={t(translationPath(lang.general.reasonForCancel))}
      />
    </div>
  );
};
