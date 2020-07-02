import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../../reducers";
import { UploadState } from "../_types";
import { FileUploadProgress } from "./FileUploadProgress";

type OwnProps = {
  fileName: string;
  onUploadCompleted?: (state: UploadState) => void;
};

export const FileUploadProgressContainer = ({
  fileName,
  onUploadCompleted
}: OwnProps) => {
  const upload = useSelector(
    (state: RootStateType) => state.fileUploadReducer.uploads[fileName]
  );

  useEffect(() => {
    if (upload.state === UploadState.Running) {
      return;
    }

    onUploadCompleted?.(upload.state);
  }, [onUploadCompleted, upload.state]);

  return (
    <FileUploadProgress fileName={fileName} progress={upload.progress || 0} />
  );
};
