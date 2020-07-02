import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { TakeOutFromFileDialogDataType } from "./_types";

export const TakeOutFromFile = ({
  channel,
  dialogData
}: DialogContentPropsType) => {
  const classes = useStyles();
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  const count = (dialogData as TakeOutFromFileDialogDataType)?.selected.length;

  useEffect(() => {
    const selectedComponents = (dialogData as TakeOutFromFileDialogDataType)
      .selected;
    channel.setState({
      ...channel.state,
      id: (dialogData as TakeOutFromFileDialogDataType).id,
      selectedComponentsIds: selectedComponents.map((com) => com.id)
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.modalSmall} style={{ minHeight: 50 }}>
      {t(translationPath(lang.dialog.content.takeOutFromFile), { count })}
    </div>
  );
};
