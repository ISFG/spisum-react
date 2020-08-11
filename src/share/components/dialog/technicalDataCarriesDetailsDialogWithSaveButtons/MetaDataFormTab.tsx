import { SslAnalog } from "core/api/models";
import { DialogContentPropsType } from "core/components/dialog/_types";
import MetaFormContainer from "core/components/MetaForm";
import { GenericDocument } from "core/types";
import { DocumentType, SenderType } from "enums";
import React from "react";
import { DigitalDeliveredMetadataForm } from "./DigitalDeliveredMetadataForm";
import { DigitalOwnMetadataForm } from "./DigitalOwnMetadataForm";

const FORMS = {
  [DocumentType.Digital]: {
    [SenderType.Individual]: DigitalDeliveredMetadataForm,
    [SenderType.Legal]: DigitalDeliveredMetadataForm,
    [SenderType.Own]: DigitalOwnMetadataForm
  }
};

const MetaDataTab = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => {
  const sslProps = (dialogProps.data as GenericDocument)?.properties?.ssl;
  const form = sslProps?.form;
  const senderType = sslProps?.senderType;

  const selectedForm =
    (form && senderType && FORMS[form][senderType]) ||
    DigitalDeliveredMetadataForm;

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
