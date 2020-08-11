import { DialogContentPropsType } from "core/components/dialog/_types";
import { ReasonForm } from "core/components/reasonForm/ReasonForm";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

const ConvertToOutputFormatDialog = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  return (
    <ReasonForm
      channel={channel}
      dialogProps={dialogProps}
      reasonLabel={t(translationPath(lang.general.convertReason))}
    />
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(ConvertToOutputFormatDialog);
