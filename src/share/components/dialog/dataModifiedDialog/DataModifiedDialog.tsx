import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

const DataModifiedDialogContent = ({ channel }: DialogContentPropsType) => {
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  return (
    <div style={{ padding: "10px 0" }}>
      {t(translationPath(lang.dialog.content.unsavedChanges))}
    </div>
  );
};

export default DataModifiedDialogContent;
