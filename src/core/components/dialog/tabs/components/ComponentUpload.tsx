import { IconButton, Tooltip } from "@material-ui/core";
import { AddCircleOutlineOutlined } from "@material-ui/icons";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { useStyles } from "./Component.styles";

type OwnProps = {
  handleUploadComponent: (files: globalThis.File[]) => void;
  multipleFilesAllowed?: boolean;
  icon?: React.ReactNode;
  title?: string;
};

const defaultIcon = <AddCircleOutlineOutlined />;

export const ComponentUpload = React.forwardRef(
  (
    {
      handleUploadComponent,
      multipleFilesAllowed = true,
      icon = defaultIcon,
      title = t(translationPath(lang.general.uploadAttachments))
    }: OwnProps,
    ref
  ) => {
    const classes = useStyles();

    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      handleUploadComponent(Array.from(event.target.files || []));

      event.target.value = "";
    };

    return (
      <label>
        <input
          type="file"
          className={classes.hidden}
          onChange={handleFiles}
          multiple={multipleFilesAllowed}
        />
        <Tooltip title={title} placement="top">
          <IconButton component="span" style={{ padding: 0 }}>
            {icon}
          </IconButton>
        </Tooltip>
      </label>
    );
  }
);
