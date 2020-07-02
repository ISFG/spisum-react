import { DialogContentType, DialogType } from "core/components/dialog/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import NamedTitle from "../../../../core/components/namedTitle";
import SignAndTimestampDialog from "./SignAndTimestampDialog";

export const signAndTimestampDialog: DialogContentType = {
  content: SignAndTimestampDialog,
  title: (props) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.signing))}
      {...props}
    />
  ),
  type: DialogType.SignAndTimestamp
};

