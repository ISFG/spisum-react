import { SslAnalog } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import { GenericDocument } from "core/types";
import { DocumentType, SenderType } from "enums";
import React from "react";
import { AnalogDeliveredMetadataForm } from "./AnalogDeliveredMetadataForm";
import { AnalogOwnMetadataForm } from "./AnalogOwnMetadataForm";

const MetaDataTab = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => {
  const sslProps = (dialogProps.data as GenericDocument)?.properties?.ssl;
  const form = sslProps?.form;
  const senderType = sslProps?.senderType;
  const defaultForm = AnalogDeliveredMetadataForm;

  const forms = {
    [DocumentType.Analog]: {
      [SenderType.Individual]: AnalogDeliveredMetadataForm,
      [SenderType.Legal]: AnalogDeliveredMetadataForm,
      [SenderType.Own]: AnalogOwnMetadataForm
    }
  };

  const selectedForm =
    (form && senderType && forms[form][senderType]) || defaultForm;

  return (
    <MetaFormContainer<SslAnalog>
      channel={channel}
      dialogProps={dialogProps}
      MetaForm={selectedForm}
      onClose={onClose}
    />
  );
};

export default MetaDataTab;
