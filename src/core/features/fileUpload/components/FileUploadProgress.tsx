import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useStyles } from "./FileUploadProgress.styles";

type OwnProps = {
  fileName: string;
  progress: number;
};

export const FileUploadProgress = ({ fileName, progress }: OwnProps) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <CircularProgress color="secondary" variant="static" value={progress} />
      </div>
      <div className={styles.wrapper}>{fileName}</div>
    </div>
  );
};
