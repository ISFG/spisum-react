import clsx from "clsx";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";

export const DocumentHandoverContent = ({
  channel
}: DialogContentPropsType) => {
  const classes = useStyles();
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  return (
    <div className={clsx(classes.modalSmall, classes.contentCentered)}>
      {t(translationPath(lang.dialog.content.confirmHandoverBack))}
    </div>
  );
};
