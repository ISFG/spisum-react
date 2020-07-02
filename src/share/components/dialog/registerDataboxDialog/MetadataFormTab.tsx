import { SslDatabox } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { RegisterDataboxForm } from "./RegisterDataboxForm";

export const MetadataFormTab = ({
  channel,
  dialogData,
  onClose
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslDatabox>
      channel={channel}
      dialogData={dialogData}
      MetaForm={RegisterDataboxForm}
      onClose={onClose}
    />
  );
};
