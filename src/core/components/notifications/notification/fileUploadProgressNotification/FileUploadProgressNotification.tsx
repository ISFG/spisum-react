import {
  Notification,
  NotificationComponentProps,
  NotificationProps
} from "../Notification";
import { FileUploadProgressContainer } from "../../../../features/fileUpload/components/FileUploadProgressContainer";
import React, { useMemo } from "react";
import { NotificationSeverity } from "../../_types";

export const FileUploadProgressNotification = React.memo(
  (props: NotificationProps) => {
    const com = useMemo(
      () => ({ onClose }: NotificationComponentProps) => (
        <FileUploadProgressContainer
          fileName={props.fileName || ""}
          onUploadCompleted={onClose}
        />
      ),
      [props.fileName]
    );

    return (
      <Notification
        {...props}
        component={com}
        hideDuration={null}
        severity={NotificationSeverity.Info}
      />
    );
  }
);
