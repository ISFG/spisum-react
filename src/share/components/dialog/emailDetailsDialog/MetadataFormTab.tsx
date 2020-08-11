import { SslEmail } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { EmailMetadataForm } from "./EmailMetadataForm";

export const MetadataFormTab = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslEmail>
      channel={channel}
      dialogProps={dialogProps}
      MetaForm={EmailMetadataForm}
    />
  );
};
