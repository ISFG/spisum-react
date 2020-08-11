import { SslDatabox } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { DataboxMetadataForm } from "./DataboxMetadataForm";

export const MetadataFormTab = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslDatabox>
      channel={channel}
      dialogProps={dialogProps}
      MetaForm={DataboxMetadataForm}
    />
  );
};
