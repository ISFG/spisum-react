import { DialogContentPropsType } from "core/components/dialog/_types";
import { isGenericDocument } from "core/types";
import React, { useEffect } from "react";
import { ChangeFileMarkForm } from "./ChangeFileMarkForm";

export const ChangeFileMarkDialogContent = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  if (!isGenericDocument(dialogProps.data)) {
    return <div />;
  }

  return (
    <ChangeFileMarkForm
      originalFileMark={dialogProps.data.properties?.ssl?.fileMark}
      shreddingPlanId={dialogProps.data.properties?.ssl?.filePlan}
      channel={channel}
    />
  );
};
