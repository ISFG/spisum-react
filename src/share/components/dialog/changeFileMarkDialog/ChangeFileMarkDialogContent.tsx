import { DialogContentPropsType } from "core/components/dialog/_types";
import React, { useEffect } from "react";
import { isGenericDocument } from "core/types";
import { ChangeFileMarkForm } from "./ChangeFileMarkForm";

export const ChangeFileMarkDialogContent = ({
  channel,
  dialogData
}: DialogContentPropsType) => {
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  if (!isGenericDocument(dialogData)) {
    return <div />;
  }

  return (
    <ChangeFileMarkForm
      originalFileMark={dialogData.properties?.ssl?.fileMark}
      shreddingPlanId={dialogData.properties?.ssl?.filePlan}
      channel={channel}
    />
  );
};
