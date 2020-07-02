import { DialogContentPropsType } from "core/components/dialog/_types";
import { ReasonForm } from "core/components/reasonForm/ReasonForm";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

const FileOpenDialog = ({ channel, dialogData }: DialogContentPropsType) => {
  return (
    <ReasonForm
      channel={channel}
      dialogData={dialogData}
      reasonLabel={t(translationPath(lang.general.fileOpenReason))}
    />
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(FileOpenDialog);
