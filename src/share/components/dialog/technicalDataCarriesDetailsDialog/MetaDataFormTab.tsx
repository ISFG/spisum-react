import { SslAnalog } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { DigitalEvidateMetadataForm } from "./DigitalEvidateMetadataForm";

const MetaDataTab = ({
  channel,
  dialogData,
  onClose
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslAnalog>
      channel={channel}
      dialogData={dialogData}
      MetaForm={DigitalEvidateMetadataForm}
      onClose={onClose}
    />
  );
};

export default MetaDataTab;
