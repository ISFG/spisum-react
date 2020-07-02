import { SslEmail } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { RegisterEmailForm } from "./RegisterEmailForm";

export const MetadataFormTab = ({
  channel,
  dialogData,
  onClose
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslEmail>
      channel={channel}
      dialogData={dialogData}
      MetaForm={RegisterEmailForm}
      onClose={onClose}
    />
  );
};
