import clsx from "clsx";
import { GroupMember } from "core/api/models";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";

interface OwnProps {
  style?: object;
}

const DeleteOrganizationUnit = ({
  channel,
  style = {},
  dialogProps
}: OwnProps & DialogContentPropsType) => {
  const classes = useStyles();

  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  return (
    <div
      className={clsx(classes.modalSmall, classes.textCenter)}
      style={{ padding: "10px 0", ...style }}
    >
      {t(translationPath(lang.dialog.content.deleteOrganizationUnit), {
        name: (dialogProps.data as GroupMember).displayName
      })}
    </div>
  );
};

export default DeleteOrganizationUnit;
