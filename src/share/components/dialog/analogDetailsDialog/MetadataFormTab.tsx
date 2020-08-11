import { SslAnalog } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import React from "react";
import { AnalogEvidateMetadataForm } from "./AnalogEvidateMetadataForm";

const MetaDataTab = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => {
  return (
    <MetaFormContainer<SslAnalog>
      channel={channel}
      dialogProps={dialogProps}
      MetaForm={AnalogEvidateMetadataForm}
      onClose={onClose}
    />
  );
};

export default MetaDataTab;
