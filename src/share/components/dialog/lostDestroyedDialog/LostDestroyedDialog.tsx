import { DialogContentType } from "core/components/dialog/_types";
import { ReasonForm } from "core/components/reasonForm/ReasonForm";
import React from "react";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";

export const LostDestroyedContent: DialogContentType["content"] = ({
  channel,
  dialogProps
}) => {
  return (
    <ReasonForm
      channel={channel}
      dialogProps={dialogProps}
      reasonLabel={t(translationPath(lang.general.lostReason))}
    />
  );
};
