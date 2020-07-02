import { Box } from "@material-ui/core";
import clsx from "clsx";
import { LoadingImage } from "core/components/dataTable/Loading.styles";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";

interface OwnProps {
  question: string;
  style?: object;
}

const DataModifiedDialogContent = ({
  channel,
  style = {},
  question
}: OwnProps & DialogContentPropsType) => {
  const classes = useStyles();

  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  if (channel.isLoading) {
    return (
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <LoadingImage />
      </Box>
    );
  }

  return (
    <div
      className={clsx(classes.modalSmall, classes.textCenter)}
      style={{ padding: "10px 0", ...style }}
    >
      {question}
    </div>
  );
};

export default DataModifiedDialogContent;
