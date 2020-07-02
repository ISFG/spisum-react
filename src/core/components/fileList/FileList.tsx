import { IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { StyledClose } from "./Component.styles";

interface OwnProps {
  files: File[];
  onRemoveClick: (index: number) => void;
}

export const FileList = (props: OwnProps) => {
  const { files, onRemoveClick } = props;

  const handleRemoveClick = (index: number) => () => {
    onRemoveClick(index);
  };

  return (
    <>
      {files?.map((f, index) => (
        <div key={index}>
          {f.name}
          <Tooltip
            title={t(translationPath(lang.general.remove))}
            placement="top"
          >
            <IconButton
              component="span"
              style={{ padding: 0 }}
              onClick={handleRemoveClick(index)}
            >
              <StyledClose />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </>
  );
};
