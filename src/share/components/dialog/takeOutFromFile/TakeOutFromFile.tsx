import clsx from "clsx";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { TakeOutFromFileDialogDataType } from "./_types";

export const TakeOutFromFile = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  const classes = useStyles();
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  const data = dialogProps.data as TakeOutFromFileDialogDataType;

  const count = data?.selected.length;

  useEffect(() => {
    const selectedComponents = data.selected;
    channel.setState({
      ...channel.state,
      id: data.id,
      selectedComponentsIds: selectedComponents.map((com) => com.id)
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={clsx(classes.modalSmall, classes.contentCentered)}
      style={{ minHeight: 50 }}
    >
      {t(translationPath(lang.dialog.content.takeOutFromFile), { count })}
    </div>
  );
};
